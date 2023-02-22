const express = require('express')
const router = express.Router();
const { getUsuarios , getUsuario, 
    createUsuario,loginUsuario,saveAudio,obtenerAudios,obtenerVideos,obtenerImagenes,saveVideo,saveImagen, guardar, getData,updateUsuario, deleteUsuario} = require('../controllers/usuario')

router.get('/', getUsuarios)

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
