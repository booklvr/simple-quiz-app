import express from 'express'
import passport from 'passport'
import Teacher from '../models/TeacherModel.js'
import { isAuthenticated } from '../controllers/authController.js'

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

// @desc Google Auth Callback
// @route GET api/v1/auth/google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost/test',
    // successRedirect: 'http://localhost:3000',
  }),
  (req, res, next) => {
    console.log('GOOGLE/CALLBACK - req.user', req.user)
    if (req.user.newUser) {
      console.log('this is a new user')
      res.redirect('http://localhost:3000/google/choose-account')
    } else {
      console.log('this is an existing user')
      console.log('req.user', req.user)
      res.redirect('http://localhost:3000')
    }
  }
)
router.get('/google/authenticated', (req, res) => {
  console.log('/GOOGLE/AUTHENTICATED')
  console.log(req.session.passport.user, '=user')
  if (req.isAuthenticated()) {
    res.status(200).json({
      user: req.user,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export default router
