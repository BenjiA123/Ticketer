const Ticket = require('../Models/ticketModel');
const catchAsync = require('../utils/catchAsync')


  exports.getOverview = catchAsync(async (req,res,next)=>{
    const tickets = await Ticket.find();
    res.status(200).render('overview',{
      title:"All Tickets",
      tickets
    })
  });

  exports.getTicketDetail = catchAsync(async(req,res,next)=>{
    const ticket = await Ticket.findOne({slug:req.params.slug})
    res.status(200).render('ticket',{
      ticket
    })
  })
