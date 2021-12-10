import express from 'express'
import passport from 'passport'
import {
  updateUser,
  deleteUser,
  getUserId,
  deleteAllModels,
  login,
  checkForExistingUser,
} from '../controllers/userController.js'

import { isLoggedIn, isAuthenticated } from '../controllers/authController.js'

const router = express.Router()

router.get('/', () => {})

router.route('/deleteAllModels').get(deleteAllModels)

router.post('/login', login)

router.get('/getCurrentUser', (req, res) => {
  res.status(200).json({
    user: req.user,
  })
})

router.post('/checkForExistingUser', checkForExistingUser)

export default router
