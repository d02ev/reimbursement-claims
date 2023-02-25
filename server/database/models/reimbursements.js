'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reimbursements extends Model {
    static associate(models) {
      Reimbursements.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'requestedBy'
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
    approvedBy: DataTypes.STRING,
    internalNotes: DataTypes.TEXT,
    receiptName: DataTypes.TEXT,
    mimeType: DataTypes.TEXT,
    size: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Reimbursements',
  });
  return Reimbursements;
};