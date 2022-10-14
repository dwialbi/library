const { escapeExpression } = require("handlebars");
const jwt = require("jsonwebtoken");
const { validateToken } = require("../lib/jwt");

const verifyToken = (req, res, next) => {
  // Get token
  let token = req.headers.authorization;

  // If token is non-existent send an error response to client
  if (!token) {
    return res.status(401).json({
      message: "User unauthorized",
    });
  }

  // Else if token exist, verify token
  try {
    // Fetch bearer token
    token = token.split(" ")[1];
    const isVerified = validateToken(token);

    // If token is invalid send an error response to client
    if (!isVerified) {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }

    req.user = verifiedUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = { verifyToken };
