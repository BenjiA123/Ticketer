const cors = require('cors');
const express = require('express')
const compression = require("compression")
const path = require('path');
const rateLimit = require("express-rate-limit")
const AppError = require('./utils/appError');
const helmet = require('helmet')
const mongoSanitise = require('express-mongo-sanitize')
const xss = require('xss-clean')

const bookingController = require("./controllers/bookingController")

const app = express()


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Set security HTTP
app.use(helmet())
// A rate limiter prevents a user from making too many requests at a given time
// It prevents Brute force attacks
// I counts number of requests and blocks them

const limiter = rateLimit({
  max:100,
  windowMs:60*60*1000,
  message:"Too many requests from this IP try later (1hr)"
})

app.use('/api',limiter)

app.post("webhook-checkout",
express.raw(
  {
    type:"application/json"
  })
  ,bookingController.webhookCheckout)


app.use(express.json({ limit: '10kb' }));

// Data Sanitisation Cleans data from Malicious Code

// Against NoSQL query Injection
app.use(mongoSanitise())


// Against Cross Site Scripting attacks (XSS) Cleans malicious html code is cross side scripting
app.use(xss())




app.use(cors());

// Permits complex requests
app.options('*', cors());

// Use this to permit certain particular origins
// app.use(cors({
//   origin:''
// }))


app.use(compression())

app.use(express.static(path.join(__dirname, 'public')));

const viewRouter = require('./Routes/viewRoutes');







const ticketRouter = require('./Routes/ticketRoute')
const bookingRouter = require('./Routes/bookingRoute')


app.use('/', viewRouter);

// We do this so that the data coming will not be in json but in raw form
app.use('/api/v1/ticket',ticketRouter)
app.use('/api/v1/booking',bookingRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


module.exports = app