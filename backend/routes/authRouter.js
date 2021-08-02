import express from 'express';
import passport from 'passport';
import User from '../models/UserModel.js';
import {isAuthenticated} from '../controllers/authController.js'



const router = express.Router();
// @desc Auth with Google
// @route get api/v1/auth/google

router.get('/google', () => {
  console.log('i made it to the google route... what the fuck?')
})

// router.get('/google', passport.authenticate('google', {
//   scope: [
//     'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/userinfo.email',
//   ]
// }))

// @desc Google Auth Callback
// @route GET api/v1/auth/google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '../../../../my-classrooms',
  })
);

export default router;