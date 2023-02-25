'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reimbursements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      reimbursementType: {
        type: Sequelize.STRING,
        defaultValue: 'Misc'
      },
      requestedValue: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      approvedValue: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      currency: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // 0 - INR, 1 - USD, 2 - Euro
      },
      receiptAttached: {
        type: Sequelize.STRING,
        defaultValue: 'Not Attached'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      requestPhase: {
        type: Sequelize.STRING,
        defaultValue: "In Process"
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      hasReceipt: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reimbursements');
  }
};