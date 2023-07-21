const Bookrouter = require("./Book.Router");
function routers(app) {
  app.use("/books", Bookrouter);
}
module.exports = routers();
