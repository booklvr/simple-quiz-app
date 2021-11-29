import express from 'express'
import {
  getAuthenticatedUserFactory,
  getOneFactory,
} from '../controllers/handlerFactory.js'
// import passport from 'passport'
import { isAuthenticated } from '../middleware/authMiddleware.js'
import { isTeacher } from '../middleware/teacherMiddleware.js'
import Teacher from '../models/TeacherModel.js'

// import {register, getUserId, deleteUser} from '../controllers/userController'
// import { isLoggedIn, isAuthenticated } from '../controllers/authController.js'

const router = express.Router()

// get logged in user
router
  .route('/')
  .get(isAuthenticated, isTeacher, getAuthenticatedUserFactory(Teacher))

// router.post('/', isLoggedIn, register);

// router.route('/google').post(registerFromGoogle)

// router.route('/deleteAllModels').get(deleteAllModels)

// router.use(isAuthenticated, getUserId)

export default router