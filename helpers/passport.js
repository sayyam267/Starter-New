const passport = require("passport");
const User = require("../models/UserModel");

passport.serializeUser((user, done) => {
  //   console.log(user);
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await User.findOne({ id });
  done(null, currentUser);
});
