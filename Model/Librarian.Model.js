const mongoose = require("mongoose");

const Librarian = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dateWork: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    borowing: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BorowingSlip",
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Librarians", Librarian);
