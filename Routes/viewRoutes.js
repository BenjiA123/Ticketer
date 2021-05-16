
const express = require('express')
const viewRouter = express.Router()

const viewController = require('../controllers/viewController')
const bookingController = require('../controllers/bookingController')

viewRouter.route("/successfulPayment").get((req,res,next)=>{
    res.status(200).render('successPage',{
      data:"An email would be sent to you shortly"
    })
  })
viewRouter.route('/')
.get(
    // bookingController.createBookingCheckout,
    viewController.getOverview)
viewRouter.route('/ticket/:slug').get(viewController.getTicketDetail)

module.exports = viewRouter