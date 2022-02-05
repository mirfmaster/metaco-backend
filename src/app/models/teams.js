'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  teams.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    captain_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
    },
    logo: {
      type: DataTypes.STRING(255),
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: "tournaments",
        key: "id",
      },
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
    modelName: 'teams',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return teams;
};