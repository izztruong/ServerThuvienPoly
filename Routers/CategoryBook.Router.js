const express = require("express");
const routers = express.Router();
const CategoryBookController = require("../Controllers/CategoryBook.Controller");

routers.get("/listCategoryBook", CategoryBookController.listCateroryBook);
routers.get("/:idCategoryBook", CategoryBookController.getCategoryBookbyId);
routers.post("/addCategoryBook", CategoryBookController.addCategoryBook);
routers.put(
  "/updateCategoryBook/:idCategoryBook",
  CategoryBookController.updateCategoryBook
);
routers.delete(
  "/deleteCategoryBook/:idCategoryBook",
  CategoryBookController.deleteCategoryBook
);

module.exports = routers;
