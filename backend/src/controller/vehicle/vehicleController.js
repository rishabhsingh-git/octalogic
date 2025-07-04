const { VehicleType, Vehicle } = require('../../../models');

const getVehicleTypes = async (req, res) => {
  try {
    const wheels = req.query.wheels;
    const whereClause = wheels ? { wheels: parseInt(wheels) } : {};

    const vehicleTypes = await VehicleType.findAll({ where: whereClause });

    if (!vehicleTypes || vehicleTypes.length === 0) {
      return res.status(404).json({
        message: 'No vehicle types found for the specified criteria.',
        data: [],
      });
    }

    return res.status(200).json({
      message: 'Vehicle types fetched successfully.',
      data: vehicleTypes,
    });
  } catch (error) {
    console.error('Error fetching vehicle types:', error.message);
    return res.status(500).json({
      message: 'An error occurred while fetching vehicle types.',
    });
  }
};

const getVehiclesByType = async (req, res) => {
  try {
    const { typeId } = req.params;

    if (!typeId || isNaN(typeId)) {
      return res.status(400).json({
        message: 'Invalid or missing vehicle type ID.',
      });
    }

    const vehicles = await Vehicle.findAll({
      where: { vehicleTypeId: Number(typeId) },
    });

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({
        message: 'No vehicles found for the selected type.',
        data: [],
      });
    }

    return res.status(200).json({
      message: 'Vehicles fetched successfully.',
      data: vehicles,
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error.message);   
    return res.status(500).json({
      message: 'An error occurred while fetching vehicles.',
    });
  }
};

module.exports = {
  getVehicleTypes,
  getVehiclesByType,
};
