'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('team_members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      team_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "teams",
          key: "id",
        },
      },
      roles: {
        type: Sequelize.ENUM,
        values: [
            'CAPTAIN',
            'MEMBER',
            'STANDIN',
        ],
        defaultValue: 'MEMBER'
      },
      ingame_id: {
        type: Sequelize.STRING(255),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('team_members');
  }
};