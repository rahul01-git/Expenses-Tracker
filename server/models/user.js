'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    role: {
      type: DataTypes.ENUM('user','admin'),
      defaultValue: 'user',
    },
    status:{
      type: DataTypes.ENUM('verified','pending','blocked'),
      defaultValue: 'pending',
    },
    soft_delete:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};