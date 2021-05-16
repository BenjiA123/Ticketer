const cors = require('cors');
const express = require('express')
const compression = require("compression")
const path = require('path');
const AppError = require('./utils/appError');

const app = express()


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(compression())

app.use(express.static(path.join(__dirname, 'public')));

const viewRouter = require('./Routes/viewRoutes');


app.use(express.json({ limit: '10kb' }));
app.use(cors());

// Permits complex requests
app.options('*', cors());

// Use this to permit certain particular origins
// app.use(cors({
//   origin:''
// }))


const ticketRouter = require('./Routes/ticketRoute')
const bookingRouter = require('./Routes/bookingRoute')


app.use('/', viewRouter);

app.use('/api/v1/ticket',(ticketRouter))
app.use('/api/v1/booking',bookingRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


module.exports = app