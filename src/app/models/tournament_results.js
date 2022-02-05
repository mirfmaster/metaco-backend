'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tournament_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tournament_results.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    team_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: "teams",
        key: "id",
      },
    },
    position: {
      type: DataTypes.INTEGER,
    },
    point: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'tournament_results',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  tournament_results.associate = (models) => {
    tournament_results.belongsTo(models.teams, {
      foreignKey: "team_id",
      as: "team",
    });

  };

  tournament_results.addHook('afterCreate', async (result, options) => {
    updateCoinTeamMember(result, options)
  });

  async function updateCoinTeamMember(result, options) {
    const members = await sequelize.models.team_members.findAll({
      where: {
        team_id: result.dataValues.team_id
      }
    })

    const member_id = members.map((member) => {
      return member.dataValues.id
    })

    let user_members = await sequelize.models.user.findAll({
      where: {
        id: member_id
      }
    })

    user_members.map(async (user) => {
      await user.update({
        coin: result.dataValues.point + user.dataValues.coin
      })
    })
  }

  return tournament_results;
};