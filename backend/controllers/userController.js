import validator from 'validator'
import Teacher from '../models/TeacherModel.js'
import Parent from '../models/ParentModel.js'
import Student from '../models/StudentModel.js'
import Token from '../models/VerificationModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {
  getAllFactory,
  getOneFactory,
  deleteOneFactory,
  updateOneFactory,
} from './handlerFactory.js'
import passport from 'passport'

export const verifyLoggedInUser = (req, res) => {
  res.status(200).json({ status: 'success', user: req.user })
}

export const checkForExistingUser = catchAsync(async (req, res, next) => {
  const { email } = req.body

  const teacher = await Teacher.findOne({ email: email })
  const student = await Student.findOne({ email: email })
  const parent = await Parent.findOne({ email: email })

  let existingUser = teacher || student || parent

  res.status(200).json({
    exists: !!existingUser,
  })

  // return next(
  //   new AppError('There was an error sending the email.  Try again later.'),
  //   500
  // )
})

export const login = (req, res, next) => {
  console.log('logging in')
  passport.authenticate(
    ['teacherLocal', 'studentLocal', 'parentLocal'],
    (err, user, info) => {
      var error = err || info
      // if (error) return res.status(401).json({ error })
      if (error)
        return next(new AppError('Could not verify this email address.', 401))

      req.logIn(user, (err) => {
        if (err) {
          return next(new AppError('Login Failed', 500))
        }
        // if (err)
        //   return res
        //     .status(500)
        //     .json({ status: 'fail', message: 'login failed', error })
        res.status(200).json({
          status: 'success',
          message: `successfully logged in ${req.user.accountType}`,
          user: req.user,
        })
      })
    }
  )(req, res, next)
}

export const getUserId = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

export const deleteAllModels = async () => {
  Parent.remove({}, (err) => console.log('parentModelDropped'))
  Teacher.remove({}, (err) => console.log('teacherModelDropped'))
  Student.remove({}, (err) => console.log('studentModelDropped'))
}

export const getAllUsers = getAllFactory(Teacher)
export const getUser = getOneFactory(Teacher)
export const updateUser = updateOneFactory(Teacher)
export const deleteUser = deleteOneFactory(Teacher)
