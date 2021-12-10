import express from 'express'

import {
  getAuthenticatedUserFactory,
  getOneFactory,
  registerFactory,
} from '../controllers/handlerFactory.js'
import { isAuthenticated } from '../middleware/authMiddleware.js'
import { isStudent } from '../middleware/studentMiddleware.js'
import Student from '../models/StudentModel.js'

// import {register, getUserId, deleteUser} from '../controllers/userController'
// import { isLoggedIn, isAuthenticated } from '../controllers/authController.js'

const router = express.Router()

// get logged in user
router
  .route('/')
  .get(isAuthenticated, isStudent, getAuthenticatedUserFactory(Student))
  .post(registerFactory(Student))

// router.post('/', isLoggedIn, register);

// router.route('/google').post(registerFromGoogle)

// router.route('/deleteAllModels').get(deleteAllModels)

// router.use(isAuthenticated, getUserId)

export default router
