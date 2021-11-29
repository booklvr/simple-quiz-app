import passport from 'passport'
import crypto from 'crypto'
import moment from 'moment'

// connect to the database
import Teacher from '../models/TeacherModel.js'
import Clasroom from '../models/ClassroomModel.js'
import Token from '../models/VerificationModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

// route
// * /api/v1/
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('figure out how you are going to be redirecting')
    // return res.redirect
  }
  return next()
}

export const login = (req, res, next) => {
  console.log('auth controller => login')
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  })
}

export const checkForExistingAccount = catchAsync(async (req, res, next) => {
  console.log('probably dont need middleware here')
  // try {
  //   // search for teacher
  //   let teacher = await Teacher.findOne({ googleId: profile.id })
  //   let student = await Student.findOne({ googleId: profile.id })
  //   let parent = await Parent.findOne({ googleId: profile.id })

  //   console.log('teacher', teacher)
  //   console.log('student', student)
  //   console.log('parent', parent)

  //   if (teacher) {
  //     res.locals.accountType = 'teacher'
  //   } else if (student) {
  //     res.locals.accountType = 'student'
  //   } else if (parent) {
  //     res.locals.accountType = 'parent'
  //   } else {
  //     return res.status(404).json({
  //       status: 'failure',
  //       message: 'this account is not registered, please register account',
  //       data: null,
  //     })
  //   }
  // } catch (err) {
  //   console.log(err)
  // }
  next()
})

export const logout = (req, res) => {
  req.logout()
  // res.locals.user = ''

  res.status(200).json({
    status: 'success',
    message: 'successfully logged out',
    data: null,
  })
}

export const confirmPassword = catchAsync(async (req, res, next) => {
  if (!req.body.password) {
    return next(new AppError('No password entered', 400))
  }

  await req.user.authenticate(req.body.password, (err, thisModel) => {
    if (!thisModel) {
      return next(new AppError('Password Incorrect', 400))
    }
    res.status(200).json({
      status: 'success',
    })
  })
})

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/my-classrooms')
  }
  return next()
}
