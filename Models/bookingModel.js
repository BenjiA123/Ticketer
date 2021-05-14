const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  
    ticket:{
        type:mongoose.Schema.ObjectId,
        ref:"ticket",
        required:[true, "Booking must have a ticket"]
    },

    // The price may change in the future so this allows me to know wheater the price changed
    price:{
        type:Number,
        required:[true, "We need the price"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    paid:{
        type:Boolean,
        default:true
    }
})

bookingSchema.pre(/^find/,function(next){
    this.populate('ticket')
    next()
})

const Booking = mongoose.model('booking', bookingSchema);
module.exports = Booking;

