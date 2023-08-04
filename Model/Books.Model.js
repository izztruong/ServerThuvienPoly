const mongoose = require("mongoose");

const Book = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    nameBook: {
      type: String,
      required: true,
    },
    categoryBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryBooks",
    },
    author: {
      type: String,
      required: true,
    },
    publishingCompany: {
      type: String,
      required: true,
    },
    publishingYear: {
      type: String,
      required: true,
    },
    languages: {
      type: String,
      required: true,
    },
    quanity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    loanCount: {
      type: Number,
    },
  },
  { timestamps: true }
);
const bookModel = mongoose.model("Books", Book);
module.exports = bookModel;
