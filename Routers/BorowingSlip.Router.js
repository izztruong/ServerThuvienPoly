const expess = require("express")
const router = expess.Router();

const borowingController = require("../Controllers/BorowingSlip.Controller")

router.post("/addBorowingSlip",borowingController.addBorowing);

module.exports = router;