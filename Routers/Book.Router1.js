const express = require("express");
const routers = express.Router();

const BookController1 = require("../Controllers/Book.Controller1");
const uploadImg = require("../Middleware/uploadImg");

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
