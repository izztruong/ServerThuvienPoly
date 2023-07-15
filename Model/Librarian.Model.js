const mongoose = require('mongoose');

const Librarian = new mongoose.Schema({
    name : {
        typeo : String,
        required : true,
    },
    sex:{
        typeo : String,
        required: true,
    },
    date: {
        typeo: String,
        required: true,
    },
    address: {
        typeo : String,
        required: true,
    },
    phone:{
        typeo : String,
        required : true,
    },
    email : {
        typeo : String,
        required :  true,
    },
    dateWork : {
        typeo : String,
        required :true,
    },
    password : {
        typeo : String,
        required: true,
    }
},{timestamps:true})

module.exports = new mongoose.model("Librarians",Librarian);