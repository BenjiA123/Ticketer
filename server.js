const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path:'./config.env'})

const app  = require('./app')

console.log(process.env.PORT)

// "mongodb://localhost:27017/natours"

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
})
.then(() => {
  console.log('Connected to database ');
})
.catch((err) => {
  console.log(err);
});

const port = process.env.PORT
const server = app.listen(port,()=>{
    console.log("App Listening")
})