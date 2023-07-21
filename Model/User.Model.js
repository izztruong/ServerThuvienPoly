const mongoose = require('mongoose');

const User = new mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
    },
    address:{
        type: String
    },
    phone: {
        type: String,
    },
    email: {
        type: String
    }
}, { timestamps: true })

module.exports= new mongoose.model("User",User)