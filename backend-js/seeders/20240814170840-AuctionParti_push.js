'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AuctionParticipants', [
      {
        userId: "967f9e52-7f66-4514-91f1-30186fb1aa70",
        auctionId: "203442c4-7e62-45e4-a6e5-6ab27e8857ac",
      },
      {
        userId: "b65ca550-01cd-4dd9-b03f-af60b4a3f597",
        auctionId: "e86ea7bc-acbd-4ee4-b349-c8fd46cf60bf",
      },
      {
        userId: "c9934d20-11f7-4b3d-a8d0-c20a64e0917b",
        auctionId: "b52491dc-21bf-449a-ac07-7e75b5d1c075",
      },
      {
        userId: "c9934d20-11f7-4b3d-a8d0-c20a64e0917b",
        auctionId: "40e5a90e-fba4-440f-bbc7-532cf5571305",
      },
      {
        userId: "c9934d20-11f7-4b3d-a8d0-c20a64e0917b",
        auctionId: "fcaba534-30b9-4140-bf82-602a801afe95",
      }
      // Add more entries as needed
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AuctionParticipants', null, {});
  }
};
