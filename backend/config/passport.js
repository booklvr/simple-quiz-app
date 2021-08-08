import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as CustomStrategy } from 'passport-custom'
import mongoose from 'mongoose'
import Teacher from '../models/TeacherModel.js'
import TempUser from '../models/TempUserModel.js'
import Student from '../models/StudentModel.js'

const passportConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const googleUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        }
        console.log("WHAT THE FUCKS")
        try {
          // search for teacher
          let teacher = await Teacher.findOne({ googleId: profile.id })
          let student = await Student.findOne({ googleId: profile.id })
          let tempUser = await TempUser.findOne({ googleId: profile.id })

          console.log('teacher', teacher)
          console.log('student', student)
          console.log('tempUser', tempUser)

          if (teacher) {
            console.log('google strategy: found teacher')
            done(null, teacher)
          } else if (student) {
            console.log('google strategy: found student')
            done(null, student)
          } else if (tempUser) {
            console.log('google strategy: found tempUser')
            done(null, tempUser)
          } else {

            console.log(
              'I NEED TO MAKE A NEW USER HERE SOMEHOW, ROUTE TO STUDENT ROUTE OR PARENT ROUTE'
            )
            const newUser = await TempUser.create(googleUser)
            done(null, newUser)
          }
        } catch (err) {
          console.log(err)
        }
      }
    )
  )

  passport.use('custom', new CustomStrategy(function (req, done) {
    console.log('inside the custom passport authentication')
    Teacher.findById(req.user._id, ((err, user) => {
      done(err, user)
    }))

    // try {
    //   const teacher = await Teacher.findOne({ googleId: req.user.googleId })
    //   const student = await Student.findOne({ googleId: req.user.googleId })
    //   let user

    //   if (teacher) {
    //     user = teacher

    //   } else if (student) {
    //     user = student
    //   } else {
    //     return new Error('User not found')
    //   }
    //   done(err, user)
    // } catch (error) {
    //   console.log(error)
    // }
  }))

  // with works with passport-local-mongoose
  // * need User.createStrategy because we change username field to email
  passport.use(Teacher.createStrategy())

  passport.serializeUser((user, done) => {
    let type = user.accountType;
    done(null, {id: user.id, type: type})
    // done(null, user.id)
  })

  passport.deserializeUser((id, done) => {

    Teacher.findById(id, (err, teacher) => {
      if (teacher) {
        done(err, teacher)
      } else {
        Student.findById(id, (err, student) => {
          if (student) {
            done(err, student)
          } else {
            TempUser.findById(id, (err, tempUser) => {
              if (tempUser) {
                done(err, tempUser)
              }
            })
          }
        })
      }
    })



  })
}

export default passportConfig