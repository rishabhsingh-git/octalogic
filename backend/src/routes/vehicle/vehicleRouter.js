const express = require('express');
const { getVehicleTypes, getVehiclesByType } = require('../../controller/vehicle/vehicleController');

const router = express.Router();

router.get('/vehicle-types',getVehicleTypes );
router.get('/vehicles/:typeId', getVehiclesByType);

module.exports = router;
