const cartController = require("../controllers/cartController")

const express = require("express")
const router = express.Router()

router.post("/addcart", cartController.addItemToCart)
router.delete("/:id", cartController.deleteCartById)
router.get("/", cartController.getAllCart)

module.exports = router
