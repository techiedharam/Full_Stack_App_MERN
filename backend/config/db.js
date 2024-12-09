const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected Successfully !");

    } catch (error) {
        console.log("Some error occur while connecting to DB");
    }
}

module.exports = connectDB