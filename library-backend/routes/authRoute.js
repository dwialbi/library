const express = require("express")
const authController = require("../controller/authController")
const router = express.Router()

router.post("/register", authController.userRegist)
router.post("/login", authController.userLogin)
router.post("/refresh-token", authController.tokenRefresh)

module.exports = router
