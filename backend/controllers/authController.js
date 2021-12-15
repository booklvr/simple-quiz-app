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
  
  next()
})

export const logout = (req, res) => {
  req.logout()
  res.locals.user = ''

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
