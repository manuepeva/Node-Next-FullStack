const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' })

exports.autenticarUsuario = async (req, res, next) => {

    // Revisar si existen errores
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // Buscar si el usuario esta autenticado
    const { email, password } = req.body
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        res.status(401).json({ msg: 'El usuario no existe' })
        return next();
    }
    // Verificar el password y autenticar al usuario
    if (bcrypt.compareSync(password, usuario.password)) {
        // Crear json web token
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '2h'
        })
        res.json({ token })

    } else {
        res.status(401).json({ msg: 'Contraseña Incorrecta' })
        return next()
    }


}

exports.usuarioAutenticado = async (req, res, next) => {
    res.json({ usuario: req.usuario })
}