'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expenses_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      expenses_tags.belongsTo(models.expenses)
      expenses_tags.belongsTo(models.tags)
      models.tags.hasMany(expenses_tags)
      models.expenses.hasMany(expenses_tags)
    }
  }
  expenses_tags.init({
    expenses_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'expenses_tags',
  });
  return expenses_tags;
};