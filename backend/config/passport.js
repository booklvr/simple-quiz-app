import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import mongoose from 'mongoose'
import Teacher from '../models/TeacherModel.js'
import TempUser from '../models/TempUserModel.js'
import StudentModel from '../models/StudentModel.js'

const passportConfig = (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
      
      const googleUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      }
      try {
        // search for teacher
        let teacher = await Teacher.findOne({ googleId: profile.id});
        let student = await StudentModel.findOne({googleId: profile.id})
        let tempUser = await TempUser.findOne({ googleId: profile.id});

        if (teacher) {
          done(null, teacher)
        } else if (student) {
          done(null, student)
        } else if (tempUser) {
          done(null, tempUser)
        }  else {
          let newUser = {...googleUser, newUser: true}
          console.log('I NEED TO MAKE A NEW USER HERE SOMEHOW, ROUTE TO STUDENT ROUTE OR PARENT ROUTE')
          newUser = await TempUser.create(googleUser);
          done(null, newUser);
        }
      }catch (err)  {
        console.log(err)
      }
    })
  )

  // with works with passport-local-mongoose
  // * need User.createStrategy because we change username field to email
  passport.use(Teacher.createStrategy());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Teacher.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

export default passportConfig;
