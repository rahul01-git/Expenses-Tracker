'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ExpensesTags extends Model {
    static associate(models) {
      ExpensesTags.belongsTo(models.Expense)
      models.Expense.hasMany(ExpensesTags)
      ExpensesTags.belongsTo(models.tags)
      models.tags.hasMany(ExpensesTags)
    }
  }

  ExpensesTags.init(
    {
      expenses_id: DataTypes.INTEGER,
      tag_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ExpensesTags',
    }
  );

  return ExpensesTags;
};
