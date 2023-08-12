const borowingModel = require("../Model/BorowingSlip.Model");
const Librarian = require("../Model/Librarian.Model");
const User = require("../Model/User.Model");
const Book = require("../Model/Books.Model");
<<<<<<< HEAD
const { mutipleMongoosetoObject } = require("../Util/mongoUtil");
//định dạng ngày tháng
const moment = require("moment");
const BooksModel = require("../Model/Books.Model");
=======
const { mutipleMongoosetoObject} = require("../Util/mongoUtil");
>>>>>>> vinh
class borowingController {
  async addBorowing(req, res) {
    const book = req.body.book;
    const librarian = req.body.librarian;
    const user = req.body.user;
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;
    const price = req.body.price;
    const bookQuantity = await Book.findById(book);
    let dayStart = new Date(dateStart.getTime());
    let dayEnd = new Date(dateEnd.getTime());
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
    } else if (!dayStart) {
      res.status(400).json({ massage: "Ngày mượn không đúng định dạng" });
    } else if (dayStart > today) {
      res
        .status(400)
        .json({ massage: "Ngày mượn không được lớn hơn ngày hôm nay" });
    } else if (!dayEnd ) {
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
<<<<<<< HEAD
        console.log("BOOK :" + newBook);
=======
>>>>>>> vinh
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
      res.render("listBrowing",{
        br : mutipleMongoosetoObject(br)
      });
    });
  }
  getapi(req, res, next) {
    borowingModel.find({}).then((borowing) => {
      res.json({
        borowing: mutipleMongoosetoObject(borowing),
      });
    });
  }

  // indexthongke(req, res, next) {
  //   const formattedDate = moment("08/23/2023", "MM/DD/YYYY").format(
  //     "DD/MM/YYYY"
  //   );
  //   console.log(formattedDate);
  //   res.render("thongke", {
  //     layout: "home",
  //   });
  // }

  async doanhthu(req, res, next) {
    const startDate = new Date(req.body.dayStart);
    const endDate = new Date(req.body.dayEnd);

    // const formattedStartDate = moment(startDate, "MM/DD/YYYY").format(
    //   "DD/MM/YYYY"
    // );
    // const formattedEndDate = moment(endDate, "MM/DD/YYYY").format("DD/MM/YYYY");
    //const startbirthDate = new Date("2023-07-20");
    //startbirthDate.setHours(0, 0, 0, 0);
    //const endbirthDate = new Date("2023-07-20");
    //endbirthDate.setHours(23, 59, 59, 999);
    //console.log(birthDate);

    const borowingSlip = await borowingModel.find({
      dateStart: {
        $gte: startDate, // Lớn hơn hoặc bằng ngày bắt đầu
        $lt: endDate, // Nhỏ hơn ngày kết thúc
      },
    });
    if (!borowingSlip) {
    }

    const arrBook = await BooksModel.find();
    let countBook = arrBook.length;
    //{ $gte: startDate, $lte: endDate }
    let doanhthu = 0;
    let count = borowingSlip.length;

    // lấy 7 ngày trước kể từ ngày hiện tại
    const listday = [];
    const listdoanhthu = [];
    const currentDate = moment();

    for (let i = 0; i < 7; i++) {
      const previousDate = moment().subtract(i + 1, "days");
      const day = previousDate.format("YYYY-MM-DD");
      listday.push(day);

      const startdate = new Date(day);
      startdate.setHours(0, 0, 0, 0);
      const enddate = new Date(day);
      endbirthDate.setHours(23, 59, 59, 999);

      const listborowingSlip = await borowingModel.find({
        dateStart: {
          $gte: startdate, // Lớn hơn hoặc bằng ngày bắt đầu
          $lt: enddate, // Nhỏ hơn ngày kết thúc
        },
      });
      let s = 0;
      listborowingSlip.forEach((obj) => {
        s += Number(obj.price);
      });
      listdoanhthu.push(s);
    }

    borowingSlip.forEach((obj) => {
      doanhthu += Number(obj.price);
    });
    console.log(listday);
    console.log(doanhthu);
    console.log(count);
    console.log(countBook);
    console.log(listdoanhthu);
    res.render("thongke", {
      layout: "home",
      doanhthu: doanhthu,
      count: count,
      countBook: countBook,
      listday1: listday,
      listdoanhthu: listdoanhthu,
    });
  }

  async doanhthungay(req, res, next) {
    console.log(req.body.date);
    const date = req.body.date;
    // const formattedStartDate = moment(startDate, "MM/DD/YYYY").format(
    //   "DD/MM/YYYY"
    // );
    // const formattedEndDate = moment(endDate, "MM/DD/YYYY").format("DD/MM/YYYY");
    const startbirthDate = new Date(date);
    startbirthDate.setHours(0, 0, 0, 0);
    const endbirthDate = new Date(date);
    endbirthDate.setHours(23, 59, 59, 999);
    //console.log(birthDate);

    const borowingSlip = await borowingModel.find({
      dateStart: {
        $gte: startbirthDate, // Lớn hơn hoặc bằng ngày bắt đầu
        $lt: endbirthDate, // Nhỏ hơn ngày kết thúc
      },
    });
    if (!borowingSlip) {
    }
    let daonhthu = 0;

    borowingSlip.forEach((obj) => {
      daonhthu += Number(obj.price);
    });
    console.log(daonhthu);
    res.send({ message: daonhthu });
  }

  async doanhthutoday(req, res, next) {
    const date = new Date();
    //console.log(data);
    const startbirthDate = new Date(date);
    startbirthDate.setHours(0, 0, 0, 0);
    const endbirthDate = new Date(date);
    endbirthDate.setHours(23, 59, 59, 999);
    //console.log(birthDate);

    const borowingSlip = await borowingModel.find({
      dateStart: {
        $gte: startbirthDate, // Lớn hơn hoặc bằng ngày bắt đầu
        $lt: endbirthDate, // Nhỏ hơn ngày kết thúc
      },
    });
    if (!borowingSlip) {
    }
    let daonhthu = 0;

    borowingSlip.forEach((obj) => {
      daonhthu += Number(obj.price);
    });
    console.log(daonhthu);

    const arrBook = await BooksModel.find();
    let countBook = arrBook.length;
    //{ $gte: startDate, $lte: endDate }
    let doanhthu = 0;
    let count = borowingSlip.length;

    // lấy 7 ngày trước kể từ ngày hiện tại
    const listday = [];
    const listdoanhthu = [];
    const currentDate = moment();

    for (let i = 0; i < 7; i++) {
      const previousDate = moment().subtract(i + 1, "days");
      const day = previousDate.format("YYYY-MM-DD");
      listday.push(day);

      const startdate = new Date(day);
      startdate.setHours(0, 0, 0, 0);
      const enddate = new Date(day);
      endbirthDate.setHours(23, 59, 59, 999);

      const listborowingSlip = await borowingModel.find({
        dateStart: {
          $gte: startdate, // Lớn hơn hoặc bằng ngày bắt đầu
          $lt: enddate, // Nhỏ hơn ngày kết thúc
        },
      });
      let s = 0;
      listborowingSlip.forEach((obj) => {
        s += Number(obj.price);
      });
      listdoanhthu.push(s);
    }

    borowingSlip.forEach((obj) => {
      doanhthu += Number(obj.price);
    });
    console.log(listday);
    console.log(doanhthu);
    console.log(count);
    console.log(countBook);
    console.log(listdoanhthu);
    res.render("thongke", {
      layout: "home",
      doanhthu: doanhthu,
      count: count,
      countBook: countBook,
      listday1: listday,
      listdoanhthu: listdoanhthu,
    });
  }
}

module.exports = new borowingController();
