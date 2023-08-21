const express = require("express");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const handlebar = require("express-handlebars");
var methodOverride = require("method-override");
const Mongodb = require("./Mongodb/database");
const router = require("./Routers/index");
const PORT = process.env.PORT;
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine(
  ".hbs",
  handlebar.engine({
    extname: "hbs",
    defaultLayout: "home",
    layoutsDir: "views/layouts/",
    helpers: { sum: (a, b) => a + b },
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");
Mongodb.connect();
router(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
