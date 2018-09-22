'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        default: Sequelize.DataTypes.UUIDV4
      },
      firstName: {
        type: Sequelize.DataTypes.STRING
      },
      lastName: {
        type: Sequelize.DataTypes.STRING
      },
      email: {
        type: Sequelize.DataTypes.STRING
      },
      password: {
        type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
