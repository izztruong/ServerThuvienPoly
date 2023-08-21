const express = require("express");
const router = express.Router();
const bookapi = require("../Controllers/Book.ControllerAPI");
const uploadImg = require("../Middleware/uploadImg");

router.get("/listbook", bookapi.getlist);
router.get("/listbook10", bookapi.getlist10);
router.post("/addbook", uploadImg.single("image"), bookapi.addBook);
router.post(
  "/updatebook/:idBook",
  uploadImg.single("image"),
  bookapi.updateBook
);
router.post("/deletebook/:idBook", bookapi.deleteBook);
router.get("/:idBook", bookapi.getBookById);
router.get(
  "/getbookfollowcategory/:categoryBook",
  bookapi.getBookFollowCategoryBook
);
module.exports = router;
