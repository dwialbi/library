const nodemailer = require("nodemailer")

const emailer = async ({ to, subject, text, html }) => {
  if (!to) throw new Error("Emailer needs recipient")

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  })

  await transporter.sendMail({
    to: to,
    subject: subject,
    text: text,
    html: html,
  })
}

module.exports = emailer
