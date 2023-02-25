'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Reimbursements',
        'approvedBy',
        {
          allowNull: false,
          type: Sequelize.STRING,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Reimbursements',
        'internalNotes',
        {
          allowNull: false,
          type: Sequelize.TEXT,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Reimbursements',
        'receiptName',
        {
          allowNull: false,
          type: Sequelize.TEXT,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Reimbursements',
        'mimeType',
        {
          allowNull: false,
          type: Sequelize.TEXT,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Reimbursements',
        'size',
        {
          allowNull: false,
          type: Sequelize.BIGINT,
          defaultValue: 0
        }
      ),
      queryInterface.removeColumn(
        'Reimbursements',
        'hasReceipt'
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Reimbursements', 'approvedBy'),
      queryInterface.removeColumn('Reimbursements', 'internalNotes'),
      queryInterface.removeColumn('Reimbursements', 'receiptName'),
      queryInterface.removeColumn('Reimbursements', 'mimeType'),
      queryInterface.removeColumn('Reimbursements', 'size'),
    ]);
  }
};
