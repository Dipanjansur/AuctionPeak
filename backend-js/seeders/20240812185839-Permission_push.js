'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Permissions', [


      // all auction actions
      {
        PermissionId: 'de9e616b-6ce7-4a71-a851-4b6a528a58c6',
        PermissionName: "manage_auction",
        action: "all",
        resource: "auction",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '1733432e-0afe-4859-a919-7cd9536453d4',
        PermissionName: "view_auction",
        action: "view",
        resource: "auction",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '71129e8c-b3ad-4816-90ec-a9770e2e13b8',
        PermissionName: "create_auction",
        action: "create",
        resource: "auction",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: 'b28e3ef7-246e-43b6-8744-d60270ed3f71',
        PermissionName: "update_auction",
        action: "upcate",
        resource: "auction",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474b1',
        PermissionName: "delete_auction",
        action: "delete",
        resource: "auction",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
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
