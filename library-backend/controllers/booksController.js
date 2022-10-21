const { Op } = require("sequelize")
const db = require("../models")

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const { _limit = 5, _page = 1, _sortDir = "DESC"} = req.query
      const findAllBooks = await db.Book.findAndCountAll({
        where: {
          title: {
            [Op.like]: `%${req.query.title || ""}%`
          }
        },
        include: [
          {model: db.Category}
        ], 
        limit: Number (_limit),     
        offset: (_page - 1) * _limit,
        order: [
          ['title', _sortDir]
        ]
      })

      res.status(200).json({
        message: "Find all books",
        data: findAllBooks.rows,
        dataCount: findAllBooks.count
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  getBookById: async (req, res) => {
    try {
      const findBookbyId = await db.Book.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {model: db.Category}
        ]
      })

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

  addBook: async (req, res) => {
    try {
      await db.Book.create(req.body)
      res.status(201).json({
        message: "Book added",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  updateBook: async (req, res) => {
    try {
      await db.Book.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({
        message: "Book updated",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  deleteBook: async (req, res) => {
    try {
      await db.Book.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({
        message: "Book deleted",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

}
