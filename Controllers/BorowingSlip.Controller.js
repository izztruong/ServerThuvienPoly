const borowingModel = require("../Model/BorowingSlip.Model");
const Librarian = require("../Model/Librarian.Model");
const User = require("../Model/User.Model");
const Book = require("../Model/Books.Model");
const { mutipleMongoosetoObject } = require("../Util/mongoUtil");
class borowingController {
  async addBorowing(req, res) {
    const book = req.body.book;
    const librarian = req.body.librarian;
    const user = req.body.user;
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;
    const price = req.body.price;

    let dayStart = new Date(dateStart);
    let dayEnd = new Date(dateEnd);
    let today = new Date();
    if (
      book == "" ||
      librarian == "" ||
      user == "" ||
      dateStart == "" ||
      dateEnd == "" ||
      price == ""
    ) {
      res
        .status(400)
        .json({ massage: "Các trường dữ liệu không được để trống" });
    } else if (!dayStart || isNaN(dayStart.getTime())) {
      res.status(400).json({ massage: "Ngày mượn không đúng định dạng" });
    } else if (dayStart > today) {
      res
        .status(400)
        .json({ massage: "Ngày mượn không được lớn hơn ngày hôm nay" });
    } else if (!dayEnd || isNaN(dayEnd.getTime())) {
      res.status(400).json({ massage: "Ngày trả không đúng định dạng" });
    } else if (dateEnd < today) {
      res
        .status(400)
        .json({ massage: "Ngày trả không được nhỏ hơn ngày hôm nay" });
    } else {
      const borowing = new borowingModel(req.body);
      borowing.status = "0";
      const save = await borowing.save();
      if (req.body.book) {
        const newBook = await Book.findById(req.body.book);
        console.log("BOOK :"+newBook);
        await newBook.updateOne({ $push: { borowing: save._id } });
      }
      if (req.body.librarian) {
        const newlibrarianId = await Librarian.findById(req.body.librarian);
        console.log("Librarian"+newlibrarianId);
        await newlibrarianId.updateOne({ $push: { borowing: save._id } });
      }
      if (req.body.user) {
        const newUser = await User.findById(req.body.user);
        console.log("User"+newUser);
        await newUser.updateOne({ $push: { borowing: save._id } });
      }
      res.status(200).json({ massage: "Add thành công" });
    }
  }
  getapi(req, res, next) {
    borowingModel.find({}).then((borowing) => {
      res.json({
        borowing: mutipleMongoosetoObject(borowing),
      });
    });
  }
}

module.exports = new borowingController();
