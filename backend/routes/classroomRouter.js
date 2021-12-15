import express from 'express'
import {
  createClassroom,
  getAllClassrooms,
  getClassroom,
  getClassroomBySlug,
  uniqueClassroomName,
  verifyInviteCode,
} from '../controllers/classroomController.js'
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

router.post('/verify-invite-code', verifyInviteCode)

// get logged in user
router
  .route('/')
  .get(isAuthenticated, isTeacher, getAllClassrooms)
  .post(isAuthenticated, isTeacher, uniqueClassroomName, createClassroom)

router.route('/:slug').get(isAuthenticated, isTeacher, getClassroomBySlug)

// router.post('/', isLoggedIn, register);

// router.use(isAuthenticated, getUserId)

export default router
