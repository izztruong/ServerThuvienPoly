const bookModel = require("../Model/Books.Model");
const cloudinary = require("cloudinary").v2;
const { mutipleMongoosetoObject } = require("../Util/mongoUtil");
const categoryModel = require("../Model/CategoryBook.Model");

class BookController1 {
  async index(req, res) {
    res.render("add", {
      layout: "home",
      title: "Thêm mới",
    });
  }

  async add(req, res) {
    const category = await categoryModel.find().then((data) => {
      res.render("addBook", {
        layout: "home",
        categoryBook: mutipleMongoosetoObject(data),
        title: "Thêm sách",
      });
    });
  }

  async getBookbyId(req, res, next) {
    const book = await bookModel
      .findById(req.params.idBook)
      .populate("categoryBook");
    const category = await categoryModel.find();

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.render("updateBook", {
      layout: "home",
      book: book.toJSON(),
      categoryBook: category.map((categoryBook) => categoryBook.toObject()),
      title: "Update Book",
    });
  }

  async addBook(req, res, next) {
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
    }
    book.loanCount = 0;
    if (img !== undefined) {
      book.image = img?.path;
    }

    const items = new bookModel(book);

    try {
      console.log(items);
      await items.save();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBook(req, res, next) {
    const idBook = req.params.idBook;
    const deleteBook = await bookModel.findByIdAndDelete(idBook);
    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.redirect("/Book1/listBook");
  }

  async updateBook(req, res, next) {
    const bookid = req.params.idBook;
    const book = req.body;
    const img = req.file;
    cloudinary.uploader.destroy(book.image);
    if (!img == undefined) {
      book.image = img?.path;
    }
    const updateBook = await bookModel.findOneAndUpdate(
      { _id: bookid },
      req.body
    );
    if (!updateBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    console.log("ok");
    res.redirect("/Book1/listBook");
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

  async listBook(req, res, next) {
    const arrBook = await bookModel.find().populate("categoryBook");
    const data = {
      arrBook: arrBook.map((book) => book.toObject()),
      title: "Danh sách sách",
    };

    res.render("book", { data });
  }

  async listBook10(req, res, next) {
    bookModel
      .find()
      .limit(13)
      .then((book) => {
        res.render("book", {
          arrBook: mutipleMongoosetoObject(book),
        });
      });
  }
}
module.exports = new BookController1();
