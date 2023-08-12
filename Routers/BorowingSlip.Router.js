const expess = require("express");
const router = expess.Router();

const borowingController = require("../Controllers/BorowingSlip.Controller");

<<<<<<< HEAD
router.post("/addBorowingSlip", borowingController.addBorowing);
router.get("/api", borowingController.getapi);
router.get("/doanhthu", borowingController.doanhthu);
router.get("/doanhthungay", borowingController.doanhthungay);
router.get("/indexthongke", borowingController.doanhthutoday);
module.exports = router;
=======
router.post("/addBorowingSlip",borowingController.addBorowing);
router.put("/:id/updateBorrowing",borowingController.updateBorowing);
router.get("/api",borowingController.getapi);
router.get("/ListBorowing",borowingController.index);
module.exports = router;
>>>>>>> vinh
