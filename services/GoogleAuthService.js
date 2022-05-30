const addGoogleUser =
  (User) =>
  ({ id, email, firstName, lastName, profilePhoto }) => {
    const user = new User({
      id,
      email,
      firstName,
      lastName,
      profilePhoto,
      source: "google",
    });
    return user.save();
  };

const getUsers = (User) => () => {
  return User.find({});
};

const getUserByEmail =
  (User) =>
  async ({ email }) => {
    return await User.findOne({ email });
  };

module.exports = (User) => {
  return {
    addGoogleUser: addGoogleUser(User),
    getUsers: getUsers(User),
    getUserByEmail: getUserByEmail(User),
  };
};

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.CALLBACK_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      //   const id = profile.id;
      const email = profile.emails[0].value;
      const fname = profile.name.givenName;
      const lname = profile.name.familyName;
      const profilePicture = profile.photos[0].value;
      const source = "google";
      const currentUser = await UserService.getUserByEmail({ email });

      if (!currentUser) {
        const newUser = await UserService.addGoogleUser({
          //   id,
          email,
          fname,
          lname,
          profilePicture,
        });
        return done(null, newUser);
      }

      if (currentUser.source != "google") {
        //return error
        return done(null, false, {
          message: `You have previously signed up with a different signin method`,
        });
      }

      //   currentUser.lastVisited = new Date();
      return done(null, currentUser);
    }
  )
);
