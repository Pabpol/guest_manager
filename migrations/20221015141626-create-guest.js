'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      menu: {
        type: Sequelize.STRING
      },
      tiene_acompanante: {
        type: Sequelize.BOOLEAN
      },
      nombre_acompnanante: {
        type: Sequelize.STRING
      },
      apellido_acompanante: {
        type: Sequelize.STRING
      },
      menu_acompanante: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    queryInterface.addConstraint('Guests', {
      fields: ['mail'],
      type: 'unique',
      name: 'unique_mail'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Guests');
  }
};