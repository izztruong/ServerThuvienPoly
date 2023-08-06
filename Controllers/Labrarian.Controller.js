const librarian = require("../Model/Librarian.Model");
const bcrypt = require("bcrypt");
const { mutipleMongoosetoObject } = require("../Util/mongoUtil");
class librarianController {
  index(req,res) {
    librarian.find({}).then((lb) => {
      res.render("listLibrarian",{
        lb:mutipleMongoosetoObject(lb),
      })
    })
  }
  indexadd(req,res){
    res.render("addLibrarian")
  }
  Addlibrarian(req, res, next) {
    const name = req.body.name;
    const sex = req.body.sex;
    const birthday = req.body.birthday;
    const address = req.body.address;
    const email = req.body.email;
    const phone = req.body.phone;
    const dateWork = req.body.dateWork;
    const password = req.body.password;

    let bithdayDate = new Date(birthday);
    let dateWorkday = new Date(dateWork);
    let today = new Date();
    console.log("bithday: " + bithdayDate);
    console.log("today" + today);
    console.log("date work" + dateWorkday);
    if (
      name == "" ||
      sex == "" ||
      birthday == "" ||
      address == "" ||
      email == "" ||
      phone == "" ||
      dateWork == "" ||
      password == ""
    ) {
      res
        .status(500)
        .json({ message: "Các trường dữ liệu không được để trống" });
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      res.json({
        status: "FAILED",
        message: "Name sai định dạng",
      });
    } else if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email
      )
    ) {
      res.json({
        status: "FAILED",
        message: "Email không hợp lệ",
      });
    } else if (!/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phone)) {
      res.json({
        status: "FAILED",
        message: "Phone không hợp lệ",
      });
    } else if (!bithdayDate || isNaN(bithdayDate.getTime())) {
      res.json({
        status: "FAILED",
        message: "Bithday không hợp lệ",
      });
    } else if (bithdayDate > today) {
      res.json({
        status: "FAILED",
        message: "Bithday không được lớn hơn ngày hôm nay",
      });
    } else if (!dateWorkday || isNaN(dateWorkday.getTime())) {
      res.json({
        status: "FAILED",
        message: "DateWork không hợp lệ",
      });
    } else if (dateWorkday > today) {
      res.json({
        status: "FAILED",
        message: "DateWork không được lớn hơn ngày hôm nay",
      });
    } else {
      librarian.findOne({ email: email }).then((data) => {
        if (data) {
          res.status(400).json({ message: "Email đã tồn tại" });
        } else {
          bcrypt.hash(password, 10, (error, handlepass) => {
            if (error) {
              return res.status(500).json({ error: error });
            } else {
              return librarian
                .create({
                  name: name,
                  sex: sex,
                  birthday: birthday,
                  address: address,
                  phone: phone,
                  email: email,
                  dateWork: dateWork,
                  password: handlepass,
                })
                .then((data) => {
                  res.status(200).json(data);
                })
                .catch((err) => {
                  res.status(500).json({ error: err });
                  console.log(err);
                });
            }
          });
        }
      });
    }
  }
  LoginLibrarian(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    librarian
      .findOne({ email: email })
      .then((data) => {
        //  console.log(data);
        if (!data) {
          res.status(400).json({ message: "Email không hợp lệ" });
        } else {
          bcrypt.compare(password, data.password).then((match) => {
            console.log(match);
            if (match) {
              res.status(200).json({ message: "Login thành công" });
            } else {
              res
                .status(400)
                .json({ message: "Email hoặc password không chính sác" });
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
        console.log(err);
      });
  }

  UpdateLibrarian(req, res) {
    librarian
      .updateOne(
        {
          _id: req.params.id,
        },
        {
          name: req.body.name,
          sex: req.body.sex,
          birthday: req.body.birthday,
          address: req.body.address,
          phone: req.body.phone,
          email: req.body.email,
          dateWork: req.body.dateWork,
        }
      )
      .then(() => {
        res.status(200).json({ message: "update thành công" });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
        console.log(err);
      });
  }

  async changePassword(req, res) {
    const password = req.body.password;
    const newpassword = req.body.newpassword;
    const comfirm_password = req.body.comfirm_password;

    try {
      librarian.findOne({ _id: req.params.id }).then(async (data) => {
        console.log(data);
        if (!data) {
          res.status(400).json({ message: "Tài khoản không tồn tại" });
        } else {
          const ismatch = await bcrypt.compare(password, data.password);
          if (password == "" || newpassword == "" || comfirm_password == "") {
            res
              .status(400)
              .json({ message: "Các trường dữ liệu không được để trống" });
          } else if (!ismatch) {
            res.status(400).json({ message: "Password cũ không đúng" });
          } else if (newpassword != comfirm_password) {
            res.status(400).json({ message: "Password nhập lại không đúng" });
          } else {
            console.log("ok")
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: err });
    }
  }
  async deleteLibrarian(req, res, next) {
    const idLibrarian = req.params.idLibrarian;
    const deleteLibrarian = await librarian.findByIdAndDelete(idLibrarian);
    if (!deleteLibrarian) {
      return res.status(404).json({ message: "Librarian not found" });
    }
    res.json("delete success");
  }
  getApi(req, res) {
    librarian.find().then((librarian) => {
      res.json({
        librarian: mutipleMongoosetoObject(librarian),
      });
    });
  }
}
module.exports = new librarianController();
