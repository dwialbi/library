// Imports
const loansController = require("../controllers/loansController");
const { verifyToken } = require("../middleware/authMiddleware");

// Create routes for loans
const express = require("express");
const router = express.Router();

// Checkout
router.post("/checkout", loansController.checkout);

// Return loaned books
router.post("/return", loansController.returnLoan);

module.exports = router;
