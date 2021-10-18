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

  passport.use(
    new CustomStrategy(function (req, done) {
      console.log('inside the custom strategy')
      console.log('req.user', req.user);
      // User.findOne(
      //   {
      //     username: req.body.username,
      //   },
      //   function (err, user) {
      //     done(err, user)
      //   }
      // )
    })
  )

  // with works with passport-local-mongoose
  // * need User.createStrategy because we change username field to email
  // passport.use(Teacher.createStrategy())

  passport.serializeUser((user, done) => {
    console.log('serrializing user')

    // let type = user.accountType
    done(null, { id: user.id, accountType: user.accountType })

    // done(null, user.id)
  })

  passport.deserializeUser((data, done) => {
    console.log('deserrializing user')
    console.log('data', data)

    if (data.accountType === 'student') {
      console.log('deserializing student')
      Student.findById(data.id, function (err, user) {
        done(err, user)
      })
    } else if (data.accountType === 'teacher') {
      console.log('deserializing teacher')
      Teacher.findById(data.id, function (err, user) {
        done(err, user)
      })
    } else {
      console.log('deserializing temp user')
      TempUser.findById(data.id, function (err, user) {
        done(err, user)
      })
    }

    // Teacher.findById(id, (err, teacher) => {
    //   if (teacher) {
    //     console.log('desserializing teacher')
    //     done(err, teacher)
    //   } else {
    //     Student.findById(id, (err, student) => {
    //       if (student) {
    //         console.log('desserializing student')
    //         done(err, student)
    //       } else {
    //         TempUser.findById(id, (err, tempUser) => {
    //           if (tempUser) {
    //             console.log('desserializing tempUser')
    //             done(err, tempUser)
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
  })
}

export default passportConfig
