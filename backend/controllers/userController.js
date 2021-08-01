import validator from 'validator'
import User from '../models/UserModel.js'
import Token from '../models/VerificationModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {getAllFactory, getOneFactory, deleteOneFactory, updateOneFactory } from './handlerFactory.js'


export const register = catchAsync(async (req, res, next) => {
  const { displayName, email, password, passwordConfirm } = req.body;

  // ERROR HANDLING
  // * missing fields
  if (!displayName || !email || !password || !passwordConfirm) {
    return next(new AppError('Please fill in all fields', 400));
  }

  if (!validator.isLength(displayName, { min: 4, max: 16 })) {
    return next(
      new AppError('display name must be between 4 and 16 characters', 400)
    );
  }

  if (!validator.isEmail(email)) {
    return next(new AppError('must provide a valid email address', 400));
  }

  if (!validator.isLength(password, { min: 8, max: undefined })) {
    return next(new AppError('password must be at least 8 characters', 400));
  }

  // * passwords do not match
  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 401));
  }

  // CREATE NEW USER
  const user = await new User({
    displayName,
    email,
  });

  // TO DO add ERROR HANDLING HERE

  User.register(user, password, async (err) => {
    if (err) {
      console.log(err);

      return next(new AppError(err.message, 500));
    }

    passport.authenticate('local')(req, res, function () {
      // req.flash("success", "successfully signed up! nice to meet you " + req.body.username);
      // res.redirect('../../../../lessons')
      res.status(200).json({
        status: 'success',
        message: 'User Registered Successfully',
        data: {
          user: req.user,
        },
      });
    });
  })
})

export const getUserId = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const getAllUsers = getAllFactory(User);
export const getUser = getOneFactory(User);
export const updateUser = updateOneFactory(User);
export const deleteUser = deleteOneFactory(User);
