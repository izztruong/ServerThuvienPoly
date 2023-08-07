const categoryBookModel = require("../Model/CategoryBook.Model");
class CategoryBookController {
  async listCateroryBook(req, res, next) {
    const arrCategoryBook = await categoryBookModel.find();
    res.send(arrCategoryBook);
  }

  async addCategoryBook(req, res, next) {
    const categoryBook = req.body;
    if (categoryBook.nameCategory == "") {
      return res
        .status(404)
        .json({ message: "Các trường không được để trống" });
    }
    const check = await categoryBookModel.findOne({
      nameCategory: categoryBook.nameCategory,
    });
    if (check) {
      res.status(400).json({ message: "nameCategory đã tồn tại" });
    }
    const items = new categoryBookModel(categoryBook);
    try {
      console.log(items);
      await items.save();
      res.send(items);
    } catch (error) {
      console.log(error);
    }
  }

  async getCategoryBookbyId(req, res, next) {
    const categoryBook = await categoryBookModel.findById(
      req.params.idCategoryBook
    );
    if (!categoryBook) {
      return res.send(404).json({ message: "categoryBook not found" });
    }
    res.status(200).json(categoryBook);
  }

  async updateCategoryBook(req, res, next) {
    const categoryBook = req.params.idCategoryBook;
    if (categoryBook.nameCategory == "") {
      return res
        .status(404)
        .json({ message: "Các trường không được để trống" });
    }
    const updateCategoryBook = await categoryBookModel.findByIdAndUpdate(
      idCategoryBook,
      req.body
    );
    if (!updateCategoryBook) {
      return res.send(404).json({ message: "categoryBook not found" });
    }
    res.status(200).json(updateCategoryBook);
  }

  async deleteCategoryBook(req, res, next) {
    const idCategoryBook = req.params.idCategoryBook;
    const deleteCategoryBook = await categoryBookModel.findByIdAndDelete(
      idCategoryBook
    );
    if (!deleteCategoryBook) {
      return res.send(404).json({ message: "categoryBook not found" });
    }
    res.json("delete success");
  }
}
module.exports = new CategoryBookController();
