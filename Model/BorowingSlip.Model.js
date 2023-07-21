const  mongoose  = require("mongoose");

const BorowingSlip = new mongoose.Schema({
    borowwingSlipId: {
        type: String,
        required: true
    },
    librarianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'librarian'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dateStart: {
        type: String,
    },
    dateEnd: {
        type: String,
    },
    dateActualEnd: {
        type: String
    },
    status: {
        type: String,
    },
    price: {
        type:Number
    }


},{timestamps:true})
    
module.exports = new mongoose.model("BorowingSlip", BorowingSlip);