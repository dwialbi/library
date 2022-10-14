// Imports
const loansController = require("../controllers/loansController");

// Create routes for loans
const express = require("express");
const router = express.Router();

// Checkout
router.post("/checkout", loansController.checkout);

module.exports = router;
