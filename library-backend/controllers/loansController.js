const db = require("../models");
const moment = require("moment");
const { on } = require("nodemailer/lib/xoauth2");

const loansController = {
  checkout: async (req, res) => {
    // PSEUDOCODE
    /*
      Verify user (Discuss with Adli)
      Validate length of loan
        If length of loan is greater than 5 days
        Send an error response to client
      Get all items from user's shopping cart
      Create new transaction
    */

    try {
      // Validate loan length
      let { loanDate, dueDate } = req.body;
      loanDate = moment(loanDate);
      dueDate = moment(dueDate);

      const dateDiff = dueDate.diff(loanDate, "days");
      const maxLength = 5;

      if (dateDiff > maxLength) {
        return res.status(400).json({
          message: "You have exceeded the loan limit",
        });
      }

      // Get all items from shopping cart
      const books = await db.Cart.findAll({
        where: {
          UserId: req.body.id, // TESTING PURPOSES ONLY: USE TOKEN AFTERWARDS
        },
        attributes: ["BookId"],
      });

      // Create new transaction
      const newTransaction = {
        loan_date: loanDate,
        due_date: dueDate,
        fine: 0,
        UserId: req.body.id, // TESTING PURPOSES ONLY: USE TOKEN AFTERWARDS
      };
      const ongoingTransaction = await db.Transaction.create(newTransaction);

      // Specify transaction items
      const transactionItems = books.map((book) => {
        return {
          TransactionId: ongoingTransaction.id,
          BookId: book.BookId,
        };
      });
      await db.TransactionItem.bulkCreate(transactionItems);

      // Send successful response to client
      return res.status(200).json({
        message: "Loan successful",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = loansController;
