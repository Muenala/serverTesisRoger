require('dotenv').config();
const express = require('express');
const { dbConnect } = require('./config/mongo')
const cors = require('cors');
var fs = require('fs');
var https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;
var fileupload = require("express-fileupload");

//confoiguracion
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(cors());
app.use(express.json());
app.use(fileupload());
//routes
app.use('/api/', require('./app/routes'))
app.use('/download', function(req, res){
  const file = `${__dirname}/tsafiapp.apk`;
  res.download(file); // Set disposition and send it.
});
/* Ruta para enviar pagina web */
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});
//Conexión base de datos
dbConnect();
//servidor certificado
https.createServer({
  cert: fs.readFileSync('mi_certificado.crt'),
  key: fs.readFileSync('mi_certificado.key')
},app).listen(PORT, function(){
 console.log('Servidor https correindo en el puerto 443');
});
