require('dotenv').config();
const express = require('express');
const { dbConnect } = require('./config/mongo')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app);


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(cors());
app.use(express.json());

//routes
app.use('/api/', require('./app/routes'))

//connection mongodb
dbConnect();
http.listen(PORT, () => {
  console.log('nodejs app run ' + PORT)
})
