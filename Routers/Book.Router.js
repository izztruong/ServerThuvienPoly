const expess = require("express");
const router = expess.Router();
const uploadImg = require("../Middleware/uploadImg");

const book = require("../Controllers/BookController");

router.get("/indexbook", book.index);
router.get("/addbook", book.indexadd);
router.post("/addbook", uploadImg.single("image"), book.addBook);
router.post("/updatebook/:idBook", uploadImg.single("image"), book.updateBook);
router.post("/deletebook/:idBook", book.deleteBook);
router.get("/:idBook", book.getBookbyId);
module.exports = router;
