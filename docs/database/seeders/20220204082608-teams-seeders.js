'use strict';

const {
  tournaments,
  sequelize,
  user
} = require("../../../src/app/models/");

const {
  faker
} = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    var seeds = [];

    for (let i = 0; i < 10; i++) {
      let tournamentCount = await tournaments.count();
      let userCount = await user.count();
      const seed = {
        name: faker.company.companyName(),
        captain_id: Math.floor(Math.random() * userCount) + 1,
        logo: faker.company.companyName(),
        tournament_id: Math.floor(Math.random() * tournamentCount) + 1,
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
      };
      seeds.push(seed);
    }

    return await queryInterface.bulkInsert('teams', seeds);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teams', null, {});
  }
};