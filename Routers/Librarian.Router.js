const expess = require("express");
const router = expess.Router();

const librarianController = require("../Controllers/Labrarian.Controller");

router.post("/addLibrarian",librarianController.Addlibrarian);
router.post("/loginLibrarian",librarianController.LoginLibrarian);
router.put("/:id/changePassword",librarianController.changePassword)
router.get("/api",librarianController.getApi);

module.exports = router;   