const user = require("../Model/User.Model");
const { mutipleMongoosetoObject } = require("../Util/mongoUtil");
class userController {
  addUser(req, res, next) {
    const name = req.body.name;
    const sex = req.body.sex;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    if (
      name == "" ||
      sex == "" ||
      address == "" ||
      phone == "" ||
      email == ""
    ) {
      res.status(400).json({ message: "Các trường không được để trống" });
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
        message: "Email sai định dạng",
      });
    } else if (!/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phone)) {
      res.json({
        status: "FAILED",
        message: "Phone sai định dạng",
      });
    } else {
      user
        .findOne({ email: email })
        .then((data) => {
          if (data) {
            res.status(400).json({ message: "Email đã tồn tại" });
          } else {
            return user.create({
              name: name,
              sex: sex,
              address: address,
              email: email,
              phone: phone,
            });
          }
        })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
          console.log(err);
        });
    }
  }
  editUser(req, res, next) {
    user
      .updateOne(
        {
          _id: req.params.id,
        },
        {
          name: req.body.name,
          sex: req.body.sex,
          address: req.body.address,
          email: req.body.email,
          phone: req.body.phone,
        }
      )
      .then((data) => {
        res.status(200).json({ message: "Update thành công" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
        console.log(err);
      });
  }
  deleteUser(req, res) {
    user
      .deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: "Delete thành công" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
  getapi(req, res, next) {
    user.find({}).then((User) => {
      res.json({
        user: mutipleMongoosetoObject(User),
      });
    });
  }
}
module.exports = new userController();
