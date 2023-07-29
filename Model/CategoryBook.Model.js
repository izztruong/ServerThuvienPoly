const mongoose = require("mongoose");

const CategoryBook = new mongoose.Schema(
  {
    nameCategory: {
      type: String,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
      },
    ],
  },
  { timestamps: true }
);

const CategoryBookModel = mongoose.model("CategoryBooks", CategoryBook);
module.exports = CategoryBookModel;
