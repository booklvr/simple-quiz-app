import express from 'express';
import {register, updateUser, deleteUser, getUserId} from '../controllers/userController.js'
// import {register, getUserId, deleteUser} from '../controllers/userController'
import {isLoggedIn, isAuthenticated} from '../controllers/authController.js';

const router = express.Router();

router.get('/', () => {
  console.log('fuck you')
})

// router.post('/', isLoggedIn, register);

router.post('/')

router.use(isAuthenticated, getUserId);

export default router;