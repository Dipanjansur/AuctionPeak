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
      // BIDS PERMISSIONS
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474b2',
        PermissionName: "all_bids",
        action: "all",
        resource: "bids",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474b3',
        PermissionName: "view_bids",
        action: "view",
        resource: "bids",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474b4',
        PermissionName: "create_bids",
        action: "create",
        resource: "bids",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474b5',
        PermissionName: "update_bids",
        action: "update",
        resource: "bids",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474b6',
        PermissionName: "delete_bids",
        action: "delete",
        resource: "bids",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
      },

      // ITEMS PERMISSIONS
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474b7',
        PermissionName: "all_items",
        action: "all",
        resource: "items",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474b8',
        PermissionName: "view_items",
        action: "view",
        resource: "items",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474b9',
        PermissionName: "create_items",
        action: "create",
        resource: "items",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474c0',
        PermissionName: "update_items",
        action: "update",
        resource: "items",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
      },
      {
        PermissionId: '7452109d-f654-4de2-b064-c50cfaf474c1',
        PermissionName: "delete_items",
        action: "delete",
        resource: "items",
        createdAt: "2024-07-20T09:00:00.000Z",
        updatedAt: "2024-07-20T09:00:00.000Z"
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
