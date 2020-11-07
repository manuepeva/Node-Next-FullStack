const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('DB connectada')
    } catch (error) {
        console.log(error, 'Hubo un error');
        process.exit(1);
    }
}

module.exports = connectDB;