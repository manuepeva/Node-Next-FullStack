const express = require('express')
const connectDB = require('./config/db.js')
// Crear el servidor
const app = express();
// Conectar a la base de datos
connectDB();
// Puerto de la application
const port = process.env.PORT || 4400
// Habilitar leer los valores del body
app.use(express.json())
// Definiendo los endpoints del servidor
app.post('/api/usuarios', require('./routes/usuarios'))
// Inicializar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El Servidor esta funcionando en el puerto : ${port}`)
})
