'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('items', [
      {
        "ItemId": "a1234567-89ab-4cde-f012-3456789abcde",
        "ItemName": "Maharaja's Throne",
        "ItemDescription": "The majestic throne of a Maharaja, carved from pure gold and adorned with precious gems.",
        "CurrentPrice": 55000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "203442c4-7e62-45e4-a6e5-6ab27e8857ac",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
        "Owner": "967f9e52-7f66-4514-91f1-30186fb1aa70"
      },
      {
        "ItemId": "b2345678-90bc-4def-a123-456789abcdef",
        "ItemName": "Queen's Necklace",
        "ItemDescription": "A necklace worn by a queen, made of pearls and diamonds, symbolizing royal elegance.",
        "CurrentPrice": 78000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "e86ea7bc-acbd-4ee4-b349-c8fd46cf60bf",
        "createdAt": "2024-08-05T13:30:00.000Z",
        "updatedAt": "2024-08-05T13:30:00.000Z",
        "Owner": "b65ca550-01cd-4dd9-b03f-af60b4a3f597"
      },
      {
        "ItemId": "c3456789-01cd-4ef0-a234-56789abcdef0",
        "ItemName": "Ancient Persian Rug",
        "ItemDescription": "A centuries-old Persian rug, intricately woven with traditional designs and motifs.",
        "CurrentPrice": 45000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "b52491dc-21bf-449a-ac07-7e75b5d1c075",
        "createdAt": "2024-08-10T14:00:00.000Z",
        "updatedAt": "2024-08-10T14:00:00.000Z",
        "Owner": "c77c1493-05b4-4482-bccf-49b336c4c821"
      },
      {
        "ItemId": "d4567890-12de-5f01-a345-6789abcdef01",
        "ItemName": "Medieval Knight Armor",
        "ItemDescription": "A complete set of medieval knight armor, preserved in excellent condition.",
        "CurrentPrice": 62000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "40e5a90e-fba4-440f-bbc7-532cf5571305",
        "createdAt": "2024-08-15T15:00:00.000Z",
        "updatedAt": "2024-08-15T15:00:00.000Z",
        "Owner": "c9934d20-11f7-4b3d-a8d0-c20a64e0917b"
      },
      {
        "ItemId": "e5678901-23ef-6f12-a456-789abcdef012",
        "ItemName": "Renaissance Painting",
        "ItemDescription": "A rare painting from the Renaissance period, depicting a scene of historical significance.",
        "CurrentPrice": 90000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "203442c4-7e62-45e4-a6e5-6ab27e8857ac",
        "createdAt": "2024-08-20T16:00:00.000Z",
        "updatedAt": "2024-08-20T16:00:00.000Z",
        "Owner": "04d823e2-b3c6-4bca-8eb8-854bd4e46059"
      },
      {
        "ItemId": "f6789012-34f1-7f23-a567-89abcdef0123",
        "ItemName": "Imperial Chinese Vase",
        "ItemDescription": "An exquisite Imperial Chinese vase, crafted with delicate porcelain and intricate designs.",
        "CurrentPrice": 125000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "e86ea7bc-acbd-4ee4-b349-c8fd46cf60bf",
        "createdAt": "2024-08-25T17:30:00.000Z",
        "updatedAt": "2024-08-25T17:30:00.000Z",
        "Owner": "967f9e52-7f66-4514-91f1-30186fb1aa70"
      },
      {
        "ItemId": "4242a67f-cdf2-45d9-8c33-15ea4417150e",
        "ItemName": "Victorian Era Furniture",
        "ItemDescription": "A collection of Victorian Era furniture, including a chaise lounge and a writing desk.",
        "CurrentPrice": 84000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "b52491dc-21bf-449a-ac07-7e75b5d1c075",
        "createdAt": "2024-08-30T18:00:00.000Z",
        "updatedAt": "2024-08-30T18:00:00.000Z",
        "Owner": "b65ca550-01cd-4dd9-b03f-af60b4a3f597"
      },
      {
        "ItemId": "a3c1da9c-ae0b-41dc-95e1-4e4ecd5bf919",
        "ItemName": "Ancient Greek Statue",
        "ItemDescription": "A statue from ancient Greece, representing a deity, carved from marble.",
        "CurrentPrice": 105000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "40e5a90e-fba4-440f-bbc7-532cf5571305",
        "createdAt": "2024-09-05T19:00:00.000Z",
        "updatedAt": "2024-09-05T19:00:00.000Z",
        "Owner": "c77c1493-05b4-4482-bccf-49b336c4c821"
      },
      {
        "ItemId": "2b657b6d-5b32-44e4-b605-4911e7970eb8",
        "ItemName": "Mughal Era Sword",
        "ItemDescription": "A sword from the Mughal Era, with a jeweled hilt and a finely crafted blade.",
        "CurrentPrice": 72000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "203442c4-7e62-45e4-a6e5-6ab27e8857ac",
        "createdAt": "2024-09-10T20:00:00.000Z",
        "updatedAt": "2024-09-10T20:00:00.000Z",
        "Owner": "04d823e2-b3c6-4bca-8eb8-854bd4e46059"
      },
      {
        "ItemId": "30a746ff-1ae5-4520-9c8f-a3e13f60614d",
        "ItemName": "Pharaoh's Gold Mask",
        "ItemDescription": "An ancient Egyptian gold mask, believed to have belonged to a pharaoh.",
        "CurrentPrice": 150000,
        "Bio": null,
        "Status": "LISTED",
        "auctionId": "e86ea7bc-acbd-4ee4-b349-c8fd46cf60bf",
        "createdAt": "2024-09-15T21:30:00.000Z",
        "updatedAt": "2024-09-15T21:30:00.000Z",
        "Owner": "c9934d20-11f7-4b3d-a8d0-c20a64e0917b"
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
