const express = require('express')
const booksController = require('../controllers/booksController')

const router = express.Router()

router.get("/", booksController.getAllBooks)
router.get("/:id", booksController.getBookById)
router.post("/", booksController.addBook)
router.patch("/:id", booksController.updateBook)
router.delete("/:id", booksController.deleteBook)
//router.post("/", booksController.addBook)


module.exports = router
