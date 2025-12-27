'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Roles', [
      {
        "RoleId": "cf6bdad9-6ad6-4a65-97aa-1db755cdceb6",
        "name": "ADMIN",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        "RoleId": "ad513c07-46b3-49c6-acf6-e1fe02c8c2e6",
        "name": "CREATOR",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        "RoleId": "5f23c82c-f585-481f-ab0c-fee3016b7e7f",
        "name": "MANAGERS",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        "RoleId": "122fd644-a582-4f73-9d3b-88b3b1abba74",
        "name": "PARTICIPANTS",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        "RoleId": "0971a2d9-af9d-4671-a77a-d4d73feb1d20",
        "name": "SUBSCIBER",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
      },
      {
        "RoleId": "2598b427-8517-4d27-a982-5882c1527dae",
        "name": "GUEST",
        "createdAt": "2024-07-20T09:00:00.000Z",
        "updatedAt": "2024-07-20T09:00:00.000Z"
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
