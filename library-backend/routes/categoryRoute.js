const categoryController = require("../controllers/categoryController")
const express = require("express")
const router = express.Router()

router.post("/", categoryController.createNewCategory)
router.get("/", categoryController.getAllCategory)
router.get("/:id", categoryController.getCategoryById)
router.patch("/:id", categoryController.updateCategory)
router.delete("/:id", categoryController.deleteCategory)

module.exports = router
