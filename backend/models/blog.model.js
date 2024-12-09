const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    }

})

const blogModel = mongoose.model("Blog", blogSchema)

module.exports = blogModel