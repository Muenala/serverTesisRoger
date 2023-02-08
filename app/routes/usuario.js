const express = require('express')
const router = express.Router();
const { getUsuarios , getUsuario, createUsuario,loginUsuario, searchUsername, searchEmail,updateUsuario, deleteUsuario} = require('../controllers/usuario')

router.get('/', getUsuarios)

router.get('/:_id', getUsuario)

router.post('/register', createUsuario)
router.post('/login', loginUsuario)

router.post('/searchUsername', searchUsername)

router.post('/searchEmail', searchEmail)

router.patch('/', updateUsuario)


router.delete('/:_id', deleteUsuario)


module.exports = router
