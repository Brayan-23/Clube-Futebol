'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id:{
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      username: Sequelize.STRING,
      role: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    }, {timestamps: false})
  },

  down: async (queryInterface) => {
   await queryInterface.dropTable('users')
},
};
