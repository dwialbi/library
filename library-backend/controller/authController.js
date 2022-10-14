const { Op } = require("sequelize")
const db = require("../models")
const User = db.User

const authController = {
  userRegist: async (req, res) => {
    // Check nim,username,email must unique
    // regist
    try {
      const { NIM, username, email, password } = req.body
      const findUserByNIMOrUsernameOrEmail = await User.findOne({
        where: {
          [Op.or]: {
            NIM,
            username,
            email,
          },
        },
      })

      if (findUserByNIMOrUsernameOrEmail) {
        return res.status(400).json({
          message: "NIM, Username or email has been used",
        })
      }

      // if doesnt use create
      const newUser = await User.create({
        NIM,
        username,
        email,
        password,
      })

      return res.status(201).json({
        message: "User Registered",
        data: newUser,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server Error !",
      })
    }
  },
  userLogin: async (req, res) => {},
  tokenRenew: async (req, res) => {},
}

module.exports = authController
