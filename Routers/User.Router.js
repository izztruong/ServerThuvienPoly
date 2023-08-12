const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User.Controller");
router.get("/listUser",userController.index)
router.post("/addUser", userController.addUser);
router.put("/:id/edit", userController.editUser);
router.get("/api", userController.getapi);
router.delete("/:id", userController.deleteUser);
module.exports = router;
