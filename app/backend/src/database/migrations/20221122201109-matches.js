'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id:{
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      home_team: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      home_team_goals: Sequelize.INTEGER,
      away_team: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      away_team_goals: Sequelize.INTEGER,
      in_progress: Sequelize.BOOLEAN
    }, {timestamps: false})
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('matches')
  }
};
