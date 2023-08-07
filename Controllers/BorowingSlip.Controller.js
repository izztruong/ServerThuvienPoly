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
    const bookQuantity = await Book.findById(book);
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
    } else if (bookQuantity.quanity <= 0) {
      res.status(400).json({ massage: "Số Lượng Sách Trong Kho Đã Hết" });
    } else {
      const borowing = new borowingModel(req.body);
      borowing.status = "0";
      bookQuantity.quanity -= 1;
      await bookQuantity.save();
      const save = await borowing.save();
      if (req.body.book) {
        const newBook = await Book.findById(req.body.book);
        await newBook.updateOne({ $push: { borowing: save._id } });
      }
      if (req.body.librarian) {
        const newlibrarianId = await Librarian.findById(req.body.librarian);
        console.log("Librarian" + newlibrarianId);
        await newlibrarianId.updateOne({ $push: { borowing: save._id } });
      }
      if (req.body.user) {
        const newUser = await User.findById(req.body.user);
        console.log("User" + newUser);
        await newUser.updateOne({ $push: { borowing: save._id } });
      }
      res.status(200).json({ massage: "Add thành công" });
    }
  }
  index(req, res) {
    borowingModel.find({}).then((br) => {
      res.render("");
    });
  }
  getapi(req, res, next) {
    borowingModel.find({}).then((borowing) => {
      res.json({
        borowing: mutipleMongoosetoObject(borowing),
      });
    });
  }
  async updateBorowing(req, res) {
    try {
      const id = req.params.id;
      const { newStatus } = req.body;
      //tìm kiếm phiếu mượn
      const borrowing = await borowingModel.findById(id);
      if (!borrowing) {
        res.status(404).json({ message: "Phiếu Mượn Không Tồn Tại" });
        return;
      }
      borowingModel.status = newStatus;
      const book = await Book.findById(borrowing.book);
      if (!book) {
        res
          .status(404)
          .json({ message: "Sách Này Không Còn Tồn Tại Trong Kho Nữa" });
        return;
      }
      book.quanity += 1;
      book.save();
      borrowing.save();
      res.status(200).json({ message: "Trả Sách Thành Công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server" });
      console.log(error);
    }
  }
  async totalPrice(req, res) {
    try {
      const { dateStart, dateEnd } = req.body;
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const startDateObj = new Date(dateStart);
    const endDateObj = new Date(dateEnd);
    // Tìm các phiếu mượn hoặc giao dịch trong khoảng thời gian
    if (dateStart == "" || dateEnd == "") {
      res.status(400).json({message: "Mời Bạn Chọn Ngày Cần Tính"});
      return;
    }
    const transactions = await borowingModel.find({
      createdAt: { $gte: startDateObj, $lte: endDateObj },
    });
    let total = 0;
    transactions.forEach((transactions) => {
      total += transactions.price;
    });
    res.status(200).json(total)
    } catch (error) {
      res.status(500).json({message : "Lỗi Server"})
      console.log(error)
    }
  }
}

module.exports = new borowingController();
