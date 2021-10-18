import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as CustomStrategy } from 'passport-custom'
import mongoose from 'mongoose'
import Teacher from '../models/TeacherModel.js'
import Parent from '../models/ParentModel.js'
import Student from '../models/StudentModel.js'

const passportConfig = (passport) => {
  passport.use(
    'google',
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
          let parent = await Parent.findOne({ googleId: profile.id })

          console.log('teacher', teacher)
          console.log('student', student)
          console.log('parent', parent)

          if (teacher) {
            console.log('google strategy: found teacher')
            done(null, teacher)
          } else if (student) {
            console.log('google strategy: found student')
            done(null, student)
          } else if (parent) {
            console.log('google strategy: found parent')
            done(null, parent)
          } else {
            console.log('account not found')
            console.log('you have to re route to register account')
          }
        } catch (err) {
          console.log(err)
        }
      }
    )
  )
  passport.use(
    'google-teacher',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/teacher/callback',
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
          let parent = await Parent.findOne({ googleId: profile.id })

          console.log('teacher', teacher)
          console.log('student', student)
          console.log('parent', parent)

          if (teacher) {
            console.log('google strategy: found teacher')
            done(null, teacher)
          } else if (student) {
            console.log('google strategy: found student')
            console.log('you can only have one registered account per email')
            const err = new Error(
              'you can only have one registed account per email'
            )
            done(err)
          } else if (parent) {
            console.log('google strategy: found parent')
            console.log('you can only have one registered account per email')
            const err = new Error(
              'you can only have one registed account per email'
            )
          } else {
            console.log('creating new teacher')

            const teacher = await Teacher.create(googleUser)
            done(null, teacher)
          }
        } catch (err) {
          console.log(err)
        }
      }
    )
  )

  passport.use(
    'google-student',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/student/callback',
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
          let parent = await Parent.findOne({ googleId: profile.id })

          console.log('teacher', teacher)
          console.log('student', student)
          console.log('parent', parent)

          if (student) {
            console.log('google strategy: found student')
            done(null, student)
          } else if (teacher) {
            console.log('google strategy: found teacher')
            console.log('you can only have one registered account per email')
            const err = new Error(
              'you can only have one registed account per email'
            )
            done(err)
          } else if (parent) {
            console.log('google strategy: found parent')
            console.log('you can only have one registered account per email')
            const err = new Error(
              'you can only have one registed account per email'
            )
          } else {
            console.log('creating new student')

            const student = await Student.create(googleUser)
            done(null, student)
          }
        } catch (err) {
          console.log(err)
        }
      }
    )
  )

  passport.use(
    'google-parent',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/parent/callback',
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
          let parent = await Parent.findOne({ googleId: profile.id })

          console.log('teacher', teacher)
          console.log('student', student)
          console.log('parent', parent)

          if (parent) {
            console.log('google strategy: found parent')
            done(null, parent)
          } else if (teacher) {
            console.log('google strategy: found teacher')
            console.log('you can only have one registered account per email')
            const err = new Error(
              'you can only have one registed account per email'
            )
            done(err)
          } else if (student) {
            console.log('google strategy: found student')
            console.log('you can only have one registered account per email')
            const err = new Error(
              'you can only have one registed account per email'
            )
          } else {
            console.log('creating new parent')
            const parent = await Parent.create(googleUser)
            done(null, parent)
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
      console.log('req.user', req.user)
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
      console.log('deserializing parent')
      Parent.findById(data.id, function (err, user) {
        done(err, user)
      })
    }
  })
}

export default passportConfig
