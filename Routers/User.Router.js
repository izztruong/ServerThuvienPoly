const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User.Controller");
router.get("/listUser",userController.index);
router.get("/addUser",userController.indexAddUser);
router.get("/api", userController.getapi);
router.post("/addUserAPI", userController.addUserApi);
router.post("/addUser", userController.addUser);
router.put("/:id/editAPI", userController.editUserAPI);
router.delete("/:id/API", userController.deleteUserAPI);

module.exports = router;
