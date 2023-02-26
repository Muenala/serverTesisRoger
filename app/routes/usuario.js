const express = require('express')
const router = express.Router();
const { getUsuarios , getUsuario,
    getAudio, 
    audioTraduccir,textoTraduccir,
    getUsuariosAudio,getUsuariosVideo,getUsuariosImagen,
    createUsuario,loginUsuario,saveAudio,obtenerAudios,obtenerVideos,obtenerImagenes,saveVideo,saveImagen, guardar, getData,updateUsuario, deleteUsuario} = require('../controllers/usuario')

router.get('/', getUsuarios)
router.post('/audioTraduccir', audioTraduccir)
router.post('/textoTraduccir', textoTraduccir)
router.get('/audios', getUsuariosAudio)
router.get('/videos', getUsuariosVideo)
router.get('/imagenes', getUsuariosImagen)
router.get('/audio/:nombre_archivo', getAudio)
router.get('/:_id', getUsuario)
router.post('/register', createUsuario)
router.post('/login', loginUsuario)
router.post('/guardar', guardar)
router.post('/getData', getData)
router.patch('/', updateUsuario)
router.post('/audio', saveAudio)
router.post('/audios', obtenerAudios)
router.post('/videos', obtenerVideos)
router.post('/imagenes', obtenerImagenes)
router.post('/video', saveVideo)
router.post('/imagen', saveImagen)
router.delete('/:_id', deleteUsuario)


module.exports = router




