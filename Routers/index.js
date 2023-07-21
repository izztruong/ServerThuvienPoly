const book = require('./Book.Router')
function routes(app) {
  app.use("/Book", book);
}
module.exports = routes;