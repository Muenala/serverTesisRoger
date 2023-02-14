const mongoose = require('mongoose');
mongoose instanceof mongoose.Mongoose;
const usuarioSchema = new mongoose.Schema({
    nombre_usuario:{
        type: String,
        required: true
    },
    usuario_usuario:{
        type: String,
        required: true,
        unique:true
    },
    contrasenia_usuario:{
        type: String,
        required: true
    },
    correo_usuario:{
        type: String,
        required: true,
        unique:true
    },
    lenguaGrabacion:{
        type: String
    },
    lenguaMadre:{
        type: String
    }
    ,
    ciudad:{
        type: String
    }
    ,
    nota:{
        type: String
    },
    nombres:{
        type: String
    },
    edad:{
        type: String
    },
    genero:{
        type: String
    },
    audio:{
        type: String
    },
    video:{
        type: String
    },
    foto:{
        type: String
    },
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('usuario', usuarioSchema)