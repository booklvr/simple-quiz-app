// import passport from 'passport'

// connect to the database
// import Parent from '../models/ParentModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

// route
// * /api/v1/
export const isParent = (req, res, next) => {
  if (req.user.accountType === 'parent') {
    console.log('yes, this is in fact a parent, you may proceed')
    return next()
  } else {
    console.log(
      'you are not a parent, what are you doing here? Back to I better tell the frontend you do not belong'
    )
  }
}
