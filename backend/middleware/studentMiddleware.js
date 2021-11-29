// import passport from 'passport'

// connect to the database
// import Parent from '../models/ParentModel.js'
import catchAsync from '../utils/catchAsync.js'
// import AppError from '../utils/appError.js'

// route
// * /api/v1/
export const isStudent = (req, res, next) => {
  if (req.user.accountType === 'student') {
    console.log('yes, this is in fact a student, you may proceed')
    return next()
  } else {
    console.log(
      'you are not a student, what are you doing here? Back to I better tell the frontend you do not belong'
    )
    res.status(401)
    return new Error('Students are not authorized for this route')
  }
}
