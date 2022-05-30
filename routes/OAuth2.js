const router = require("express").Router();
const passport = require("passport");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
    failureFlash: true,
    successFlash: "Successfully logged in!",
  })
);

router.get("/success", async (req, res) => {
  if (user) console.log(user);
  // console.log(req);
  // console.log(res);
  // let newUser = await UserModel({
  //   ...user,
  //   isVerified: true,
  //   isActive: true,
  //   userType: "tourist",
  // }).save();
  const user2 = {
    id: user._id,
    email: user.email,
    name: user.fname + " " + user.lname,
    role: user.userType,
    // isActive: newUser.isActive,
  };
  const token = jwt.sign(user2, process.env.PRIVATE_KEY);
  return res.send({
    data: {
      token: token,
      role: user2.role,
      profilePicture: user2.profilePicture,
    },
    message: "Fetched",
  });
  // return res.send("Success Called");
  // console.log(req);
  // return res.send(JSON.stringify(req));
});
router.get("/failure", async (req, res) => {
  // console.log(res);
  // console.log(req);
  // if ({ message }) console.log(message);
  return res.status(400).send({
    data: null,
    message: "You have previously signed up with a different signin method",
  });
  // return res.send(JSON.stringify(req));
});

module.exports = router;
