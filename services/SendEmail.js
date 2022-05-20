const uuid = require("uuid");
const nodemailer = require("nodemailer");
const UserModel = require("../models/UserModel");
require("dotenv").config();
const fromMail = process.env.MAIL;
const fromPass = process.env.PASS;

const sendVerificationEmail = async ({ name, email, confirmationCode }) => {
  const transporter = await nodemailer.createTransport({
    // service: "gmail",
    service: "hotmail",
    auth: {
      user: fromMail,
      pass: fromPass,
    },
  });
  await transporter
    .sendMail({
      from: fromMail,
      to: email,
      subject: "TourBook : Please Verify your Email",
      html: `<h1>Email Confirmation</h1>
      <h2>Hello ${name}. Thanks for signing up for TourBook.</h2>
      <p>Please confirm your email by clicking on the following link</p>
      <a href=http://tourbook-backend.herokuapp.com/user/validate/${confirmationCode}> Click here</a>
      </div>`,
    })
    .catch((e) => console.log(e));
};
const sendForgotPassword = async ({ name, email, confirmationCode }) => {
  const transporter = await nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: fromMail,
      pass: fromPass,
    },
  });
  await transporter
    .sendMail({
      from: fromMail,
      to: email,
      subject: "TourBook : Forgot Password",
      html: `<h1>TourBook : Password Reset Code</h1>
        <h2>Hello ${name}</h2>
        <p>Your Password Reset Code is : <b>${confirmationCode}</b></p>
        </div>`,
    })
    .catch((e) => console.log(e));
};
module.exports = { sendVerificationEmail, sendForgotPassword };
