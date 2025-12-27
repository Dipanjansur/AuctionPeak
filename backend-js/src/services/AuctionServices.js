const { v4: uuidv4 } = require("uuid");
const { Auction, AuctionParticipants } = require("../models/Auctions");
const Logging = require("../utils/Logger");
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");
const ItemsService = require("./ItemsService");
const { formatTimeDifference } = require("../utils/timeUtils");
const globalAuctionPermission = {
    CREATE: "create_auction",
}
//TODO: if all_acution is going then not send view , update,delete 
// Define permissions constants
const PERMISSIONS = {
    ADMIN_ACCESS: "all_auction",
    VIEW_BASIC: "view_auction",
    UPDATE_AUCTION: "update_auction",
    DELETE_AUCTION: "delete_auction",
    ADD_ITEMS: "add_items",
    JOIN_AUCTION: "join_auction",
    LEAVE_AUCTION: "leave_auction",
};

/**
 * Helper: Determines the database 'where' clause for ACCESS/VISIBILITY.
 */
const getReadScope = (user, permissions) => {
    // if (permissions.has(PERMISSIONS.ADMIN_ACCESS) || permissions.has(PERMISSIONS.VIEW_BASIC)) {
    //   return {};
    // }
    // return { createdBy: user.usersId };
    return {}; // Currently allowing all auctions to be visible
};

const getWriteScope = (user, permissions, globalPermission) => {
    if (
        permissions.has(PERMISSIONS.ADMIN_ACCESS) ||
        permissions.has(globalPermission)
    ) {
        return {};
    }
    return { createdBy: user.usersId };
};

/**
 * Helper: Decorates an auction object with computed permissions for the frontend.
 */
const attachItemPermissions = async (auction, user, permissions) => {
    const isOwner = auction.createdBy === user.usersId;
    const isParticipant = await AuctionParticipants.findOne({
        where: {
            auctionId: auction.AuctionId,
            userUsersId: user.usersId
        }
    });
    const auctionData = auction.toJSON ? auction.toJSON() : auction;
    return {
        ...auctionData,
        permission: Array.from(
            new Set(
                [
                    ...(isOwner ? Object.values(PERMISSIONS) : []),
                    ...(permissions.has(PERMISSIONS.ADMIN_ACCESS) ? ["all_auction", "add_items"] : []),
                    (permissions.has(PERMISSIONS.UPDATE_GLOBAL) ||
                        permissions.has(PERMISSIONS.UPDATE_AUCTION)) &&
                    "update_auction",
                    permissions.has(PERMISSIONS.DELETE_AUCTION) && "delete_auction",
                    !isParticipant && "join_auction",
                    isParticipant && "leave_auction",
                ].filter(Boolean)
            )
        ),
    };
};

const markActivity = (auction) => {
    const currentTime = new Date();
    // Active: Starts in the past, Ends in the future
    if (auction.endTime > currentTime && auction.startTime < currentTime) {
        const diff = auction.endTime - currentTime;
        return {
            active: 0,
            activeTime: "Auction ending in " + formatTimeDifference(diff)
        };
    }
    // Ended: Ends in the past
    if (auction.endTime < currentTime) {
        const diff = currentTime - auction.endTime;
        return {
            active: -1,
            activeTime: "Auction ended " + formatTimeDifference(diff) + " ago"
        };
    }
    // Upcoming: Starts in the future
    if (auction.startTime > currentTime) {
        const diff = auction.startTime - currentTime;
        return {
            active: 1,
            activeTime: "Auction starting in: " + formatTimeDifference(diff)
        };
    }
    // Fallback if needed (though cases above cover standard timelines)
    return {
        active: 2,
        activeTime: "Status Unknown"
    };
}

const getAllAuctions = async (user, permissions) => {
    const scope = getReadScope(user, permissions);

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.READ_OP,
        `Fetching auctions with scope: ${JSON.stringify(scope)}`,
        Models.Auction
    );

    const auctions = await Auction.findAll({ where: scope });
    const canCreateAuction = permissions.has(globalAuctionPermission.CREATE) || permissions.has(PERMISSIONS.ADMIN_ACCESS);
    const mappedAuctions = auctions && auctions.length > 0 ? await Promise.all(auctions.map(async (auction) => {
        const perm = await attachItemPermissions(auction, user, permissions);
        const active = markActivity(auction);
        return { ...auction.dataValues, ...perm, ...active };
    })) : [];

    return {
        auctions: mappedAuctions,
        createAuction: canCreateAuction
    };
};

const getAuctionById = async (auctionId, user, permissions) => {
    // 1. Determine Visibility
    const scope = getReadScope(user, permissions);
    const auction_query = {
        where: {
            AuctionId: auctionId,
            ...scope
        },

    };
    let auction = await Auction.findOne(auction_query);
    if (!auction) {
        Logging(
            Logging_level.warn,
            Entity.Service,
            Events.READ_OP,
            `Auction not found or access denied: ${auctionId}`,
            Models.Auction
        );
        return null;
    }
    const permission = await attachItemPermissions(auction, user, permissions)
    const active = markActivity(auction)


    const auctionItems = await ItemsService.getItemByAuctionId(auctionId, user, permissions);
    auction.dataValues.items = auctionItems;
    Logging(
        Logging_level.info,
        Entity.Service,
        Events.READ_OP,
        `Retrieved auction: ${auctionId}`,
        Models.Auction
    );

    return { ...auction.dataValues, ...permission, ...active };
};

const createAuction = async (user, permissions, payload) => {
    // 1. Capability Check
    const canCreate = permissions.has(globalAuctionPermission.CREATE) || permissions.has(PERMISSIONS.ADMIN_ACCESS);

    if (!canCreate) {
        Logging(
            Logging_level.warn,
            Entity.Service,
            Events.CREATE_OP,
            `Unauthorized create attempt by user: ${user.userId}`,
            Models.Auction
        );
        throw new Error("Insufficient permissions to create an auction");
    }
    const endTime = payload.startTime + payload.duration;

    const newAuction = await Auction.create({
        AuctionId: uuidv4(),
        name: payload.name,
        AuctionDetails: payload.AuctionDetails,
        startTime: payload.startTime,
        endTime: payload.endTime,
        auctionPic: payload.auctionPic,
        createdBy: user.userId,
    });

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.CREATE_OP,
        `Created auction: ${newAuction.AuctionId}`,
        Models.Auction
    );
    return newAuction;
};

const updateAuction = async (auctionId, user, permissions, updates) => {
    // 1. Security Enforcement: Global Permission OR Owner
    const scope = getWriteScope(user, permissions, PERMISSIONS.UPDATE_GLOBAL);

    const auctionToUpdate = await Auction.findOne({
        where: {
            AuctionId: auctionId,
            ...scope, // This ensures only owners (or admins) find the record
        },
    });

    if (!auctionToUpdate) {
        return null;
    }

    // 2. Apply Updates
    if (updates.name) auctionToUpdate.name = updates.name;
    if (updates.startTime) auctionToUpdate.startTime = updates.startTime;
    if (updates.endTime) auctionToUpdate.endTime = updates.endTime;
    if (updates.AuctionDetails)
        auctionToUpdate.AuctionDetails = updates.AuctionDetails;

    await auctionToUpdate.save();

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.UPDATE_OP,
        `Updated auction: ${auctionId}`,
        Models.Auction
    );

    return await attachItemPermissions(auctionToUpdate, user, permissions);
};

const deleteAuction = async (auctionId, user, permissions) => {
    // 1. Security Enforcement
    const scope = getWriteScope(user, permissions, PERMISSIONS.DELETE_GLOBAL);

    const deletedCount = await Auction.destroy({
        where: {
            AuctionId: auctionId,
            ...scope,
        },
    });

    if (deletedCount === 0) {
        return false;
    }

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.DELETE_OP,
        `Deleted auction: ${auctionId}`,
        Models.Auction
    );
    return true;
};

module.exports = {
    getAllAuctions,
    getAuctionById,
    createAuction,
    updateAuction,
    deleteAuction,
};
