const express = require("express");
const routers = express.Router();
const BookController = require("../Controllers/Book.Controller");
const uploadImg = require("../Middleware/uploadImg");

routers.post("/addBook", uploadImg.single("image"), BookController.addBook);
routers.put("/updateBook/:idBook", BookController.updateBook);
routers.delete("/deleteBook/:idBook", BookController.deleteBook);
routers.get("/listBook", BookController.listBook);
routers.get("/:idBook", BookController.getBookbyId);
routers.get(
  "/getBookFollowCategoryBook/:categoryBook",
  BookController.getBookFollowCategoryBook
);
routers.get("/top10Book", BookController.listBook10);
//routers.get("/listBook1", BookController.top10);

module.exports = routers;
