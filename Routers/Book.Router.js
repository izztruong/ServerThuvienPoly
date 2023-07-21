const express = require("express");
const routers = express.Router();
const BookController = require("../Controllers/Book.Controller");

routers.post("/addBook", BookController.addBook);

module.exports = routers;
