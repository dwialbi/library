const db = require("../models")
const Category = db.Category
const { Op } = require("sequelize")
const cartController = require("./cartController")

const categoryController = {
  createNewCategory: async (req, res) => {
    try {
      const findCategoryByName = await Category.findOne({
        where: {
          name: req.body.name || "",
        },
      })
      if (findCategoryByName) {
        return res.status(400).json({
          message: "The Category is exist",
        })
      } else {
        const createCategory = await db.Category.create({ ...req.body })

        return res.status(201).json({
          message: "Category created",
          data: createCategory,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const findAllCategory = await db.Category.findAll({
        where: {
          ...req.query,
          name: {
            [Op.like]: `%${req.query.name || ""}`,
          },
        },
      })

      return res.status(200).json({
        message: "Get All Category",
        data: findAllCategory,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  updateCategory: async (req, res) => {
    try {
      await db.Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      res.status(200).json({
        message: "Category updated",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const findCategoryById = await db.Category.findOne({
        where: {
          id: req.params.id,
        },
      })

      return res.status(200).json({
        message: "Get Category by ID",
        data: findCategoryById,
      })
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await db.Category.destroy({
        where: {
          id: req.params.id,
        },
      })
      res.status(200).json({
        message: "Category deleted",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

module.exports = categoryController
