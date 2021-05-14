
const express = require('express')
const viewRouter = express.Router()

const viewController = require('../controllers/viewController')
const bookingController = require('../controllers/bookingController')

viewRouter.route('/').get(bookingController.createBookingCheckout,
    
    viewController.getOverview)
viewRouter.route('/ticket/:slug').get(viewController.getTicketDetail)

module.exports = viewRouter