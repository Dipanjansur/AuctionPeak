'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RolesPerm', [
      // ADMIN role - full access to everything
      {
        // RolePermissionId: '550ae525-1234-4567-890a-bcdef0123456',
        RoleId: 'cf6bdad9-6ad6-4a65-97aa-1db755cdceb6', // ADMIN
        PermissionId: 'de9e616b-6ce7-4a71-a851-4b6a528a58c6', // manage_auction
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      
      // CREATOR role - can create and view auctions
      {
        // RolePermissionId: '660be636-2345-4678-901b-cdefg1234567',
        RoleId: 'ad513c07-46b3-49c6-acf6-e1fe02c8c2e6', // CREATOR
        PermissionId: '71129e8c-b3ad-4816-90ec-a9770e2e13b8', // create_auction
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        // RolePermissionId: '770cf747-3456-4789-012c-defgh2345678',
        RoleId: 'ad513c07-46b3-49c6-acf6-e1fe02c8c2e6', // CREATOR
        PermissionId: '1733432e-0afe-4859-a919-7cd9536453d4', // view_auction
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      
      // MANAGERS role - can view and update auctions
      {
        // RolePermissionId: '880dg858-4567-4890-123d-efghi3456789',
        RoleId: '5f23c82c-f585-481f-ab0c-fee3016b7e7f', // MANAGERS
        PermissionId: 'b28e3ef7-246e-43b6-8744-d60270ed3f71', // update_auction
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        // RolePermissionId: '990eh969-5678-4901-234e-fghij4567890',
        RoleId: '5f23c82c-f585-481f-ab0c-fee3016b7e7f', // MANAGERS
        PermissionId: '1733432e-0afe-4859-a919-7cd9536453d4', // view_auction
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      
      // PARTICIPANTS role - can view auctions
      {
        // RolePermissionId: 'aa0fi070-6789-4012-345f-ghijk5678901',
        RoleId: '122fd644-a582-4f73-9d3b-88b3b1abba74', // PARTICIPANTS
        PermissionId: '1733432e-0afe-4859-a919-7cd9536453d4', // view_auction
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      
      // SUBSCRIBER role - can view auctions
      {
        // RolePermissionId: 'bb1gj181-7890-4123-456g-hijkl6789012',
        RoleId: '0971a2d9-af9d-4671-a77a-d4d73feb1d20', // SUBSCIBER
        PermissionId: '1733432e-0afe-4859-a919-7cd9536453d4', // view_auction
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      
      // GUEST role - no auction permissions
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('RolePermissions', null, {});
     */
  }
};