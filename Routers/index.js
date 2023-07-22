const Bookrouter = require("./Book.Router");
const CategoryBookrouter = require("./CategoryBook.Router");
function routers(app) {
  app.use("/book", Bookrouter);
  app.use("/categoryBook", CategoryBookrouter);
}
module.exports = routers;
