const express = require('express')
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator')

router.post('/',
    [
        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email válido').isEmail(),
        check('password', 'La contraseña debe tener al menos seis caracteres').isLength({ min: 6 })
    ],
    usuarioController.nuevoUsuario
)
module.exports = router;