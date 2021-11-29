// import passport from 'passport'

// connect to the database
// import Teacher from '../models/TeacherModel.js'
// import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

// route
// * /api/v1/

// route
// check if user is logged in and authenticated
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`${req.user.displayName} is logged in and authenticated`)
    next()
  } else {
    console.log('could not authenticate user')
    res.status(404)
    throw new Error('Not authorized, user not found')
    // must send error to frontend

    // next()
  }
}
