const db = require("../models")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const { signToken } = require("../lib/jwt")
const { validationResult } = require("express-validator")
const { validVerifToken, createVerifToken } = require("../lib/verification")
const emailer = require("../lib/emailer.js")
const fs = require("fs")
const handlebars = require("handlebars")

const User = db.User

const authController = {
  userRegist: async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid Fields",
        })
      }

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

      const verificationToken = createVerifToken({
        id: newUser.id,
      })

      const verificationLink = `http://localhost:2000/auth/verification?verification_token=${verificationToken}`

      // Emailer
      const rawHTML = fs.readFileSync("templates/register_user.html", "utf-8")
      const compiledHTML = handlebars.compile(rawHTML)
      const htmlResult = compiledHTML({
        username,
        verificationLink,
      })

      await emailer({
        to: email,
        html: htmlResult,
        subject: "Verify your Account",
        text: "Please Verify your Account",
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
  verifyUser: async (req, res) => {
    try {
      const { verification_token } = req.query

      const validToken = validVerifToken(verification_token)

      if (!validToken) {
        res.status(401).json({
          message: "Token invalid",
        })
      }

      await User.update(
        { is_verified: true },
        {
          where: {
            id: validToken.id,
          },
        }
      )

      return res.redirect("http://localhost:3000/login")
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server Error!",
      })
    }
  },
  //   try {
  //     const { verification_token } = req.query

  //     const validToken = validVerifToken(verification_token)

  //     if (!validToken) {
  //       return res.status(401).json({
  //         message: "Token is Invalid!!!",
  //       })
  //     }

  //     await User.update({ is_verified: true }, { where: { id: validToken.id } })

  //     return res.redirect("http://localhost:3000/login")
  //   } catch (err) {
  //     console.log(err)
  //     return res.status(500).json({
  //       message: "Server Error!",
  //     })
  //   }
  // },
}

module.exports = authController
