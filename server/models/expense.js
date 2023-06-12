'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expense.belongsTo(models.User);
      Expense.belongsTo(models.Category);
      models.User.hasMany(Expense)
      models.Category.hasMany(Expense)
    }
  }
  Expense.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: DataTypes.INTEGER,
    note: DataTypes.STRING,
    image: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    soft_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    expenses_data: {
      type: DataTypes.DATE,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};