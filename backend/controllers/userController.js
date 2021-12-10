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

  console.log('teacher:', teacher, 'student', student, 'parent:', parent)

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
      if (error) return res.status(401).json({ error })

      req.logIn(user, (err) => {
        if (err)
          return res
            .status(500)
            .json({ status: 'fail', message: 'login failed', error })
        res.status(200).json({
          status: 'success',
          message: `successfully logged in ${req.user.accountType}`,
          user: req.user,
        })
      })
    }
  )(req, res, next)
}

// export const register = catchAsync(async (req, res, next) => {
//   const { displayName, email, password, passwordConfirm } = req.body

//   // ERROR HANDLING
//   // * missing fields
//   if (!displayName || !email || !password || !passwordConfirm) {
//     return next(new AppError('Please fill in all fields', 400))
//   }

//   if (!validator.isLength(displayName, { min: 4, max: 16 })) {
//     return next(
//       new AppError('display name must be between 4 and 16 characters', 400)
//     )
//   }

//   if (!validator.isEmail(email)) {
//     return next(new AppError('must provide a valid email address', 400))
//   }

//   if (!validator.isLength(password, { min: 8, max: undefined })) {
//     return next(new AppError('password must be at least 8 characters', 400))
//   }

//   // * passwords do not match
//   if (password !== passwordConfirm) {
//     return next(new AppError('Passwords do not match', 401))
//   }

//   // CREATE NEW USER
//   const user = await new User({
//     displayName,
//     email,
//   })

//   // TO DO add ERROR HANDLING HERE

//   User.register(user, password, async (err) => {
//     if (err) {
//       console.log(err)

//       return next(new AppError(err.message, 500))
//     }

//     passport.authenticate('local')(req, res, function () {
//       // req.flash("success", "successfully signed up! nice to meet you " + req.body.username);
//       // res.redirect('../../../../lessons')
//       res.status(200).json({
//         status: 'success',
//         message: 'User Registered Successfully',
//         data: {
//           user: req.user,
//         },
//       })
//     })
//   })
// })

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
