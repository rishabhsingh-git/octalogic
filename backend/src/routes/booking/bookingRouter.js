const express = require('express');
const { createBooking, getAllBookings } = require('../../controller/booking/bookingController');

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings)

module.exports = router;
