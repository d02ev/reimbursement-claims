'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Reimbursements, {
        foreignKey: 'userId',
        as: 'claims',
        onDelete: 'CASCADE'
      });
    }
  }
  Users.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    PAN: DataTypes.STRING,
    bankName: DataTypes.STRING,
    bankAccountNumber: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    role: DataTypes.INTEGER,
    isApprover: DataTypes.BOOLEAN,
    passwordHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};