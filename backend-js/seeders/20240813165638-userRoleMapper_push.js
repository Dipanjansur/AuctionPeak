'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('UserRoles', [
      {
        "userId": "967f9e52-7f66-4514-91f1-30186fb1aa70",
        "roleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z"
      },
      {
        "userId": 'b65ca550-01cd-4dd9-b03f-af60b4a3f597',
        "roleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      },
      {
        "userId": 'c77c1493-05b4-4482-bccf-49b336c4c821',
        "roleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": 'c9934d20-11f7-4b3d-a8d0-c20a64e0917b',
        "roleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": '04d823e2-b3c6-4bca-8eb8-854bd4e46059',
        "roleId": "122fd644-a582-4f73-9d3b-88b3b1abba74",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": 'be57ec59-d6ef-4d28-88a3-b0624ad66d46',
        "roleId": "2598b427-8517-4d27-a982-5882c1527dae",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": 'be57ec59-d6ef-4d28-88a3-b0624ad66d46',
        "roleId": "122fd644-a582-4f73-9d3b-88b3b1abba74",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": '92611941-4bbc-4d95-ae5e-d32b533d885c',
        "roleId": "122fd644-a582-4f73-9d3b-88b3b1abba74",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      },
      {
        "userId": '92611941-4bbc-4d95-ae5e-d32b533d885c',
        "roleId": "2598b427-8517-4d27-a982-5882c1527dae",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": '92611941-4bbc-4d95-ae5e-d32b533d885c',
        "roleId": "0971a2d9-af9d-4671-a77a-d4d73feb1d20",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": '92611941-4bbc-4d95-ae5e-d32b533d885c',
        "roleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": '8ec2288f-f098-46c3-90df-6306d819d826',
        "roleId": "2598b427-8517-4d27-a982-5882c1527dae",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": '8ec2288f-f098-46c3-90df-6306d819d826',
        "roleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": '92611941-4bbc-4d95-ae5e-d32b533d885c',
        "roleId": "5f23c82c-f585-481f-ab0c-fee3016b7e7f",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": '07179fd6-47eb-4b0f-ac32-2f9f4995be52',
        "roleId": "2598b427-8517-4d27-a982-5882c1527dae",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
      }, {
        "userId": '8a8aaa1b-4968-4d46-b895-9afb6c126a07',
        "roleId": "2598b427-8517-4d27-a982-5882c1527dae",
        "createdAt": "2024-08-01T12:00:00.000Z",
        "updatedAt": "2024-08-01T12:00:00.000Z",
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
