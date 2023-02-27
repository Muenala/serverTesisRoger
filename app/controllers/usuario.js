const usuarioModel = require("../models/usuario");
const multimediaModel = require("../models/multimedia");
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

const audioTraduccir = async (req, res, next) => {
  try {
    const {
      audio
    } = req.files;
    const {
      _id
    } = req.body;
    console.log("date");
    let date = new Date();
    console.log(date);
    audio.mv('./uploads/' + (date.getTime())  + ".webm");
    const multimedia = await multimediaModel.create({
      id_usuario: _id,
      nombre_archivo: (date.getTime()) + ".webm",
      tipo_archivo: "audioTraducido",
    });

    multimedia.save();
    const multimediaAll = await multimediaModel.find({});
    console.log(multimediaAll);
    if (multimedia._id != null) {
      res.send(true);
    } else {
      res.send(false);
    }

  } catch (e) {
    res.send("error");
  }
};
const textoTraduccir = async (req, res, next) => {
  try {

    const {
      _id,texto
    } = req.body;
    console.log(req.body);
    const usuario = await usuarioModel.findOne({
      _id
    });
    usuario.traduccionTexto = texto;
    usuario.save();
    if (usuario._id != null) {
      res.send(true);
    } else {
      res.send(false);
    }

  } catch (e) {
    res.send("error");
  }
};

const getAudio = async (req, res) => {
  try {
    const {
      nombre_archivo
    } = req.params;
    res.sendfile(`uploads/${nombre_archivo}`);
  } catch (e) {
    res.send("error");
  }
};

const getUsuariosAudio = async (req, res) => {
  try {
    let listAll = await usuarioModel.find({});
    let newList = []
    var bar = new Promise((resolve, reject) => {
      listAll.forEach(async (usuario, index, array) => {
        let user = {};
        user.usuario = usuario;
        let multimediaAll = await multimediaModel.find({
          id_usuario: usuario._id,
          tipo_archivo: "audio"
        });
        let multimediaAllTraducida = await multimediaModel.find({
          id_usuario: usuario._id,
          tipo_archivo: "audioTraducido"
        });
        if (multimediaAll !== []) {
          let newA = []
          multimediaAll.forEach(function (part, index) {
            let mu = {};
            mu.url = "https://34.205.54.79/api/usuario/audio/" + part.nombre_archivo
            mu.title = part.nombre_archivo,
              mu.cover = "https://img.goraymi.com/2020/03/26/cf998b98ec9a0a81c9c5b78942c3bb70_xl.jpg"
            newA.push(mu)
          }, multimediaAll);
          user.multimediaAll = newA
          newList.push(user)
        }
        if (multimediaAllTraducida !== []) {
          let newA = []
          multimediaAllTraducida.forEach(function (part, index) {
            let mu = {};
            mu.url = "https://34.205.54.79/api/usuario/audio/" + part.nombre_archivo
            mu.title = part.nombre_archivo,
              mu.cover = "https://img.goraymi.com/2020/03/26/cf998b98ec9a0a81c9c5b78942c3bb70_xl.jpg"
            newA.push(mu)
          }, multimediaAllTraducida);
          user.multimediaAllTraducida = newA
        }
        if (index === array.length - 1) setTimeout(() => {
          resolve();
        }, 1000);
      });
    });
    bar.then(() => {
      res.send(newList);
    });
  } catch (e) {
    res.send("error");
  }
};




const getUsuariosVideo = async (req, res) => {

  try {
    let listAll = await usuarioModel.find({});
    let newList = []
    var bar = new Promise((resolve, reject) => {
      listAll.forEach(async (usuario, index, array) => {
        let user = {};
        user.usuario = usuario;
        user.multimediaAll = await multimediaModel.find({
          id_usuario: usuario._id,
          tipo_archivo: "video"
        });

        if (user.multimediaAll !== []) {

          console.log(user);
          newList.push(user)
        }

        if (index === array.length - 1) setTimeout(() => {
          resolve();
        }, 1000);
      });
    });

    bar.then(() => {

      res.send(newList);
    });


  } catch (e) {
    res.send("error");
  }
};
const getUsuariosImagen = async (req, res) => {

  try {
    let listAll = await usuarioModel.find({});
    let newList = []



    var bar = new Promise((resolve, reject) => {
      listAll.forEach(async (usuario, index, array) => {
        let user = {};
        user.usuario = usuario;
        user.multimediaAll = await multimediaModel.find({
          id_usuario: usuario._id,
          tipo_archivo: "imagen"
        });

        if (user.multimediaAll !== []) {


          console.log(user);
          newList.push(user)
        }

        if (index === array.length - 1) setTimeout(() => {
          resolve();
        }, 1000);
      });
    });

    bar.then(() => {

      res.send(newList);
    });


  } catch (e) {
    res.send("error");
  }
};

const guardar = async (req, res) => {
  try {
    const {
      lenguaGrabacion,
      lenguaMadre,
      ciudad,
      nota,
      nombres,
      edad,
      genero
    } = req.body;
    let token = req.header('authorization');
    token = token.split(' ')[1];
    const decodedToken = jwt.decode(token, {
      complete: true
    });
    token = decodedToken.payload;
    const usuario = await usuarioModel.findOne({
      _id: token._id
    });
    usuario.lenguaGrabacion = lenguaGrabacion;
    usuario.lenguaMadre = lenguaMadre;
    usuario.ciudad = ciudad;
    usuario.nota = nota;
    usuario.nombres = nombres;
    usuario.edad = edad;
    usuario.genero = genero;
    usuario.save();
    if (usuario._id != null) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (e) {
    res.send("error");
  }
};

const getData = async (req, res) => {
  try {


    let token = req.header('authorization');
    token = token.split(' ')[1];
    const decodedToken = jwt.decode(token, {
      complete: true
    });
    token = decodedToken.payload;

    const usuario = await usuarioModel.findOne({
      _id: token._id
    });
    if (usuario._id != null) {
      res.send(usuario);
    } else {
      res.send(null);
    }
  } catch (e) {
    res.send("error");
  }
};


const getUsuario = async (req, res) => {
  try {
    const {
      _id
    } = req.body;
    const usuario = await usuarioModel.findOne({
      _id
    });
    res.send({
      data: usuario
    });
  } catch (e) {
    res.send("error");
  }
};

const saveAudio = async (req, res, next) => {
  try {
    const {
      audio
    } = req.files;
    audio.mv('./uploads/' + audio.name);
    let token = req.header('authorization');
    token = token.split(' ')[1];
    const decodedToken = jwt.decode(token, {
      complete: true
    });
    token = decodedToken.payload;

    const usuario = await usuarioModel.findOne({
      _id: token._id
    });
    const multimedia = await multimediaModel.create({
      id_usuario: token._id,
      nombre_archivo: audio.name,
      tipo_archivo: "audio",
    });

    multimedia.save();
    const multimediaAll = await multimediaModel.find({});
    console.log(multimediaAll);
    if (multimedia._id != null) {
      res.send(true);
    } else {
      res.send(false);
    }

  } catch (e) {
    res.send("error");
  }
};
const obtenerAudios = async (req, res, next) => {
  try {
    console.log("token");
    let token = req.header('authorization');
    console.log(token);
    token = token.split(' ')[1];
    const decodedToken = jwt.decode(token, {
      complete: true
    });
    token = decodedToken.payload;
    console.log(token);
    const multimediaAll = await multimediaModel.find({
      id_usuario: token._id,
      tipo_archivo: "audio"
    });
    console.log(multimediaAll);
    res.send({
      multimediaAll
    });

  } catch (e) {
    res.send("error");
  }
};
const obtenerVideos = async (req, res, next) => {
  try {

    let token = req.header('authorization');
    token = token.split(' ')[1];
    const decodedToken = jwt.decode(token, {
      complete: true
    });
    token = decodedToken.payload;

    const multimediaAll = await multimediaModel.find({
      id_usuario: token._id,
      tipo_archivo: "video"
    });

    res.send({
      multimediaAll
    });

  } catch (e) {
    res.send("error");
  }
};
const obtenerImagenes = async (req, res, next) => {
  try {

    let token = req.header('authorization');
    token = token.split(' ')[1];
    const decodedToken = jwt.decode(token, {
      complete: true
    });
    token = decodedToken.payload;

    const multimediaAll = await multimediaModel.find({
      id_usuario: token._id,
      tipo_archivo: "imagen"
    });

    res.send({
      multimediaAll
    });

  } catch (e) {
    res.send("error");
  }
};
const saveVideo = async (req, res, next) => {
  try {
    const {
      video
    } = req.files;

    video.mv('./uploads/' + video.name);
    let token = req.header('authorization');
    token = token.split(' ')[1];
    const decodedToken = jwt.decode(token, {
      complete: true
    });
    token = decodedToken.payload;

    const usuario = await usuarioModel.findOne({
      _id: token._id
    });
    const multimedia = await multimediaModel.create({
      id_usuario: token._id,
      nombre_archivo: video.name,
      tipo_archivo: "video",
    });

    multimedia.save();
    const multimediaAll = await multimediaModel.find({});
    console.log(multimediaAll);
    if (multimedia._id != null) {
      res.send(true);
    } else {
      res.send(false);
    }

  } catch (e) {
    res.send("error");
  }
};
const saveImagen = async (req, res, next) => {
  try {
    const {
      imagen
    } = req.files;
    console.log(imagen);
    imagen.mv('./uploads/' + imagen.name);
    let token = req.header('authorization');
    token = token.split(' ')[1];
    const decodedToken = jwt.decode(token, {
      complete: true
    });
    token = decodedToken.payload;

    const usuario = await usuarioModel.findOne({
      _id: token._id
    });
    const multimedia = await multimediaModel.create({
      id_usuario: token._id,
      nombre_archivo: imagen.name,
      tipo_archivo: "imagen",
    });

    multimedia.save();
    const multimediaAll = await multimediaModel.find({});
    console.log(multimediaAll);
    if (multimedia._id != null) {
      res.send(true);
    } else {
      res.send(false);
    }

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

    const token = jwt.sign({
        _id: user._id,
        nombre_usuario,
        usuario_usuario,
        correo_usuario
      },
      process.env.TOKEN_KEY, {
        expiresIn: "2h",
      }
    );
    res.send(token);
  } catch (e) {
    res.send("error");
  }
};

const loginUsuario = async (req, res) => {
  try {
    const {
      usuario_usuario,
      contrasenia_usuario
    } = req.body;


    const usuario = await usuarioModel.findOne({
      usuario_usuario
    });

    const isValid = await bcrypt.compare(contrasenia_usuario, usuario.contrasenia_usuario)
    let token = null;

    if (isValid) {
      token = jwt.sign({
          _id: usuario._id,
          nombre_usuario: usuario.nombre_usuario,
          usuario_usuario,
          correo_usuario: usuario.correo_usuario
        },
        process.env.TOKEN_KEY, {
          expiresIn: "2h",
        }
      );
    }
    console.log(token);
    res.send(token);
  } catch (e) {
    res.status(400).end();
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
      resDetail = await usuarioModel.findOneAndUpdate({
        _id
      }, {
        nombre_usuario,
        usuario_usuario,
        correo_usuario,
      }, );
    } else {
      const salt = await bcrypt.genSaltSync(11);
      const hash = await bcrypt.hashSync(contrasenia_usuario, salt);
      resDetail = await usuarioModel.findOneAndUpdate({
        _id
      }, {
        nombre_usuario,
        usuario_usuario,
        contrasenia_usuario: hash,
        correo_usuario,
      });
    }
    res.send({
      data: resDetail
    });
  } catch (e) {
    res.send("error");
  }
};


const deleteUsuario = async (req, res, next) => {
  try {
    const {
      _id
    } = req.params;
    const resDetail = await usuarioModel.findOneAndDelete({
      _id
    });
    const listAll = await usuarioModel.find({});
    res.send({
      data: listAll
    });
  } catch (e) {
    res.send("error");
  }
};


module.exports = {
  getUsuarios,
  getUsuario,
  getData,
  saveAudio,
  audioTraduccir,
  textoTraduccir,
  obtenerAudios,
  getAudio,
  getUsuariosAudio,
  getUsuariosVideo,
  getUsuariosImagen,
  obtenerVideos,
  obtenerImagenes,
  saveVideo,
  saveImagen,
  guardar,
  createUsuario,
  loginUsuario,
  updateUsuario,
  deleteUsuario
};