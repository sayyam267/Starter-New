const uuid = require("uuid");
const nodemailer = require("nodemailer");
const UserModel = require("../models/UserModel");
require("dotenv").config();
const fromMail = process.env.MAIL;
const fromPass = process.env.PASS;
const sendVerificationEmail = async ({ name, email, confirmationCode }) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: fromMail,
      pass: fromPass,
    },
  });
  await transporter
    .sendMail({
      from: fromMail,
      to: email,
      subject: "Please Verify your Email",
      html: `<h1>Email Confirmation</h1>
      <h2>Hello ${name}</h2>
      <p>Please confirm your email by clicking on the following link</p>
      <a href=http://tourbook-backend.herokuapp.com/user/validate/${confirmationCode}> Click here</a>
      </div>`,
    })
    .catch((e) => console.log(e));
};

const sendForgotPassword = async ({ name, email, confirmationCode }) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: fromMail,
      pass: fromPass,
    },
  });
  let newrandompassword = uuid();
  let user = UserModel.findOneAndUpdate(
    { email: email },
    { password: newrandompassword }
  );
  if (user) {
    await transporter
      .sendMail({
        from: fromMail,
        to: email,
        subject: "Forgot Password for TourBook",
        html: `<h1>New Password</h1>
        <h2>Hello ${name}</h2>
        <p>Your New Password is <b>${newrandompassword}</b></p>
        </div>`,
      })
      .catch((e) => console.log(e));
  }
};
module.exports = { sendVerificationEmail, sendForgotPassword };
