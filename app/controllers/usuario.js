const usuarioModel = require("../models/usuario");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getUsuarios = async (req, res) => {

  try {
    const listAll = await usuarioModel.find({});
    res.send(listAll);
  } catch (e) {
    res.send("error");
  }
};

const searchUsername = async (req, res) => {
  try {
    const { usuario_usuario } = req.body;
    const usuario = await usuarioModel.findOne({ usuario_usuario });
    if (usuario.id != null) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (e) {
    res.send("error");
  }
};

const searchEmail = async (req, res) => {
  try {
    const { correo_usuario } = req.body;
    const usuario = await usuarioModel.findOne({ correo_usuario });
    if (usuario.id != null) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (e) {
    res.send("error");
  }
};


const getUsuario = async (req, res) => {
  try {
    const { _id } = req.body;
    const usuario = await usuarioModel.findOne({ _id });
    res.send({ data: usuario });
  } catch (e) {
    res.send("error");
  }
};



const createUsuario = async (req, res) => {
  try {
    const {
      nombre_usuario,
      usuario_usuario,
      contrasenia_usuario,
      correo_usuario,
    } = req.body;
   
    const salt = await bcrypt.genSaltSync(11);
    const hash = await bcrypt.hashSync(contrasenia_usuario, salt);
    const user = await usuarioModel.create({
      nombre_usuario,
      usuario_usuario,
      contrasenia_usuario: hash,
      correo_usuario,
    });

    const token = jwt.sign(
      { _id: user._id, nombre_usuario,usuario_usuario,correo_usuario },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.send( token);
  } catch (e) {
    console.log(e);
    res.send("error");
  }
};
const loginUsuario = async (req, res) => {
  try {
    const {
      usuario_usuario,
      contrasenia_usuario
    } = req.body;
    const usuario = await usuarioModel.findOne({ usuario_usuario });
    const isValid = await bcrypt.compare(contrasenia_usuario, usuario.contrasenia_usuario)
    let token = null;
   if(isValid){
     jwt.sign(
      { _id: usuario._id, nombre_usuario:usuario.nombre_usuario,usuario_usuario,correo_usuario:usuario.correo_usuario },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
   }
    res.send( token);
  } catch (e) {
    console.log(e);
    res.send("error");
  }
};





const updateUsuario = async (req, res) => {
  try {

    const {
      _id,
      nombre_usuario,
      usuario_usuario,
      contrasenia_usuario,
      correo_usuario,
      
    } = req.body;
    let resDetail

    if (contrasenia_usuario == null) {
      resDetail = await usuarioModel.findOneAndUpdate(
        { _id },
        { nombre_usuario, usuario_usuario, correo_usuario,  },
      );
    } else {
      const salt = await bcrypt.genSaltSync(11);
      const hash = await bcrypt.hashSync(contrasenia_usuario, salt);
      resDetail = await usuarioModel.findOneAndUpdate(
        { _id },
        { nombre_usuario, usuario_usuario, contrasenia_usuario: hash, correo_usuario,  }
      );

    }

    res.send({ data: resDetail });
  } catch (e) {
    res.send("error");
  }
};


const deleteUsuario = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const resDetail = await usuarioModel.findOneAndDelete({ _id });
    const listAll = await usuarioModel.find({});
    res.send({ data: listAll });
  } catch (e) {
    res.send("error");
  }
};

module.exports = { getUsuarios, getUsuario, searchEmail, searchUsername, createUsuario,loginUsuario, updateUsuario, deleteUsuario };
