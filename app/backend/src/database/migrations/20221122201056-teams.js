'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id:{
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      team_name: Sequelize.STRING,
    }, {timestamps: false})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
