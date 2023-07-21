const bookModel = require("../Model/Books.Model");
class BookController {
  getListBook(req, res, next) {}

  async addBook(req, res, next) {
    const book = req.body;
    const items = new bookModel(book);
    try {
      console.log(items);
      await items.save();
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new BookController();
