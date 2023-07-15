const mongoose = require("mongoose");

const Book = new mongoose.Schema(
  {
    nameBook: {
      type: String,
      required: true,
    },
    categoryBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryBook",
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
  },
  { timestamps: true }
);

module.exports = new mongoose.Model("Books", Book);
