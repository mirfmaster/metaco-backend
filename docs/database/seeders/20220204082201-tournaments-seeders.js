'use strict';
const {
  faker
} = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    var seeds = [];

    for (let i = 0; i < 10; i++) {
      const seed = {
        title: faker.company.companyName(),
        start_date: faker.date.future(),
        end_date: faker.date.future(),
        team_count: Math.floor(Math.random() * 32),
        slot: Math.floor(Math.random() * 32) + 1,
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
      };
      seeds.push(seed);
    }

    return await queryInterface.bulkInsert('tournaments', seeds);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tournaments', null, {});
  }
};