import express from 'express'
import {
  getAuthenticatedUserFactory,
  getOneFactory,
  registerFactory,
} from '../controllers/handlerFactory.js'
// import passport from 'passport'
import { isAuthenticated } from '../middleware/authMiddleware.js'
import { isParent } from '../middleware/parentMiddleware.js'
import Parent from '../models/ParentModel.js'

// import {register, getUserId, deleteUser} from '../controllers/userController'
// import { isLoggedIn, isAuthenticated } from '../controllers/authController.js'

const router = express.Router()

// get logged in user
router
  .route('/')
  .get(isAuthenticated, isParent, getAuthenticatedUserFactory(Parent))
  .post(registerFactory(Parent))

// router.post('/', isLoggedIn, register);

// router.route('/google').post(registerFromGoogle)

// router.route('/deleteAllModels').get(deleteAllModels)

// router.use(isAuthenticated, getUserId)

export default router
