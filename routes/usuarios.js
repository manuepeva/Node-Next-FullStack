const express = require('express')
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
router.post('/api/usuarios',
    usuarioController.nuevoUsuario
)
module.exports = router;