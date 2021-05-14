const mongoose = require('mongoose')
const slugify = require('slugify');

const ticketSchema = new mongoose.Schema({
    ticketname:{
        type:String,
        required:true,
        unique:true
    },
    college:{
        type: String,
        enum: ["COLENG", "COLNAS", "COLENV","COLMANS","COLTARS","COLTAMS"],
        required: true,
        default:"COLENG"
    },

    slug: String,

    image:{
        type:String,
    },
    description:{
        type:String,
        required:[true,'You need a description']
    },
    venue:{
        type: String,
        required:[true,'You need a venue']

    },
    date:{
        type:Date,
        default:Date.now(),
        required:[true,'You need a time']

    },
    // Check if a ticket has expired
    expired:{
        type:Boolean,
        default:false
    },

    price:{
        type:Number,

        required:true
    },
    artist:{
        type:String
    }
   
})

ticketSchema.pre('save', function (next) {
    this.slug = slugify(this.ticketname, { lower: true });
    next();
  });

ticketSchema.pre(/^find/, function (next) {
    // this.find({ expired: { $ne: true } });
    next();
  });

const Ticket = mongoose.model('ticket', ticketSchema);
module.exports = Ticket;

