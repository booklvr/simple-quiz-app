import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import mongoose from 'mongoose'
import User from '../models/UserModel.js'

const passportConfig = (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      }
      try {
        let user = await User.findOne({ googleId: profile.id});

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
        
      }catch (err)  {
        console.log(err)
      }
    })
  )

  // with works with passport-local-mongoose
  // * need User.createStrategy because we change username field to email
  passport.use(User.createStrategy());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

export default passportConfig;
