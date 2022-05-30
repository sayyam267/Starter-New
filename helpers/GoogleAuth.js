const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");
const UserModel = require("../models/UserModel");
const User = require("../models/UserModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.CALLBACK_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      //   console.log("user profile is: ", profile);
      user = {
        email: profile._json.email,
        fname: profile._json.given_name,
        lname: profile._json.family_name,
        profilePicture: profile._json.picture,
        source: profile.provider,
      };

      //   const user = {};
      //   user.email = profile._json.email;
      //   user.fname = profile._json.given_name;
      //   user.lname = profile._json.family_name;
      //   user.profilePicture = profile._json.picture;
      //   user.source = profile.provider;
      //   //   //   user.id=profile._json.sub
      //   user.email=profile.emails[0].value;
      //   user.fname = profile.name.givenName;
      //   user.lname= profile.name.familyName;
      //   user.profilePicture = profile.photos[0].value;
      //   user.source=profile.provider;
      //   user.id=profile.id
      const existingUser = await UserModel.findOne({ email: user.email });
      //   console.log(existingUser);
      //   console.log(existingUser);
      if (!existingUser) {
        // console.log("INSIDE 1");

        let newuser = await UserModel({
          ...user,
          isVerified: true,
          isActive: true,
          userType: "tourist",
        }).save();
        user = newuser;
        done(null, user);
      }

      if (existingUser?.source !== "google") {
        // console.log("INSIDE 2");
        done(null, false, {
          message: `You have previously signed up with a different signin method`,
        });
      } else {
        // console.log("INSIDE 3");
        user = existingUser;
        done(null, user);
      }
    }
  )
);

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(
//   new GoogleStrategy(
//     {
//       callbackURL: process.env.CALLBACK_URL,
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       //   const id = profile.id;
//       const email = profile.emails[0].value;
//       const fname = profile.name.givenName;
//       const lname = profile.name.familyName;
//       const profilePicture = profile.photos[0].value;
//       const source = "google";
//       const currentUser = await UserService.getUserByEmail({ email });

//       if (!currentUser) {
//         const newUser = await UserService.addGoogleUser({
//           //   id,
//           email,
//           fname,
//           lname,
//           profilePicture,
//         });
//         return done(null, newUser);
//       }

//       if (currentUser.source != "google") {
//         //return error
//         return done(null, false, {
//           message: `You have previously signed up with a different signin method`,
//         });
//       }

//       //   currentUser.lastVisited = new Date();
//       return done(null, currentUser);
//     }
//   )
// );
