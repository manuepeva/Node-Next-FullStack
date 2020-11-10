const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' })

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (authHeader) {
        // Obtener el token 
        const token = authHeader.split(' ')[1]
        // Comprobar el json web token
        try {
            const usuario = jwt.verify(token, process.env.SECRETA)
            req.usuario = usuario
        } catch (error) {
            console.log(error)
            console.log('JSON web token no válido')
        }
    }
    return next()
}