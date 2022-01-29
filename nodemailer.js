const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = async function nodeMailer(email, token) {
  const res = await transporter.sendMail({
    from: "'payment getway app' <02amanporwal@gmail.com> ",
    to: `${email}`,
    subject: "Verify your account",
    html: `<h1><a href="https://payment-getway.herokuapp.com/verification/${token}"> Click here to verify </a></h1> <br> <h3> if you don't see the link copy paste the link below in browser </h3> <br> https://payment-getway.herokuapp.com/verification/${token}`,
  });
  return res;
};
