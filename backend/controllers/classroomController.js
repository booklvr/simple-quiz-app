// const passport = require('passport');
import Classroom from '../models/ClassroomModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import * as factory from './handlerFactory.js'

// export const setClassroomOwnerId = (req, res, next) => {
//   // get user from isLoggedIn middleware
//   if (!req.body.owner) req.body.owner = req.user._id
//   next()
// }

export const verifyInviteCode = catchAsync(async (req, res, next) => {
  // get user from isLoggedIn middleware


  if (!req.body.inviteCode) {
    return next(new AppError('could not verify code', 404))
  }

  const classroom = await Classroom.findOne({ inviteCode: req.body.inviteCode })

  if (!classroom) {
    return next(new AppError('could not verify code', 404))
  }

  return res.status(200).json({
    verified: true,
  })
})

export const getClassroomIdFromInviteCode = catchAsync(async () => {
  const { inviteCode } = req.body
})

export const uniqueClassroomName = catchAsync(async (req, res, next) => {
  console.log('checking for unique classroom name per teacher')

  const classroom = await Classroom.findOne({
    teacher: req.user._id,
    className: req.body.className,
  })
  if (classroom) {
    return next(
      new AppError('You already have a classroom with this name', 409)
    )
  }

  // if (classroom) {
  //   return res.status(409).json({
  //     status: 'fail',
  //     message: 'you already have a classroom with this name',
  //     error: 'you already have a classroom with this name',
  //   })
  // }
  next()
})

export const getAllClassrooms = factory.getAllFactory(Classroom)
export const getClassroom = factory.getOneFactory(Classroom, {
  path: 'students',
})
export const createClassroom = factory.createOneFactory(Classroom)
export const updateClassroom = factory.updateOneFactory(Classroom)
export const deleteClassroom = factory.deleteOneFactory(Classroom)
export const getClassroomBySlug = catchAsync(async (req, res, next) => {

  const classroom = await Classroom.findOne({
    teacher: req.user._id,
    slug: req.params.slug,
  })

  if (!classroom) {
    return next(new AppError('Classroom not found', 404))
  }


  res.status(200).json({
    status: 'success',
    message: 'successfully return classroom',
    classroom,
  })
})
