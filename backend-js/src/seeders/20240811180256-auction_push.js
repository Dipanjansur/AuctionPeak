'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('auctions', [

      {
        "AuctionId": "203442c4-7e62-45e4-a6e5-6ab27e8857ac",
        "name": "Mughal Empire Treasures",
        "AuctionDetails": "This auction features treas",
        "isPremium": "verified",
        "auctionPic": "https://example.com/mughal-treasures.png",
        "startTime": "2024-07-01T10:00:00.000Z",
        "endTime": "2024-07-05T18:00:00.000Z",
        "createdAt": "2024-07-01T10:00:00.000Z",
        "updatedAt": "2024-07-01T10:00:00.000Z"
      },
      {
        "AuctionId": "e86ea7bc-acbd-4ee4-b349-c8fd46cf60bf",
        "name": "Royal Rajput Collection",
        "AuctionDetails": "An exclusive auction of the Royal Rajput Collection, featuring rare artifacts and jewelry.",
        "isPremium": "verified",
        "auctionPic": "https://example.com/royal-rajput.png",
        "startTime": "2024-07-10T12:00:00.000Z",
        "endTime": "2024-07-15T20:00:00.000Z",
        "createdAt": "2024-07-10T12:00:00.000Z",
        "updatedAt": "2024-07-10T12:00:00.000Z"
      },
      {
        "AuctionId": "b52491dc-21bf-449a-ac07-7e75b5d1c075",
        "name": "Ancient Persian Relics",
        "AuctionDetails": "This auction showcases ancient Persian relics, including sculptures, pottery, and manuscripts.",
        "isPremium": "verified",
        "auctionPic": "https://example.com/persian-relics.png",
        "startTime": "2024-07-20T09:00:00.000Z",
        "endTime": "2024-07-25T17:00:00.000Z",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        "AuctionId": "40e5a90e-fba4-440f-bbc7-532cf5571305",
        "name": "Victorian Era Collection",
        "AuctionDetails": "A collection of Victorian Era items, including furniture, clothing, and art pieces.",
        // "isPremium": "verified",
        "auctionPic": "https://example.com/victorian-collection.png",
        "startTime": "2024-08-01T11:00:00.000Z",
        "endTime": "2024-08-05T19:00:00.000Z",
        "createdAt": "2024-08-01T11:00:00.000Z",
        "updatedAt": "2024-08-01T11:00:00.000Z"
      },
      {
        "AuctionId": "fcaba534-30b9-4140-bf82-602a801afe95",
        "name": "Medieval European Artifacts",
        "AuctionDetails": "This auction offers a selection of medieval European artifacts, including armor, weapons, and manuscripts.",
        "isPremium": "verified",
        "auctionPic": "https://example.com/medieval-artifacts.png",
        "startTime": "2024-08-10T14:00:00.000Z",
        "endTime": "2024-08-14T22:00:00.000Z",
        "createdAt": "2024-08-10T14:00:00.000Z",
        "updatedAt": "2024-08-10T14:00:00.000Z"
      },
      {
        "AuctionId": "730ffb10-b74e-49e8-a836-76d93a740e72",
        "name": "Renaissance Masterpieces",
        "AuctionDetails": "A collection of Renaissance-era masterpieces, including paintings, sculptures, and decorative arts.",
        "isPremium": "verified",
        "auctionPic": "https://example.com/renaissance-masterpieces.png",
        "startTime": "2024-08-20T13:00:00.000Z",
        "endTime": "2024-08-25T21:00:00.000Z",
        "createdAt": "2024-08-20T13:00:00.000Z",
        "updatedAt": "2024-08-20T13:00:00.000Z"
      },
      {
        "AuctionId": "7aa99ef9-cced-477b-a2a0-373a177839f3",
        "name": "Egyptian Pharaohs' Collection",
        "AuctionDetails": "This auction features items from the time of the Egyptian Pharaohs, including statues, jewelry, and manuscripts.",
        "isPremium": "verified",
        "auctionPic": "https://example.com/pharaohs-collection.png",
        "startTime": "2024-08-30T15:00:00.000Z",
        "endTime": "2024-09-03T23:00:00.000Z",
        "createdAt": "2024-08-30T15:00:00.000Z",
        "updatedAt": "2024-08-30T15:00:00.000Z"
      },
      {
        "AuctionId": "124dfa19-2d7f-4aaf-af7a-67f0dba64a29",
        "name": "Baroque Art Collection",
        "AuctionDetails": "A selection of Baroque art pieces, including paintings, sculptures, and tapestries.",
        "isPremium": "verified",
        "auctionPic": "https://example.com/baroque-art.png",
        "startTime": "2024-09-10T16:00:00.000Z",
        "endTime": "2024-09-14T00:00:00.000Z",
        "createdAt": "2024-09-10T16:00:00.000Z",
        "updatedAt": "2024-09-10T16:00:00.000Z"
      },
      {
        "AuctionId": "307eaec4-8b18-4950-891a-620163d242ef",
        "name": "Oriental Rug Collection",
        "AuctionDetails": "An exclusive auction of rare and valuable Oriental rugs from various regions.",
        "isPremium": "verified",
        "auctionPic": "https://example.com/oriental-rugs.png",
        "startTime": "2024-09-20T17:00:00.000Z",
        "endTime": "2024-09-24T01:00:00.000Z",
        "createdAt": "2024-09-20T17:00:00.000Z",
        "updatedAt": "2024-09-20T17:00:00.000Z"
      },
      {
        "AuctionId": "96bd3ba2-516c-4382-acdc-11e6f09a4697",
        "name": "Imperial Chinese Artifacts",
        "AuctionDetails": "This auction presents Imperial Chinese artifacts, including porcelain, paintings, and jade carvings.",
        "isPremium": "verified",
        "auctionPic": "https://example.com/chinese-artifacts.png",
        "startTime": "2024-09-30T18:00:00.000Z",
        "endTime": "2024-10-04T02:00:00.000Z",
        "createdAt": "2024-09-30T18:00:00.000Z",
        "updatedAt": "2024-09-30T18:00:00.000Z"
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
