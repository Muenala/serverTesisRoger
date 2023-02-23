require('dotenv').config();
const express = require('express');
const { dbConnect } = require('./config/mongo')
const cors = require('cors');
var fs = require('fs');
var https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;


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

//connection mongodb
dbConnect();
/* http.listen(PORT, () => {
  console.log('nodejs app run ' + PORT)
}) */
https.createServer({
  cert: fs.readFileSync('mi_certificado.crt'),
  key: fs.readFileSync('mi_certificado.key')
},app).listen(PORT, function(){
 console.log('Servidor https correindo en el puerto 443');
});
app.get('/', function(req, res){
	res.send('Hola, estas en la pagina inicial');
	console.log('Se recibio una petición get a través de https');
}); 