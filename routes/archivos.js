const express = require('express')
const router = express.Router();
const archivosController = require('../controllers/archivosController');
const auth = require('../middleware/authMiddleware')


router.post('/',
    auth,
    archivosController.subirArchivo
)

module.exports = router