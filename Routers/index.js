const book = require("./Book.Router");
const admin = require("./Admin.Router");
const user = require("./User.Router");
const librarian = require("./Librarian.Router");
const CategoryBookrouter = require("./CategoryBook.Router");
const BorowingSlip = require("./BorowingSlip.Router");
const book1 = require("./Book.Router1");

function routes(app) {
<<<<<<< HEAD
  app.use("/Book1", book1);
  app.use("/", admin);
  app.use("/User", user);
  app.use("/Librarian", librarian);
=======
  app.use("/",admin)
  app.use("/Book", book);
  app.use("/User",user)
  app.use("/Librarian",librarian)
>>>>>>> vinh
  app.use("/categoryBook", CategoryBookrouter);
  app.use("/BorowingSlip", BorowingSlip);
  app.use("/Book", book);
}
module.exports = routes;
