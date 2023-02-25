'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Receipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageName: {
        type: Sequelize.TEXT,
        defaultValue: 'No Image Attached'
      },
      imagePath: {
        type: Sequelize.TEXT,
        defaultValue: 'No Image Attached'
      },
      mimeType: {
        type: Sequelize.TEXT,
        defaultValue: 'No Image Attached'
      },
      size: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      reimbursementId: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Receipts');
  }
};