const bookModel = require("../Model/Books.Model");
const {
  mutipleMongoosetoObject,
  MongoosetoObject,
} = require("../Util/mongoUtil");

const cloudinary = require("cloudinary").v2;

class BookControllerAPI {
  async getlist(req, res) {
    await bookModel
      .find()
      .populate("categoryBook")
      .then((book) => {
        res.send({
          book: mutipleMongoosetoObject(book),
        });
      });
  }
  async getlist10(req, res) {
    bookModel
      .find()
      .limit(10)
      .then((book) => {
        res.json({
          book: mutipleMongoosetoObject(book),
        });
      });
  }
  async getBookById(req, res, next) {
    await bookModel
      .findById(req.params.idBook)
      .populate("categoryBook")
      .then((book) => {
        res.send({
          book: MongoosetoObject(book),
        });
      });
  }
  async addBook(req, res) {
    const book = req.body;
    const img = req.file;
    const publishingYear = req.body.publishingYear;
    let publishingYeardate = new Date(publishingYear);
    let today = new Date();
    console.log("publishingYear" + publishingYeardate);
    console.log("today" + today);

    if (
      (img == undefined && book.image == "") ||
      book.nameBook == "" ||
      book.categoryBook == "" ||
      book.author == "" ||
      book.publishingCompany == "" ||
      book.publishingYear == "" ||
      book.language == "" ||
      book.quanity == "" ||
      book.price == ""
    ) {
      if (img) {
        cloudinary.uploader.destroy(img.filename);
      }
      return res
        .status(500)
        .json({ message: "Các trường không được bỏ trống" });
    } else if (!publishingYeardate || isNaN(publishingYeardate.getTime())) {
      if (img) {
        cloudinary.uploader.destroy(img.filename);
      }
      return res.status(500).json({ message: "publishingYear không hợp lệ" });
    } else if (publishingYeardate > today) {
      if (img) {
        cloudinary.uploader.destroy(img.filename);
      }
      return res
        .status(500)
        .json({ message: "publishingYear không được lớn hơn ngày hôm nay" });
    } else {
      book.loanCount = 0;
      if (img !== undefined) {
        book.image = img?.path;
      }

      const items = new bookModel(book);

      try {
        console.log(items);
        await items.save().then((book) => {
          res.send({
            book: MongoosetoObject(book),
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async deleteBook(req, res, next) {
    const idBook = req.params.idBook;
    await bookModel
      .findByIdAndDelete(idBook)
      .then(() => {
        res.status(200).json({ message: "Book deleted successfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  async updateBook(req, res) {
    const bookid = req.params.idBook;
    const book = req.body;
    const img = req.file;
    cloudinary.uploader.destroy(book.image);
    if (img != undefined) {
      book.image = img?.path;
    }

    await bookModel
      .findOneAndUpdate({ _id: bookid }, book)
      .then(() => {
        res.status(200).json({ message: "Update thành công" });
      })
      .catch((err) => {
        cloudinary.uploader.destroy(img.filename);
        res.status(500).json({ error: err });
        console.log(err);
      });
  }
  async getBookFollowCategoryBook(req, res, next) {
    const categoryBook = req.params.categoryBook;
    await bookModel.find({ categoryBook: categoryBook }).then((book) => {
      res.send({
        book: mutipleMongoosetoObject(book),
      });
    });
  }
}
module.exports = new BookControllerAPI();
