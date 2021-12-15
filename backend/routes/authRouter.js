import express from 'express'
import passport from 'passport'
import Teacher from '../models/TeacherModel.js'
import {
  checkForExistingAccount,
  isAuthenticated,
  logout,
} from '../controllers/authController.js'
import { verifyLoggedInUser } from '../controllers/userController.js'
import AppError from '../utils/appError.js'

const router = express.Router()
// @desc Auth with Google
// @route get api/v1/auth/google

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
)

router.get(
  '/google/teacher',
  passport.authenticate('google-teacher', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
)

router.get(
  '/google/student',
  passport.authenticate('google-student', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
)

router.get(
  '/google/parent',
  passport.authenticate('google-parent', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
)

// @desc Google OAuth Teacher Callback
// @route GET api/v1/auth/google/teacher/callback
router.get(
  '/google/teacher/callback',
  passport.authenticate('google-teacher', {
    successRedirect: 'http://localhost:3000/teacher',
    failureRedirect: 'http://localhost:3000/login',
  })
)

// @desc Google OAuth Teacher Callback
// @route GET api/v1/auth/google/teacher/callback
router.get(
  '/google/callback',
  checkForExistingAccount,
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/register',
  }),
  (req, res) => {
    console.log('GOOGLE/CALLBACK - req.user', req.user)

    if (req.user.accountType === 'teacher') {
      // return res.status(200).json({
      //   status: 'success',
      //   message: 'logged in successfully',
      //   user: req.user,
      // })
      res.redirect(`http://localhost:3000/teacher`)
    } else if (req.user.accountType === 'student')
      res.redirect('http://localhost:3000/parent')
    else if (req.user.accountType === 'student')
      res.redirect('http://localhost:3000/parent')
  }
)

// @desc Google OAuth Teacher Callback
// @route GET api/v1/auth/google/teacher/callback
router.get(
  '/google/student/callback',
  passport.authenticate('google-student', {
    successRedirect: 'http://localhost:3000/student',
    failureRedirect: 'http://localhost:3000/login',
  })
)

// @desc Google OAuth Teacher Callback
// @route GET api/v1/auth/google/teacher/callback
router.get(
  '/google/parent/callback',
  passport.authenticate('google-parent', {
    successRedirect: 'http://localhost:3000/parent',
    failureRedirect: 'http://localhost:3000/login',
  })
)

// @desc Google Auth Callback
// @route GET api/v1/auth/google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost/test',
    // successRedirect: 'http://localhost:3000',
  }),
  (req, res) => {
    console.log('GOOGLE/CALLBACK - req.user', req.user)
    if (req.user.accountType === 'temp') {
      console.log('this is a new user')
      console.log('req.isAuthenticated', req.isAuthenticated())
      res.redirect('http://localhost:3000/google/choose-account')
    } else {
      console.log('this is an existing user')
      console.log('req.user', req.user)
      if (req.user.accountType === 'teacher') {
        console.log(
          'google auth teacher req.isAuthenticated',
          req.isAuthenticated()
        )
        res.redirect('http://localhost:3000/teacher')
      } else if (req.user.accountType === 'student')
        res.redirect('http://localhost:3000/student')
      else res.redirect('http://localhost:3000/login')
    }
  }
)

router.get('/authenticated', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      status: 'success',
      message: `successfully authenticated ${req.user.displayName}`,
      user: req.user,
    })
  } else {
    return next(new AppError('could not authenticate user', 404))
    // res.status(404).json({
    //   status: 'fail',
    //   message: 'could not authenticate user',
    //   user: null,
    // })
    // throw new Error('User not found')
  }
})

router.get('/logout', logout)

export default router
