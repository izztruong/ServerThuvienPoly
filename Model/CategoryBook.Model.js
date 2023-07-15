const mongoose = require("mongoose");

const CategoryBook = new mongoose.Schema(
  {
    nameCategory: {
      type: String,
      required: true,
    },
    Books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
      },
    ],
  },
  { timestamps: true }
);
module.exports = new mongoose.model("categoryBooks", CategoryBook);
