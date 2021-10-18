import express from 'express'
import passport from 'passport'
import {
  register,
  updateUser,
  deleteUser,
  getUserId,
  // registerFromGoogle,
  deleteAllModels,
} from '../controllers/userController.js'
// import {register, getUserId, deleteUser} from '../controllers/userController'
import { isLoggedIn, isAuthenticated } from '../controllers/authController.js'

const router = express.Router()

router.get('/', () => {})

// router.post('/', isLoggedIn, register);

// router.route('/google').post(registerFromGoogle)

router.route('/deleteAllModels').get(deleteAllModels)

router.use(isAuthenticated, getUserId)

export default router
