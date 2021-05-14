const Ticket = require('../Models/ticketModel')
const factory = require('./handlerFactory')



exports.createTicket = factory.createOne(Ticket)

exports.getAllTickets= factory.getAll(Ticket)


exports.deleteTicket = factory.deleteOne(Ticket)


exports.deleteAllTickets = factory.deleteMany(Ticket)


exports.updateTicket = factory.updateOne(Ticket)