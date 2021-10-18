import express from 'express'
import passport from 'passport'
import Teacher from '../models/TeacherModel.js'
import { isAuthenticated, logout } from '../controllers/authController.js'

const router = express.Router()
// @desc Auth with Google
// @route get api/v1/auth/google

// router.get('/google', () => {
//   console.log('i made it to the google route... what the fuck?')
// })

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
  passport.authenticate(
    'google',
    {
      successRedirect: 'http://localhost:3000/student',
    },
    (req, res) => {
      console.log(req.user)
    }
  )
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

router.get('/google/authenticated', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      user: req.user,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

router.get('/logout', logout)

export default router
