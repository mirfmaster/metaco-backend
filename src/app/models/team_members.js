'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team_members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  team_members.init({
    firstName: DataTypes.STRING,
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
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
    roles: {
      type: DataTypes.ENUM,
      values: [
        'CAPTAIN',
        'MEMBER',
        'STANDIN',
      ],
      defaultValue: 'MEMBER'
    },
    ingame_id: {
      type: DataTypes.STRING(255),
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
    modelName: 'team_members',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return team_members;
};