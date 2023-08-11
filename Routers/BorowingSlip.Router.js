const expess = require("express")
const router = expess.Router();

const borowingController = require("../Controllers/BorowingSlip.Controller")

router.post("/addBorowingSlip",borowingController.addBorowing);
router.put("/:id/updateBorrowing",borowingController.updateBorowing);
router.get("/api",borowingController.getapi);
router.get("/ListBorowing",borowingController.index);
module.exports = router;