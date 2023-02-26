'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'Reimbursements',
        'requestedValue',
        {
          allowNull: false,
          type: Sequelize.DECIMAL,
          defaultValue: 0.0
        }
      ),
      queryInterface.changeColumn(
        'Reimbursements',
        'approvedValue',
        {
          allowNull: false,
          type: Sequelize.DECIMAL,
          defaultValue: 0.0
        }
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Reimbursements', 'requestedValue'),
      queryInterface.removeColumn('Reimbursements', 'approvedValue')
    ]);
  }
};
