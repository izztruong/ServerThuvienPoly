const express = require("express");
const routers = express.Router();
const BookController = require("../Controllers/Book.Controller");

routers.post("/addBook", BookController.addBook);
routers.put("/updateBook/:idBook", BookController.updateBook);
routers.delete("/deleteBook/:idBook", BookController.deleteBook);
routers.get("/listBook", BookController.listBook);
routers.get("/:idBook", BookController.getBookbyId);
routers.get(
  "/getBookFollowCategoryBook",
  BookController.getBookFollowCategoryBook
);

module.exports = routers;
