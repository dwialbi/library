const db = require("../models")
const Book = db.Book
const { Op } = require("sequelize")

const bookController = {
  createNewBook: async (req, res) => {
    try {
      const createBook = await db.Book.create({ ...req.body })

      return res.status(201).json({
        message: "Book created",
        data: createBook,
      })
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

module.exports = bookController
