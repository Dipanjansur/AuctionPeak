'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('bids', [
      {
        BidsId: "0d27ad6a-bb82-4927-94c9-41aadf1e783b",
        amount: "21000",
        createdAt: "2024-07-10T12:00:00.000Z",
        updatedAt: "2024-07-10T12:00:00.000Z",
        userId: "92611941-4bbc-4d95-ae5e-d32b533d885c",
        itemId: "a1234567-89ab-4cde-f012-3456789abcde",
        auctionId: "203442c4-7e62-45e4-a6e5-6ab27e8857ac"
      },
      {
        BidsId: "1a34bd6e-c982-4c67-bc7f-6f0b5c5d7f4d",
        amount: "23000",
        createdAt: "2024-08-11T12:00:00.000Z",
        updatedAt: "2024-08-11T12:00:00.000Z",
        userId: "b65ca550-01cd-4dd9-b03f-af60b4a3f597",
        itemId: "b2345678-90bc-4def-a123-456789abcdef",
        auctionId: "e86ea7bc-acbd-4ee4-b349-c8fd46cf60bf"
      },
      {
        BidsId: "2b54dc7f-d678-42f6-a6df-7e0c7f8d9a0f",
        amount: "27000",
        createdAt: "2024-08-12T13:00:00.000Z",
        updatedAt: "2024-08-12T13:00:00.000Z",
        userId: "c77c1493-05b4-4482-bccf-49b336c4c821",
        itemId: "c3456789-01cd-4ef0-a234-56789abcdef0",
        auctionId: "b52491dc-21bf-449a-ac07-7e75b5d1c075"
      },
      {
        BidsId: "3c65ed8e-e789-43f7-b7ef-8f1d8f9e0b1f",
        amount: "31000",
        createdAt: "2024-08-13T14:00:00.000Z",
        updatedAt: "2024-08-13T14:00:00.000Z",
        userId: "c9934d20-11f7-4b3d-a8d0-c20a64e0917b",
        itemId: "d4567890-12de-5f01-a345-6789abcdef01",
        auctionId: "40e5a90e-fba4-440f-bbc7-532cf5571305"
      },
      {
        BidsId: "4d76fe9f-f89a-44f8-c8f0-9f2e9f0f1c2f",
        amount: "45000",
        createdAt: "2024-08-14T15:00:00.000Z",
        updatedAt: "2024-08-14T15:00:00.000Z",
        userId: "04d823e2-b3c6-4bca-8eb8-854bd4e46059",
        itemId: "e5678901-23ef-6f12-a456-789abcdef012",
        auctionId: "203442c4-7e62-45e4-a6e5-6ab27e8857ac"
      },
      {
        BidsId: "8940dd01-c41d-4d91-8910-1112f18f0a5f",
        amount: "48000",
        createdAt: "2024-08-15T16:00:00.000Z",
        updatedAt: "2024-08-15T16:00:00.000Z",
        userId: "967f9e52-7f66-4514-91f1-30186fb1aa70",
        itemId: "f6789012-34f1-7f23-a567-89abcdef0123",
        auctionId: "e86ea7bc-acbd-4ee4-b349-c8fd46cf60bf"
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
