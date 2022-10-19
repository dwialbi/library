const bookController = require("../controllers/bookController")
const express = require("express")
const router = express.Router()

router.post("/", bookController.createNewBook)

module.exports = router
