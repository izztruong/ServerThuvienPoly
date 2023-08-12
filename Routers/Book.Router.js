const express = require("express");
const routers = express.Router();
const BookController = require("../Controllers/Book.Controller");
const uploadImg = require("../Middleware/uploadImg");

routers.post("/addBook", uploadImg.single("image"), BookController.addBook);
routers.post(
  "/updateBook/:idBook",
  uploadImg.single("image"),
  BookController.updateBook
);
routers.post("/deleteBook/:idBook", BookController.deleteBook);
routers.get("/listBook", BookController.getlist);
routers.get("/:idBook", BookController.getBookById);
routers.get(
  "/getBookFollowCategoryBook/:categoryBook",
  BookController.getBookFollowCategoryBook
);
routers.get("/listBook10", BookController.getlist10);

module.exports = routers;
