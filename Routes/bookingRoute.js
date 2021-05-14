
const express = require('express')
const bookingRouter = express.Router()

const bookingController = require('../controllers/bookingController');


bookingRouter.route('/')
.get(bookingController.getAllBookings)
.post(bookingController.createOneBooking)

.delete(bookingController.deleteBookings)

bookingRouter.patch("/:id",bookingController.updateOneBooking)

bookingRouter.get('/checkout-session/:ticketID',bookingController.getCheckoutSession)

module.exports = bookingRouter

