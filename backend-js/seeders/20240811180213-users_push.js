'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        "usersId": "967f9e52-7f66-4514-91f1-30186fb1aa70",
        "username": "kayak_aasf",
        "password": "$2y$10$SrIzwPop6VtZC5Ty0AMulONIyLMwzpFn2X4VXNpeK3DpTEIDbtbSy",////qwert
        "firstName": "asdaf",
        "email": "kayak_asdaf@ninjas.com",
        "lastName": "ninja",
        "bio": "I am a casual user",
        "createdAt": "2024-08-12T02:25:26+00:00",
        "updatedAt": "2024-08-12T02:25:26+00:00"

      },
      {
        "usersId": "b65ca550-01cd-4dd9-b03f-af60b4a3f597",
        "username": "surfing_sam",
        "password": "$2y$10$g1F8lZ9R8Hq/9/CXxTvOdOK8A2q9zVdNbm9Cv0NjlBj9gpUdWuRly", ////password123
        "firstName": "Sam",
        "email": "sam_surfing@ninjas.com",
        "lastName": "Smith",
        "bio": "I love surfing!",
        "createdAt": "2024-08-12T02:30:00+00:00",
        "updatedAt": "2024-08-12T02:30:00+00:00"
      },
      {
        "usersId": "c77c1493-05b4-4482-bccf-49b336c4c821",
        "username": "coding_joe",
        "password": "$2y$10$0x7iYr/dN35qRgjk5v1jT.dm6GFJ1fIYc6B1zXqYPn2MZTLRzvDgO", ////securepass
        "firstName": "Joe",
        "email": "joe_coding@ninjas.com",
        "lastName": "Doe",
        "bio": "Coding enthusiast.",
        "createdAt": "2024-08-12T02:31:00+00:00",
        "updatedAt": "2024-08-12T02:31:00+00:00"
      },
      {
        "usersId": "c9934d20-11f7-4b3d-a8d0-c20a64e0917b",
        "username": "hiking_hank",
        "password": "$2y$10$QFq9ZdE1b3zPB6k/o9Jb9e4FRYdHwOrXY/x/2wLQTh/R2f0.bz7X2", ////letmein
        "firstName": "Hank",
        "email": "hank_hiking@ninjas.com",
        "lastName": "Hill",
        "bio": "Nature lover.",
        "createdAt": "2024-08-12T02:32:00+00:00",
        "updatedAt": "2024-08-12T02:32:00+00:00"
      },
      {
        "usersId": "04d823e2-b3c6-4bca-8eb8-854bd4e46059",
        "username": "gaming_gary",
        "password": "$2y$10$zBq7wQXZzz1jTJoBbQXcV.eJsyI0yM9vQXYzXJqKm6RbPr9D0fWMW", ////gamer4life
        "firstName": "Gary",
        "email": "gary_gaming@ninjas.com",
        "lastName": "Gray",
        "bio": "Pro gamer.",
        "createdAt": "2024-08-12T02:33:00+00:00",
        "updatedAt": "2024-08-12T02:33:00+00:00"
      },
      {
        "usersId": "be57ec59-d6ef-4d28-88a3-b0624ad66d46",
        "username": "travelling_tina",
        "password": "$2y$10$ZwT5kM5/Z0ZtycX.ztO7KudcJcHp5F6PjDfIw6MxKCdG4tOrlUy4G", ////adventure2024
        "firstName": "Tina",
        "email": "tina_travelling@ninjas.com",
        "lastName": "Turner",
        "bio": "World traveler.",
        "createdAt": "2024-08-12T02:34:00+00:00",
        "updatedAt": "2024-08-12T02:34:00+00:00"
      },
      {
        "usersId": "8a8aaa1b-4968-4d46-b895-9afb6c126a07",
        "username": "baking_betty",
        "password": "$2y$10$T4bS0X1B7b0zX3zFp/ZjR.hH1kFV6QzUvL6DjZ5D1PYRbQ2/RPY6C", ////bakeit123
        "firstName": "Betty",
        "email": "betty_baking@ninjas.com",
        "lastName": "Baker",
        "bio": "Baking is my passion.",
        "createdAt": "2024-08-12T02:35:00+00:00",
        "updatedAt": "2024-08-12T02:35:00+00:00"
      },
      {
        "usersId": "07179fd6-47eb-4b0f-ac32-2f9f4995be52",
        "username": "fishing_fred",
        "password": "$2y$10$V4C/dO6l0fU/7E5I9XzVqOIXjN/VqT1qvPr1GZp9lQ1c3Uj0W2xYG", ////catchoftheday
        "firstName": "Fred",
        "email": "fred_fishing@ninjas.com",
        "lastName": "Fisher",
        "bio": "Fishing is life.",
        "createdAt": "2024-08-12T02:36:00+00:00",
        "updatedAt": "2024-08-12T02:36:00+00:00"
      },
      {
        "usersId": "8ec2288f-f098-46c3-90df-6306d819d826",
        "username": "photography_pam",
        "password": "$2y$10$T7X2sO1H7e3JZ3fXQ6PjO.hL2nPqYzXnO8XzT3JmN1CzR1Y0W2rM6", ////snapshot
        "firstName": "Pam",
        "email": "pam_photography@ninjas.com",
        "lastName": "Parker",
        "bio": "Capturing moments.",
        "createdAt": "2024-08-12T02:37:00+00:00",
        "updatedAt": "2024-08-12T02:37:00+00:00"
      },
      {
        "usersId": "d37fbcd2-c7a0-4a5a-86b4-3d39516e7d18",
        "username": "reading_ron",
        "password": "$2y$10$T8X4oZ2J7g4QZ3hZQ7QjO.hN2rPpZyXpP9ZrX1KmJ2EzR2Y0X3yN6", ////bookworm
        "firstName": "Ron",
        "email": "ron_reading@ninjas.com",
        "lastName": "Reed",
        "bio": "Book lover.",
        "createdAt": "2024-08-12T02:38:00+00:00",
        "updatedAt": "2024-08-12T02:38:00+00:00"
      },
      {
        "usersId": "92611941-4bbc-4d95-ae5e-d32b533d885c",
        "username": "cycling_claire",
        "password": "$2y$10$R9Z1xV6J5e2CZ3fXQ6TjO.hL3mTqYyXqQ9XyZ2KmL1DzS2Y1X4zN6", ////pedalpower
        "firstName": "Claire",
        "email": "claire_cycling@ninjas.com",
        "lastName": "Carter",
        "bio": "Cycling enthusiast.",
        "createdAt": "2024-08-12T02:39:00+00:00",
        "updatedAt": "2024-08-12T02:39:00+00:00"
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
