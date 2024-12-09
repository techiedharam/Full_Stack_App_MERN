const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["reader", "author", "admin"],
        default: "reader"
    }

})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel