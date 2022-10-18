const { Op } = require("sequelize")
const db = require("../models")

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const { _limit, _page, _sortDir = ASC} = req.query
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


  // getBooks: async (req, res) => {
  //   const page = parseInt(req.query.page) || 0
  //   const limit = parseInt(req.query.limit) || 0
  //   const search = req.query.search_query || ""
  //   const offset = limit * page

  //   const totalRows = await db.Book.count({
  //     where: {
  //       title: {
  //         [Op.like]: '%'+search+'%'
  //       }}
  //     })
    

  //   const totalPage = Math.ceil(totalRows / limit)

  //   const result = await db.Book.findAll({
  //     where:{
  //       [Op.or]: [{title: {
  //         [Op.like]: '%'+search+'%'
  //       }}]
  //     },
  //     offset: offset,
  //     limit: limit,
  //     order: [
  //       ['id', 'DESC']
  //     ]
  //   })

  //   res.status(200).json({
  //     result: result,
  //     page: page,
  //     limit: limit,
  //     totalRows: totalRows,
  //     totalPage: totalPage
  //   })

  // },

  // addBook: async (req, res) => {
  //   try{

  //     //publish_year, stock, image_url, synopsis, isbn, CategoyId

  //     const { title, author} = req.query

  //     const newBook = await db.Book.create({
  //       title, 
  //       author, 
  //     })

  //     return res.status(200).json({
  //       message: "book added",
  //       data: newBook
  //     })

  //   }catch (err) {
  //     console.log(err)
  //     return res.status(500).json({
  //       message: "Server error"
  //     })
  //   }
  // }
}
