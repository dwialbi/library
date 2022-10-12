const db = require("../models")

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const findAllBooks = await db.Book.findAll({
        attributes: ["title", "author", "publish_year", "image_url", "isbn"],
      })

      res.status(200).json({
        message: "Find all books",
        data: findAllBooks,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  getBooksbyId: async (req, res) => {
    try {
      const { id } = req.params
      const findBookbyId = await db.Book.findByPk(id)

      res.status(200).json({
        message: "Find book by ID",
        data: findBookbyId,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}
