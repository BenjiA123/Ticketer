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
        // Temporary solution
        // success_url:`${req.protocol}://${req.get("host")}/?ticket=${req.params.ticketID}&price=${ticket.price}`,
        success_url:`${req.protocol}://${req.get("host")}/`,
        cancel_url:`${req.protocol}://${req.get("host")}/ticket/${ticket.slug}`,
        customer_email:ticket.email,
        client_reference_id:req.params.ticketID,


        line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                    name:`${ticket.ticketname}'s Ticket`,
                    images: [`${req.protocol}://${req.get("host")}/img/tours/${ticket.image}`],
                },
                unit_amount: ticket.price,
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

// Temporary solution
// exports.createBookingCheckout = catchAsync(async(req,res,next)=>{


//     const {ticket,price} = req.query
//     if(!ticket || !price) return next()

//     await Booking.create({ticket,price})

//     res.redirect(req.originalUrl.split('?')[0])
// })

const createBookingCheckout = async session =>{
  const ticket = session.client_reference_id
  const price= session.line_items[0].price_data.unit_amount/100
  await Booking.create({ticket,price})
}

exports.webhookCheckout = (req,res,next)=>{
  const signature = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
     return res.status(400).send(`Webhook error: ${error.message}`)
  }

    if(event.type ==='checkout.session.completed'){
      createBookingCheckout(event.data.object);

    }

    res.status(200).json({recieved:true})


}


exports.getAllBookings = factory.getAll(Booking)

exports.createOneBooking= factory.createOne(Booking)

exports.updateOneBooking= factory.updateOne(Booking)

exports.deleteBookings= factory.deleteOne(Booking)