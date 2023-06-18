const mongoose = require('mongoose');
const { exit } = require('process');


const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB onnected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1)
    }
}

module.exports = connectDB