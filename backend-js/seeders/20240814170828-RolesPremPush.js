'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('RolesPerm', [
            {
                "permId": "de9e616b-6ce7-4a71-a851-4b6a528a58c6", // manage_auction
                "roleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6", // ADMIN
                "createdAt": "2024-08-01T12:00:00.000Z",
                "updatedAt": "2024-08-01T12:00:00.000Z"
            },
            {
                "permId": "1733432e-0afe-4859-a919-7cd9536453d4", // view_auction
                "roleId": "5f23c82c-f585-481f-ab0c-fee3016b7e7f", // MANAGERS
                "createdAt": "2024-08-01T12:00:00.000Z",
                "updatedAt": "2024-08-01T12:00:00.000Z"
            },
            {
                "permId": "71129e8c-b3ad-4816-90ec-a9770e2e13b8", // create_auction
                "roleId": "ad513c07-46b3-49c6-acf6-e1fe02c8c2e6", // CREATOR
                "createdAt": "2024-08-01T12:00:00.000Z",
                "updatedAt": "2024-08-01T12:00:00.000Z"
            },
            {
                "permId": "b28e3ef7-246e-43b6-8744-d60270ed3f71", // update_auction
                "roleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6", // ADMIN
                "createdAt": "2024-08-01T12:00:00.000Z",
                "updatedAt": "2024-08-01T12:00:00.000Z"
            },
            {
                "permId": "7452109d-f654-4de2-b064-c50cfaf474b1", // delete_auction
                "roleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6", // ADMIN
                "createdAt": "2024-08-01T12:00:00.000Z",
                "updatedAt": "2024-08-01T12:00:00.000Z"
            },
            {
                "permId": "1733432e-0afe-4859-a919-7cd9536453d4", // view_auction
                "roleId": "0971a2d9-af9d-4671-a77a-d4d73feb1d20", // SUBSCIBER
                "createdAt": "2024-08-01T12:00:00.000Z",
                "updatedAt": "2024-08-01T12:00:00.000Z"
            },
            {
                "permId": "71129e8c-b3ad-4816-90ec-a9770e2e13b8", // create_auction
                "roleId": "122fd644-a582-4f73-9d3b-88b3b1abba74", // PARTICIPANTS
                "createdAt": "2024-08-01T12:00:00.000Z",
                "updatedAt": "2024-08-01T12:00:00.000Z"
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('RolesPerm', null, {});
    }
};
