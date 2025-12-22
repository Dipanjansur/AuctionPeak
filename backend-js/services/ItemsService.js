const Items = require("../models/Items");
const { AuctionItems, Auction, AuctionParticipants } = require("../models/Auctions");
const Logging = require("../utils/Logger");
const { v4: uuidv4 } = require("uuid");
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");
const { Op } = require("sequelize");
const Bids = require("../models/Bids");
const { formatTimeDifference } = require("../utils/timeUtils");
const globalPermission = {
    CREATE: "create_items",
}
const PERMISSIONS = {
    ADMIN_ACCESS: "all_items",
    VIEW_BASIC: "view_items",
    UPDATE_GLOBAL: "update_items",
    DELETE_GLOBAL: "delete_items"
};

const getReadScope = async (user, permissions) => {
    const auctionParticipantsList = await AuctionParticipants.findAll({
        where: { userUsersId: user.usersId },
        attributes: ["auctionId"]
    });
    const userParticipatedAuctions = auctionParticipantsList.map(x => x.dataValues.auctionId);
    if (permissions.has(PERMISSIONS.ADMIN_ACCESS) || permissions.has(PERMISSIONS.VIEW_BASIC)) {
        return { auctionId: { [Op.in]: userParticipatedAuctions } };
    } else {
        // if the basic view premission is not there then exit with a 403 staus code
        throw new Error("Insufficient permission to view items");
    }

    //remove should be able to see all the items
    // return { Owner: user.usersId };
};


const getWriteScope = (user, permissions, globalPermission) => {
    if (permissions.has(PERMISSIONS.ADMIN_ACCESS) || permissions.has(globalPermission)) {
        return {};
    }
    return { Owner: user.usersId };
};

/**
 * Helper: Decorates an auction object with computed permissions for the frontend.
 * This implements the HATEOAS / "Smart UI" pattern.
 */
const attachItemPermissions = (auctionItems, user, permissions) => {
    const isOwner = auctionItems.Owner === user.usersId;
    const auctionData = auctionItems.toJSON ? auctionItems.toJSON() : auctionItems;
    return {
        ...auctionData,
        permission: Array.from(new Set([
            ...(isOwner ? Object.values(PERMISSIONS) : []),
            permissions.has(PERMISSIONS.ADMIN_ACCESS) && 'all_items',
            (permissions.has(PERMISSIONS.UPDATE_GLOBAL) || permissions.has(PERMISSIONS.UPDATE_AUCTION)) && 'update_items',
            permissions.has(PERMISSIONS.DELETE_GLOBAL) && 'delete_items'
        ].filter(Boolean)))
    };
};


const markActivity = (item) => {
    const currentTime = new Date();
    // Active: Starts in the past, Ends in the future
    if (item.BiddingEndTime > currentTime && item.BiddingStartTime < currentTime) {
        const diff = item.BiddingEndTime - currentTime;
        // console.log("Item ending in " + formatTimeDifference(diff));
        return {
            active: true,
            activeTime: "Bidding ending in " + formatTimeDifference(diff)
        };
    }
    // Ended: Ends in the past
    if (item.BiddingEndTime < currentTime) {
        const diff = currentTime - item.BiddingEndTime;
        // console.log("Item ended " + formatTimeDifference(diff) + " ago");
        return {
            active: false,
            activeTime: "Bidding ended " + formatTimeDifference(diff) + " ago"
        };
    }
    // Upcoming: Starts in the future
    if (item.BiddingStartTime > currentTime) {
        const diff = item.BiddingStartTime - currentTime;
        // console.log("Item starting in: " + formatTimeDifference(diff));
        return {
            active: false,
            activeTime: "Bidding starting in: " + formatTimeDifference(diff)
        };
    }
    // Fallback
    return {
        active: false,
        activeTime: "Status Unknown"
    };
}

const getAllItems = async (user, permissions, queryParams) => {
    const scope = getReadScope(user, permissions);

    let items = [];
    // TODO: check does this work??
    // If auction filter present
    if (queryParams.auction) {
        const links = await AuctionItems.findAll({
            where: { auctionId: queryParams.auction },
            attributes: ["itemItemId"]
        });

        if (links.length === 0) {
            return null; // Or throw custom error
        }

        const itemIds = links.map(x => x.dataValues.itemItemId);
        const canCreateItem = permissions.has(globalPermission.CREATE) || permissions.has(PERMISSIONS.ADMIN_ACCESS);
        items = await Items.findAll({
            where: {
                ItemId: { [Op.in]: itemIds },
                ...scope
            }
        });
    } else {
        items = await Items.findAll({ where: scope });
    }

    if (!items || items.length === 0) {
        return [];
    }

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.READ_OP,
        `Fetched items`,
        Models.Items
    );
    return {
        items: items.length > 0 ? items.map(item => {
            const perm = attachItemPermissions(item, user, permissions);
            const active = markActivity(item);
            return { ...perm, ...active };
        }) : [],
        canCreateItem: canCreateItem
    }
};


const getItemByAuctionId = async (auctionId, user, permissions) => {
    const auctionItems = await Items.findAll({ where: { auctionId: auctionId } });
    const responseData = auctionItems.map(item => {
        const perm = attachItemPermissions(item, user, permissions);
        const active = markActivity(item);
        return { ...perm, ...active };
    });
    return responseData;
};

// TODO: add userName here maybe AuctionId and AucionName
const getItemById = async (ItemId, user, permissions) => {
    const scope = getReadScope(user, permissions);

    const item = await Items.findOne({
        where: {
            ItemId,
            ...scope
        },
    });

    if (!item) {
        return null;
    }

    // Fetch bids for this item
    const itemBids = await Bids.findAll({
        where: {
            itemId: ItemId
        },
    });
    item.dataValues.bids = itemBids;

    const perm = attachItemPermissions(item, user, permissions);
    const active = markActivity(item);
    return { ...perm, ...active };
};

const createNewItem = async (user, permissions, payload) => {
    const canCreate =
        permissions.has(PERMISSIONS.CREATE) ||
        permissions.has(PERMISSIONS.ADMIN_ACCESS);

    if (!canCreate) {
        throw new Error("Insufficient permission to create item");
    }

    const newItem = await Items.create({
        ItemId: uuidv4(),
        ItemName: payload.ItemName,
        Bio: payload.Bio,
        Status: payload.Status,
        ItemDescription: payload.ItemDescription,
        CurrentPrice: payload.CurrentPrice,
        createdBy: user.userId
    });

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.CREATE_OP,
        `Created item: ${newItem.ItemId}`,
        Models.Items
    );

    return newItem;
};

const updateItem = async (ItemId, user, permissions, updates) => {
    const scope = getWriteScope(user, permissions, PERMISSIONS.UPDATE_GLOBAL);

    const item = await Items.findOne({
        where: { ItemId, ...scope }
    });

    if (!item) {
        return null;
    }

    if (updates.ItemName) item.ItemName = updates.ItemName;
    if (updates.Bio) item.Bio = updates.Bio;
    if (updates.ItemDescription) item.ItemDescription = updates.ItemDescription;
    if (updates.Status) item.Status = updates.Status;
    if (updates.CurrentPrice) item.CurrentPrice = updates.CurrentPrice;

    await item.save();

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.UPDATE_OP,
        `Updated item: ${item.ItemId}`,
        Models.Items
    );

    const perm = attachItemPermissions(item, user, permissions);
    const active = markActivity(item);
    return { ...perm, ...active };
};

const deleteItem = async (ItemId, user, permissions) => {
    const scope = getWriteScope(user, permissions, PERMISSIONS.DELETE_GLOBAL);

    const result = await Items.destroy({
        where: { ItemId, ...scope }
    });

    if (result === 0) {
        return false;
    }

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.DELETE_OP,
        `Deleted item: ${ItemId}`,
        Models.Items
    );

    return true;
};

module.exports = {
    getAllItems,
    getItemById,
    getItemByAuctionId,
    createNewItem,
    updateItem,
    deleteItem
};
