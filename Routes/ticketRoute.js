const express = require('express')
const ticketRouter = express.Router()


const ticketController = require('../controllers/ticketController')

ticketRouter.route('/').get(ticketController.getAllTickets)
.post((ticketController.createTicket)).delete(ticketController.deleteAllTickets)


ticketRouter.route("/:id").patch(ticketController.updateTicket).delete(ticketController.deleteTicket)

module.exports = ticketRouter