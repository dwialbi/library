// get book information from frontend
// add book to cart (create row in table cart)
// send success response status
// delete item cart by book id

const db = require("../models")
const Cart = db.Cart
const { Op } = require("sequelize")

const cartController = {
  getAllCart: async (req, res) => {
    try {
      const { _limit = 5, _page = 1, _sortDir = "DESC" } = req.query

      const findAllCart = await db.Cart.findAll({
        include: [{ model: db.Book }],
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["createdAt", _sortDir]],
      })

      return res.status(200).json({
        message: "Get all item carts",
        data: findAllCart,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  addItemToCart: async (req, res) => {
    try {
      const { UserId, BookId } = req.body
      const findCartByUserOrBook = await Cart.findOne({
        where: {
          [Op.and]: {
            userId: UserId,
            bookId: BookId,
          },
        },
      })
      console.log(findCartByUserOrBook)

      if (findCartByUserOrBook) {
        return res.status(400).json({
          message: "User can only borrow one book with the same title",
        })
      } else {
        const newCart = await Cart.create({
          UserId,
          BookId,
        })
        return res.status(201).json({
          message: "succes add to cart item",
          data: newCart,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  deleteCartById: async (req, res) => {
    try {
      const { id } = req.params
      await db.Cart.destroy({
        where: {
          BookId: id,
        },
      })

      return res.status(200).json({
        message: "Deleted item cart",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

module.exports = cartController
