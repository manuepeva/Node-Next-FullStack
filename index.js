const express = require('express')
const connectDB = require('./config/db.js')
const cors = require('cors')
// Crear el servidor
const app = express();
// Conectar a la base de datos
connectDB();
// Habilitar cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(opcionesCors))
// Puerto de la application
const port = process.env.PORT || 4400
// Habilitar leer los valores del body
app.use(express.json())
// Habilitar carpeta pública
app.use(express.static('uploads'))

// Definiendo los endpoints del servidor
app.use('/api/usuarios', require('./routes/usuarios'))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/enlaces', require('./routes/enlaces'))
app.use('/api/archivos', require('./routes/archivos'))
// Inicializar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El Servidor esta funcionando en el puerto : ${port}`)
})
