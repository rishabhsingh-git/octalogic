const { Booking, User, Vehicle, VehicleType } = require('../../../models');
const { Op } = require('sequelize');

const createBooking = async (req, res) => {
  try {
    const { first_name, last_name, vehicleId, start_date, end_date } = req.body;


    if (!first_name || !last_name || !vehicleId || !start_date || !end_date) {
      return res.status(400).json({ message: 'All fields are required.' });
    }


    const isOverlapping = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          {
            start_date: { [Op.between]: [start_date, end_date] },
          },
          {
            end_date: { [Op.between]: [start_date, end_date] },
          },
          {
            [Op.and]: [
              { start_date: { [Op.lte]: start_date } },
              { end_date: { [Op.gte]: end_date } },
            ],
          },
        ],
      },
    });

    if (isOverlapping) {
      return res
        .status(400)
        .json({ message: 'This vehicle is already booked in the selected date range.' });
    }


    const newUser = await User.create({ first_name, last_name });


    const newBooking = await Booking.create({
      userId: newUser.id,
      vehicleId,
      start_date,
      end_date,
    });

    return res.status(201).json({
      message: 'Booking confirmed successfully.',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Booking creation error:', error.message);
    return res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};


const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['first_name', 'last_name'] },
        {
          model: Vehicle,
          attributes: ['vehicleTypeId','model_name'],
          include: {
            model: VehicleType,
            attributes: ['name', 'wheels']
          }
        }
      ]
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        message: 'No bookings found.',
        data: [],
      });
    }

    return res.status(200).json({
      message: 'Bookings fetched successfully.',
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    return res.status(500).json({
      message: 'An error occurred while fetching bookings.',
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings
};
