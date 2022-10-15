const { Op } = require("sequelize")
const db = require("../models")
const bcrypt = require("bcrypt")
const { signToken } = require("../lib/jwt")
const User = db.User

const authController = {
  userRegist: async (req, res) => {
    try {
      // nim,username,email must unique
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
          message: "Credentials has been used",
        })
      }

      // hash password
      const hashPassword = bcrypt.hashSync(password, 5)

      // regist
      // sync with front end
      const newUser = await User.create({
        NIM,
        username,
        email,
        password: hashPassword,
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
  userLogin: async (req, res) => {
    try {
      const { NIM, password } = req.body

      const findUserByNIM = await User.findOne({
        where: {
          NIM,
        },
      })

      if (!findUserByNIM) {
        return res.status(400).json({
          message: "User not found, try again",
        })
      }

      // compare raw data = password with NIM,username,email
      const validPassword = bcrypt.compareSync(password, findUserByNIM.password)

      if (!validPassword) {
        return res.status(400).json({
          message: "Wrong Password!!!",
        })
      }

      // delete password property from object response
      delete findUserByNIM.dataValues.password

      const token = signToken({
        id: findUserByNIM.id,
      })

      return res.status(201).json({
        message: "Login Success",
        data: findUserByNIM,
        token,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server Error !",
      })
    }
  },
  tokenRefresh: async (req, res) => {
    try {
      const findUserById = await User.findByPk(req.user.id)

      const renewedToken = signToken({
        id: req.user.id,
      })

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

module.exports = authController
