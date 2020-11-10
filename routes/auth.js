const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator')
const auth = require('../middleware/authMiddleware')

router.post('/',
    [
        check('email', 'Agrega un Email válido').isEmail(),
        check('password', 'La Contraseña no puede estar vacía').not().isEmpty()
    ],
    authController.autenticarUsuario
);

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;