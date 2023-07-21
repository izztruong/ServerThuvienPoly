const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const handlebar = require("express-handlebars");
const Mongodb = require("./Mongodb/database");
const router = require("./Routers/index");
const PORT = 3000;
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.engine(
  ".hbs",
  handlebar.engine({
    extname: "hbs",
    defaultLayout: "home",
    layoutsDir: "views/layouts/",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");
Mongodb.connect();
router(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
