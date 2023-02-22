const mongoose = require('mongoose');
mongoose instanceof mongoose.Mongoose;
const multimediaSchema = new mongoose.Schema({
    id_usuario:{
        type: String,
        required: true
    },
    nombre_archivo:{
        type: String,
        required: true
    },
    tipo_archivo:{
        type: String,
        required: true
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('multimedia', multimediaSchema)