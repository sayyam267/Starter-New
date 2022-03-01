const jwt = require("jsonwebtoken");
require("dotenv").config();
const lodash = require("lodash");
const handleAuth = (req, res, next) => {
  // console.log("INSIDE");
  let token = req.header("x-auth-token");
  if (!token) {
    console.log("TOKEN NOT FOUND");
    return res.status(400).send("Token Not Provided");
  }
  try {
    let user = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = user;
  } catch (e) {
    console.log("INVALID TOKEN");
    return res.status(401).send("Invalid Token");
  }
  // req.user = lodask.pick(user, ["email", "_id", "firstName", "lastName"]);
  next();
};

module.exports = handleAuth;
