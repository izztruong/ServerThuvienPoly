const Admin = require("../Model/Admin.Model");
const bcrypt = require("bcrypt");
class AdminController {
  index(req, res) {
    res.render("login", { layout: "main" });
  }

  registerAdmin(req, res, next) {
    const email = req.body.email;
    const name = req.body.name;
    bcrypt.hash(req.body.password, 10, (err, handlePassword) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        Admin.findOne({ email: email }).then((data) => {
          if (data) {
            res.status(400).json({ message: "Email Đã Tồn Tại" });
          } else {
            return Admin.create({
              email: email,
              name: name,
              password: handlePassword,
            })
              .then((data) => {
                res.status(200).json(data);
              })
              .catch((err) => {
                res.status(500).json({ message: "Tạo admin thất bại" });
              });
          }
        });
      }
    });
  }
  loginAdmin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({ email: email })
      .then((data) => {
        if (!data) {
          res.status(400).json({ message: "Email không tồn tại" });
        } else {
          bcrypt.compare(password, data.password).then((match) => {
            if (match) {
              res
              .redirect("/Librarian/listLibrarian")
            } else {
              res
                .status(400)
                .json({ message: "Email hoặc password không đúng" });
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}
module.exports = new AdminController();
