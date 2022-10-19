const cartController = require("../controllers/cartController")

const express = require("express")
const router = express.Router()

router.post("/", VerifyToken, cartController.addItemToCart)
router.delete("/:id", VerifyToken, cartController.deleteCartById)
router.get("/", cartController.getAllCart)

module.exports = router