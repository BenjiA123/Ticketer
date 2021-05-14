const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Ticket = require('../Models/ticketModel');
const Booking = require('../Models/bookingModel');
const factory = require('./handlerFactory')

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getCheckoutSession = catchAsync(async(req,res,next)=>{
    // Get currently booked ticket
    const ticket = await Ticket.findById(req.params.ticketID)

    // Create checkout
    const session = await stripe.checkout.sessions.create({
        // The first 3 are compulsory
        payment_method_types:['card'],
        success_url:`${req.protocol}://${req.get("host")}/?ticket=${req.params.ticketID}&price=${ticket.price}`,
        cancel_url:`${req.protocol}://${req.get("host")}/ticket/${ticket.slug}`,
        customer_email:ticket.email,
        client_reference_id:req.params.ticketID,


        line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                    name:`${ticket.ticketname}'s Ticket`,
                    images: ['https://www.natours.dev/img/tours/tour-1-cover.jpg'],
                },
                unit_amount: ticket.price * 1000,
              },
              quantity: 1,
            },
          ],
          mode: 'payment'

    })
  

    // Send to client
    res.status(200).json({
        status:'success',
        session
    })


})

exports.createBookingCheckout = catchAsync(async(req,res,next)=>{


    const {ticket,price} = req.query
    if(!ticket || !price) return next()

    await Booking.create({ticket,price})

    res.redirect(req.originalUrl.split('?')[0])
})


exports.getAllBookings = factory.getAll(Booking)

exports.createOneBooking= factory.createOne(Booking)

exports.updateOneBooking= factory.updateOne(Booking)

exports.deleteBookings= factory.deleteOne(Booking)