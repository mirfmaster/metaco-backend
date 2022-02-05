'use strict';
const {
  faker
} = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    var seeds = [];

    for (let i = 0; i < 10; i++) {
      const seed = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        coin: 0,
        picture: "https://liquipedia.net/commons/images/d/d0/Boom_Esports_allmode.png",
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
      };
      seeds.push(seed);
    }

    return await queryInterface.bulkInsert('Users', seeds);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};