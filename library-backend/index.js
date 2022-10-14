// Imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models");
const loansRoute = require("./routes/loansRoute");
const { verifyToken } = require("./middleware/authMiddleware"); // ONCE READY FOR TESTING, APPLY TO LOANS ROUTE

// Configure PORT
dotenv.config();
const PORT = process.env.PORT;

// Configure Express
const app = express();
app.use(cors());
app.use(express.json());

// Loans Route
app.use("/loan", loansRoute);

app.listen(PORT, () => {
  db.sequelize.sync({ alter: true });
  console.log("listening to PORT", PORT);
});
