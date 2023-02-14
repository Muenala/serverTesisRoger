const express = require('express')
const router = express.Router();
const { getUsuarios , getUsuario, 
    createUsuario,loginUsuario,saveAudio, guardar, getData,updateUsuario, deleteUsuario} = require('../controllers/usuario')

router.get('/', getUsuarios)

router.get('/:_id', getUsuario)

router.post('/register', createUsuario)
router.post('/login', loginUsuario)

router.post('/guardar', guardar)

router.post('/getData', getData)

router.patch('/', updateUsuario)
router.post('/audio', saveAudio)


router.delete('/:_id', deleteUsuario)


module.exports = router
