const book = require('./Book.Router')
const admin = require('./Admin.Router')
const user = require('./User.Router')
const librarian = require('./Librarian.Router')
function routes(app) {
  app.use("/Book", book);
  app.use("/Admin",admin)
  app.use("/User",user)
  app.use("/Librarian",librarian)
}
module.exports = routes;