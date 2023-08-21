const bookmodel = require("../Model/Books.Model");
const cloudinary = require("cloudinary").v2;
const { mutipleMongoosetoObject } = require("../Util/mongoUtil");
const categoryModel = require("../Model/CategoryBook.Model");

class bookController {
  async index(req, res) {
    bookmodel
      .find({})
      .populate("categoryBook")
      .limit(10)
      .then((book) => {
        res.render("book", {
          arrBook: mutipleMongoosetoObject(book),
          layout: "home",
        });
      });
  }

  indexadd(req, res) {
    res.render("addBook");
  }

  addBook(req, res) {
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

    const items = new bookmodel(book);

    try {
      console.log(items);
      items.save();
      res.redirect("/book/indexbook");
    } catch (error) {
      console.log(error);
    }
  }

  async updateBook(req, res, next) {
    const bookid = req.params.idBook;
    const book = req.body;
    const img = req.file;
    cloudinary.uploader.destroy(book.image);
    if (!img == undefined) {
      book.image = img?.path;
    }
    const updateBook = await bookmodel.findOneAndUpdate(
      { _id: bookid },
      req.body
    );
    if (!updateBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    console.log("ok");
    res.redirect("/Book1/listBook");
  }
  async deleteBook(req, res, next) {
    const idBook = req.params.idBook;
    const deleteBook = await bookmodel.findByIdAndDelete(idBook);
    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.redirect("/book/indexbook");
  }

  async getBookbyId(req, res, next) {
    const book = await bookmodel
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
}

module.exports = new bookController();
