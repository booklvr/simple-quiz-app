import passport from 'passport'

// connect to the database
import Teacher from '../models/TeacherModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

// route
// * /api/v1/
export const isTeacher = (req, res, next) => {
  if (req.user.accountType === 'teacher') {
    console.log('yes, this is in fact a teacher, you may proceed')
    return next()
  } else {
    console.log(
      'you are not a teacher, what are you doing here? Back to I better tell the frontend you do not belong'
    )
    res.status(401)
    throw new Error('Parents are not authorized for this route')
  }
}
