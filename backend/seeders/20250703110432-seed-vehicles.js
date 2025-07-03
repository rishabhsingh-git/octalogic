'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // We'll assume these IDs match the insert order above
    await queryInterface.bulkInsert('Vehicles', [
      { model_name: 'Swift', vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },     // Hatchback
      { model_name: 'Thar', vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },       // SUV
      { model_name: 'Honda City', vehicleTypeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Sedan
      { model_name: 'Royal Enfield', vehicleTypeId: 4, createdAt: new Date(), updatedAt: new Date() } // Cruiser
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
