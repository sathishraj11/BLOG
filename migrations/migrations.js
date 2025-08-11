module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'googleId', {
      type: Sequelize.STRING,
      allowNull: true, // Allow null for this column
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'googleId', {
      type: Sequelize.STRING,
      allowNull: false, // Revert to not null if needed
    });
  },
};

  