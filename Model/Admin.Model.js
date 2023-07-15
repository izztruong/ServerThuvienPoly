const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true
    }
},{timestamps:true});

module.exports = new mongoose.model('Admins', Admin);