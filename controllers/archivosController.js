const multer = require('multer')
const shortid = require('shortid')
const fs = require('fs')
const Enlaces = require('../models/enlace')

exports.subirArchivo = async (req, res, next) => {
    const configuracionMulter = {
        limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + `/../uploads/`)
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
                cb(null, `${shortid.generate()}${extension}`)
            }
        })
    }

    const upload = multer(configuracionMulter).single('archivo')

    upload(req, res, async (error) => {
        if (!error) {
            res.json({ archivo: req.file.filename })
        } else {
            console.log(error)
            return next()
        }
    })
}

exports.eliminarArchivo = async (req, res) => {
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`)
        console.log('archivo eliminado')
    } catch (error) {
        console.log(error)
    }
}

// Descarga un archivo
exports.descargar = async (req, res, next) => {
    // Obtiene el enlace
    const { archivo } = req.params
    console.log(archivo, 'new console')
    const enlace = await Enlaces.findOne({ nombre: archivo })
    const archivoDescarga = __dirname + '/../uploads/' + archivo;
    res.download(archivoDescarga)

    // Eliminar el archivo y la entrada en la base de datos
    // Si las descargas son iguales uno : borrar entrada y archivo
    const { descargas, nombre } = enlace;
    if (descargas === 1) {
        // Eliminar el archivo y la entrada de la base de datos
        req.archivo = nombre
        // Eliminar la entrada en la base de datos
        await Enlaces.findOneAndRemove(enlace.id)
        next()
    } else {
        // Si las descargas son mayores a uno : restar uno
        enlace.descargas--
        await enlace.save()
    }
}