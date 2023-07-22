const express = require('express');
const routers = express.Router();
const adminController = require("../Controllers/Admin.Controller");
routers.post("/register", adminController.registerAdmin)
routers.post("/login",adminController.loginAdmin)
module.exports = routers;
