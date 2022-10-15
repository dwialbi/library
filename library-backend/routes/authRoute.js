const express = require("express")
const authController = require("../controller/authController")
const { verifyToken } = require("../middlewares/authMiddleware")
const router = express.Router()

router.post("/register", authController.userRegist)
router.post("/login", authController.userLogin)
router.get("/refresh-token", verifyToken, authController.tokenRefresh)

module.exports = router
