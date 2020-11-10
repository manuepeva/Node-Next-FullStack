const Enlaces = require('../models/enlace')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.nuevoEnlace = async (req, res, next) => {
    // Revisar si existen errores
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }
    // Crear el objeto con la información
    const { nombre_original } = req.body
    const enlace = new Enlaces()
    enlace.url = shortid.generate()
    enlace.nombre = shortid.generate()
    enlace.nombre_original = nombre_original

    // En caso de que el usuario esté autenticado
    if (req.usuario) {
        const { password, descargas } = req.body
        // Asignar a enlace el número de descargas
        if (descargas) {
            enlace.descargas = descargas
        }
        // Asignar un password
        if (password) {
            const salt = await bcrypt.genSalt(10)
            enlace.password = await bcrypt.hash(password, salt)
        }
        // Asignar el autor 
        enlace.autor = req.usuario.id
    }
    // Almacenar en la Base de Datos
    try {
        await enlace.save()
        return res.json({ msg: `${enlace.url}` })
        next()
    } catch (error) {
        console.log(error)
    }
}
// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {
    // console.log(req.params.url)
    // Verificar si existe el enlace
    const enlace = await Enlaces.findOne({ url: req.params.url })
    if (!enlace) {
        res.status(404).json({ msg: 'El enlace no existe' })
        return next()
    }
    // Si el enlace existe
    res.json({ archivo: enlace.nombre })
    // Si las descargas son iguales uno : borrar entrada y archivo
    const { descargas, nombre } = enlace;
    if (descargas === 1) {
        // Eliminar el archivo y la entrada de la base de datos
        req.archivo = nombre
        // Eliminar la entrada en la base de datos
        await Enlaces.findOneAndRemove(req.params.url)
        next()
    } else {
        // Si las descargas son mayores a uno : restar uno
        enlace.descargas--
        await enlace.save()
    }

}