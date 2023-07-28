const bookModel = require("../Model/Books.Model");

class BookController {
  async getBookbyId(req, res, next) {
    const book = await bookModel
      .findById(req.params.idBook)
      .populate("categoryBook");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  }

  async addBook(req, res, next) {
    const book = req.body;
    if (
      (book.nameBook =
        "" ||
        book.categoryBook == "" ||
        book.author == "" ||
        book.publishingCompany == "" ||
        book.publishingYear == "" ||
        book.language == "" ||
        book.quanity == "" ||
        book.price == "")
    ) {
      return res
        .status(500)
        .json({ message: "Các trường không được bỏ trống" });
    }
    const items = new bookModel(book);
    try {
      console.log(items);
      await items.save();
      res.send(items);
    } catch (error) {
      console.log(error);
    }
  }

  async listBook(req, res, next) {
    const arrBook = await bookModel.find().populate("categoryBooks");
    res.send(arrBook);
  }

  async deleteBook(req, res, next) {
    const idBook = req.params.idBook;
    const deleteBook = await bookModel.findByIdAndDelete(idBook);
    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json("delete success");
  }

  async updateBook(req, res, next) {
    const book = req.params.idBook;
    if (
      (book.nameBook =
        "" ||
        book.categoryBook == "" ||
        book.author == "" ||
        book.publishingCompany == "" ||
        book.publishingYear == "" ||
        book.language == "" ||
        book.quanity == "" ||
        book.price == "")
    ) {
      return res
        .status(500)
        .json({ message: "Các trường không được bỏ trống" });
    }
    const updateBook = await bookModel.findByIdAndUpdate(book, req.body);
    if (!updateBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(req.body);
  }

  // lọc theo thể loại
  async getBookFollowCategoryBook(req, res, next) {
    const categoryBook = req.params.categoryBook;
    const books = await bookModel.find({ categoryBook: categoryBook });
    if (!books) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(books);
  }
}
module.exports = new BookController();
