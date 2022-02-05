'use strict';

const {
  user,
  teams
} = require("../../../src/app/models");

const {
  faker
} = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    var seeds = [];

    for (let i = 0; i < 30; i++) {
      let userCount = await user.count();
      let teamCount = await teams.count();
      const seed = {
        user_id: Math.floor(Math.random() * userCount) + 1,
        team_id: Math.floor(Math.random() * teamCount) + 1,
        roles: "MEMBER",
        ingame_id: Math.floor(Math.random() * 1000000000),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
      };
      seeds.push(seed);
    }

    return await queryInterface.bulkInsert('team_members', seeds);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('team_members', null, {});
  }
};