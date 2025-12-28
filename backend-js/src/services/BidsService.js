const Bids = require("../models/Bids");
const Items = require("../models/Items");
const { Auction } = require("../models/Auctions");
const { v4: uuidv4 } = require("uuid");
const Logging = require("../utils/Logger");
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");

let clients = [];

const registerClient = (req, res, interests) => {
    const { user, permissions } = req;
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no'
    };
    res.writeHead(200, headers);

    const clientId = user.userId;
    const newClient = {
        id: clientId,
        res,
        interests
    };
    clients.push(newClient);
    const data = `data: ${JSON.stringify({ type: 'connected', clientId })}\n\n`;
    res.write(data);

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
};

const notifyClients = (bid) => {
    clients.forEach(client => {
        if (client.interests.includes(bid.itemId)) {
            const data = `data: ${JSON.stringify({ type: 'bid_update', currentPrice: bid.amount, bidder: bid.userId })}\n\n`;
            client.res.write(data);
        }
    });
};

const PERMISSIONS = {
    ADMIN_ACCESS: "all_bids",
    VIEW_BASIC: "view_bids",
    CREATE: "create_bids",
    UPDATE_GLOBAL: "update_bids",
    DELETE_GLOBAL: "delete_bids",
};

const getReadScope = (user, permissions) => {
    if (
        permissions.has(PERMISSIONS.ADMIN_ACCESS) ||
        permissions.has(PERMISSIONS.VIEW_BASIC)
    ) {
        return {};
    }
    return { createdBy: user.userId };
};

const getWriteScope = (user, permissions, globalPermission) => {
    if (
        permissions.has(PERMISSIONS.ADMIN_ACCESS) ||
        permissions.has(globalPermission)
    ) {
        return {};
    }
    return { createdBy: user.userId };
};

const attachItemPermissions = (bid, user, permissions) => {
    const isOwner = bid.createdBy === user.userId;
    const data = bid.toJSON ? bid.toJSON() : bid;

    return {
        ...data,
        permission: Array.from(
            new Set(
                [
                    ...(isOwner ? Object.values(PERMISSIONS) : []),
                    permissions.has(PERMISSIONS.ADMIN_ACCESS) && "all_bids",
                    permissions.has(PERMISSIONS.UPDATE_GLOBAL) && "update_bids",
                    permissions.has(PERMISSIONS.DELETE_GLOBAL) && "delete_bids",
                ].filter(Boolean)
            )
        ),
    };
};

const getAllBids = async (user, permissions) => {
    const scope = getReadScope(user, permissions);

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.READ_OP,
        `Fetching bids with scope ${JSON.stringify(scope)}`,
        Models.Bids
    );

    const bids = await Bids.findAll({
        where: scope,
        include: [
            {
                model: Items,
                attributes: ["ItemId", "ItemName", "Pics"],
                include: [
                    {
                        model: Auction,
                        attributes: ["AuctionId", "name"],
                    },
                ],
            },
        ],
    });
    console.log("bids", bids);
    if (!bids || bids.length === 0) return [];

    return bids.map((bid) => attachItemPermissions(bid, user, permissions));
};

const getBidsById = async (BidsId, user, permissions) => {
    const scope = getReadScope(user, permissions);

    const bid = await Bids.findOne({
        where: {
            BidsId,
            ...scope,
        },
    });

    if (!bid) {
        return null;
    }

    return attachItemPermissions(bid, user, permissions);
};

const createNewBid = async (user, permissions, payload) => {
    const { amount, ItemId } = payload;

    const canCreate =
        permissions.has(PERMISSIONS.CREATE) ||
        permissions.has(PERMISSIONS.ADMIN_ACCESS);

    if (!canCreate) {
        throw new Error("Insufficient permissions to create bid");
    }

    const ItemDetails = await Items.findOne({
        where: {
            ItemId: ItemId,
        },
    });

    if (!ItemDetails) {
        throw new Error("Item not found");
    }

    const createdBid = await Bids.create({
        BidsId: uuidv4(),
        amount: amount,
        userId: user.userId,
        itemId: ItemId,
        auctionId: ItemDetails.auctionId,
    });

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.CREATE_OP,
        `Created bid ${createdBid.BidsId}`,
        Models.Bids
    );
    notifyClients(createdBid);

    return createdBid;
};

const updateBid = async (BidsId, user, permissions, updates) => {
    const scope = getWriteScope(user, permissions, PERMISSIONS.UPDATE_GLOBAL);

    const bid = await Bids.findOne({
        where: { BidsId, ...scope },
    });

    if (!bid) {
        return null;
    }

    if (updates.amount) {
        bid.amount = updates.amount;
    }


    await bid.save();
    const result = { ...attachItemPermissions(bid, user, permissions) };
    notifyClients(result);

    return result;
};

const deleteBid = async (BidsId, user, permissions) => {
    const scope = getWriteScope(user, permissions, PERMISSIONS.DELETE_GLOBAL);

    const deletedCount = await Bids.destroy({
        where: { BidsId, ...scope },
    });

    if (deletedCount === 0) {
        return false;
    }

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.DELETE_OP,
        `Deleted bid ${BidsId}`,
        Models.Bids
    );

    return true;
};

module.exports = {
    getAllBids,
    getBidsById,
    createNewBid,
    updateBid,
    deleteBid,
    registerClient
};
