const express = require("express");
const routers = express.Router();
const BookController = require("../Controllers/Book.Controller");
const uploadImg = require("../Middleware/uploadImg");
const BookController1 = require("../Controllers/Book.Controller1");

routers.post("/addBookAPI", uploadImg.single("image"), BookController.addBook);
routers.post(
  "/updateBookAPI/:idBook",
  uploadImg.single("image"),
  BookController.updateBook
);
routers.post("/deleteBookAPI/:idBook", BookController.deleteBook);
routers.get("/listBookAPI", BookController.getlist);
routers.get("/:idBook", BookController.getBookById);
routers.get(
  "/getBookFollowCategoryBookAPI/:categoryBook",
  BookController.getBookFollowCategoryBook
);
routers.get("/listBook10API", BookController.getlist10);

routers.get("/listbook", BookController1.listBook);
routers.get("/listbook10", BookController1.listBook10);
routers.post("/addBook", uploadImg.single("image"), BookController1.addBook);
routers.post(
  "/updateBook/:idBook",
  uploadImg.single("image"),
  BookController1.updateBook
);
routers.post("/deleteBook/:idBook", BookController1.deleteBook);
routers.get("/:idBook", BookController1.getBookbyId);
routers.get(
  "/getBookFollowCategoryBook",
  BookController1.getBookFollowCategoryBook
);
routers.get("/index", BookController1.index);
routers.post("/add", BookController1.add);
module.exports = routers;
