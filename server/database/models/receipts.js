'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipts extends Model {
    static associate(models) {
      Receipts.belongsTo(models.Reimbursements, {
        foreignKey: 'reimbursementId',
        as: 'reimbursements'
      });
    }
  }
  Receipts.init({
    image: DataTypes.STRING,
    imageData: DataTypes.BLOB,
    reimbursementId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Receipts',
  });
  return Receipts;
};