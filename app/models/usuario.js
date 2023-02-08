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
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('usuario', usuarioSchema)