require('dotenv').config();
const express = require('express');
const { dbConnect } = require('./config/mongo')
const cors = require('cors');
var fs = require('fs');
var https = require('https');
const app = express();
const PORT =  3000;


const http = require('http').Server(app);
var fileupload = require("express-fileupload");
app.use(fileupload());

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

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/download', function(req, res){
  const file = `${__dirname}/tsafiapp.apk`;
  res.download(file); // Set disposition and send it.
});

app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});
//connection mongodb
dbConnect();
http.listen(PORT, () => {
  console.log('nodejs app run ' + PORT)
})
/* https.createServer({
  cert: fs.readFileSync('mi_certificado.crt'),
  key: fs.readFileSync('mi_certificado.key')
},app).listen(PORT, function(){
 console.log('Servidor https correindo en el puerto 443');
});
 */