const jwt = require("jsonwebtoken")

const VERIFICATION_KEY = process.env.VERIFICATION_KEY

const createVerifToken = (payload) => {
  return jwt.sign(payload, VERIFICATION_KEY, { expiresIn: "30m" })
}

const validVerifToken = (token) => {
  return jwt.verify(token, VERIFICATION_KEY)
}

module.exports = {
  createVerifToken,
  validVerifToken,
}
