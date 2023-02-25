'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reimbursements extends Model {
    static associate(models) {
      Reimbursements.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'claimingAuthority'
      });

      Reimbursements.hasOne(models.Receipts, {
        foreignKey: 'reimbursementId',
        as: 'attachedReceipt',
        onDelete: 'CASCADE'
      });
    }
  }
  Reimbursements.init({
    date: DataTypes.DATE,
    reimbursementType: DataTypes.STRING,
    requestedValue: DataTypes.DOUBLE,
    approvedValue: DataTypes.DOUBLE,
    currency: DataTypes.INTEGER,
    receiptAttached: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    requestPhase: DataTypes.STRING,
    isApproved: DataTypes.BOOLEAN,
    hasReceipt: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reimbursements',
  });
  return Reimbursements;
};