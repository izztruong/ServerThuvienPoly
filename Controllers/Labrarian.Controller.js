const librarian = require("../Model/Librarian.Model");
const bcrypt = require("bcrypt");
const { mutipleMongoosetoObject } = require("../Util/mongoUtil");
const notifier = require('node-notifier');
class librarianController {
  index(req, res) {
<<<<<<< HEAD
    res.render("listLibrarian");
=======
    librarian.find({}).then((lb) => {
      res.render("listLibrarian", {
        lb: mutipleMongoosetoObject(lb),
      });
    });
>>>>>>> vinh
  }
  indexadd(req, res) {
    res.render("addLibrarian");
  }
  Addlibrarian(req,res){
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
      notifier.notify({
        message: 'Các Trường Không Được Để Trống'
      });
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      notifier.notify({
        message: 'Name sai định dạng'
      });
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email
      )
    ) {
      notifier.notify({
        message: 'Email sai định dạng'
      });
    } else if (!/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phone)) {
      notifier.notify({
        message: 'Phone sai định dạng'
      });
    } else if (!bithdayDate || isNaN(bithdayDate.getTime())) {
      notifier.notify({
        message: 'Bithday sai định dạng'
      });
    } else if (bithdayDate > today) {
      notifier.notify({
        message: 'Bithday không được lớn hơn ngày hôm nay'
      });
      
    } else if (!dateWorkday || isNaN(dateWorkday.getTime())) {
      notifier.notify({
        message: 'DateWord không hợp lệ'
      });
    } else if (dateWorkday > today) {
      notifier.notify({
        message: 'DateWork không được lớn hơn ngày hôm nay'
      });
    } else {
      librarian.findOne({ email: email }).then((data) => {
        if (data) {
          notifier.notify({
            message: 'Email đã tồn tại'
          });
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
  
  async changePasswordAPI(req, res) {
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
<<<<<<< HEAD
            console.log("ok");
=======
            const hashedNewPassword = await bcrypt.hash(newpassword, 10);
            await librarian.updateOne(
              { _id: req.params.id },
              { password: hashedNewPassword }
            );
            return res
              .status(200)
              .json({ message: "Cập nhật mật khẩu thành công" });
>>>>>>> vinh
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: err });
    }
  }
  deleteLibrarian(req, res, next) {
    librarian.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
  getApi(req, res) {
    librarian.find().then((librarian) => {
      res.json({
        librarian: mutipleMongoosetoObject(librarian),
      });
    });
  }
<<<<<<< HEAD
  getdanhsach(req, res) {
    librarian
      .find()
      .limit(2)
      .then((librarian) => {
        res.json({
          librarian: mutipleMongoosetoObject(librarian),
        });
      });
  }
=======
 
>>>>>>> vinh
}
module.exports = new librarianController();
