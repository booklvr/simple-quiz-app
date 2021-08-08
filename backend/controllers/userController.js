import validator from 'validator'
import Teacher from '../models/TeacherModel.js'
import TempUser from '../models/TempUserModel.js'
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

export const registerFromGoogle = catchAsync(async (req, res, next) => {
  const { id, type } = req.body

  const { googleId } = await TempUser.findById(id).select('googleId')

  if (googleId) {
    // IF NOT GOOGLE ID NEW ERROR
    console.log('creating the new user')
    // create the new user
    const newUser = {
      googleId,
      type,
      displayName: req.user.displayName,
      email: req.user.email,
    }

    const tempUserId = req.user._id
    console.log('newUser', newUser)

    // logout the tempuser
    console.log('logout the temp user')
    req.logout()
    delete req.session

    // delete the temporary user
    console.log('deleting the temp user')
    const deletedTempUser = await TempUser.findByIdAndDelete(tempUserId)
    console.log('deletedTempUser', deletedTempUser)

    if (!deletedTempUser)
      return next(new AppError('No document found with that ID', 404))


    // req.session.destroy()



    if (type === 'teacher') {

      console.log('creating new teacher instance')
      const newTeacher = await Teacher.create(newUser)


      if (!newTeacher) return next(new AppError('Teacher could not be created'))

      req.login(newTeacher, ((err) => {
        if (err) { return next(err) }
        res.status(201).json({
          status: 'success',
          data: newTeacher,
        })
      }))

      console.log('newTeacher', newTeacher)

      // passport.authenticate('custom', { failureRedirect: '/login' })


      // if (req.isAuthenticated()) {
      //   console.log('this fucker is still authenticated')
      //   console.log(req.user.id, 'req.user.id')
      // } else {
      //   console.log('we lost authentication.')
      // }
      // passport.authenticate('google', {
      //   failureRedirect: 'http://localhost/test',
      //   // successRedirect: 'http://localhost:3000',
      // },
      //   () => {
      //     console.log('trying to authenticate user in the register google route')

      //     res.status(201).json({
      //       status: 'success',
      //       message: 'User registered successfully',
      //       data: {
      //         user: req.user,
      //       }
      //     })
      //   }
      // )

    } else {
      const newStudent = await Student.create(newUser)

      if (!newStudent) return next(new AppError('Student could not be created'))

      req.login(newStudent, ((err) => {
        if (err) { return next(err) }
        res.status(201).json({
          status: 'success',
          data: newStudent,
        })
      }))
    }


    // passport.authenticate('custom', { failureRedirect: 'http://localhost:3000/test' }), ((req, res) => {
    //   res.status(201).json({
    //     status: 'success',
    //     data: req.user,
    //   })
    // })


    // DELETE THE OLD USER
  } else {
    res.status(404)
    throw new Error('Error Creating new User')
  }
})

export const register = catchAsync(async (req, res, next) => {
  const { displayName, email, password, passwordConfirm } = req.body

  // ERROR HANDLING
  // * missing fields
  if (!displayName || !email || !password || !passwordConfirm) {
    return next(new AppError('Please fill in all fields', 400))
  }

  if (!validator.isLength(displayName, { min: 4, max: 16 })) {
    return next(
      new AppError('display name must be between 4 and 16 characters', 400)
    )
  }

  if (!validator.isEmail(email)) {
    return next(new AppError('must provide a valid email address', 400))
  }

  if (!validator.isLength(password, { min: 8, max: undefined })) {
    return next(new AppError('password must be at least 8 characters', 400))
  }

  // * passwords do not match
  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 401))
  }

  // CREATE NEW USER
  const user = await new User({
    displayName,
    email,
  })

  // TO DO add ERROR HANDLING HERE

  User.register(user, password, async (err) => {
    if (err) {
      console.log(err)

      return next(new AppError(err.message, 500))
    }

    passport.authenticate('local')(req, res, function () {
      // req.flash("success", "successfully signed up! nice to meet you " + req.body.username);
      // res.redirect('../../../../lessons')
      res.status(200).json({
        status: 'success',
        message: 'User Registered Successfully',
        data: {
          user: req.user,
        },
      })
    })
  })
})

export const getUserId = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

export const getAllUsers = getAllFactory(Teacher)
export const getUser = getOneFactory(Teacher)
export const updateUser = updateOneFactory(Teacher)
export const deleteUser = deleteOneFactory(Teacher)
