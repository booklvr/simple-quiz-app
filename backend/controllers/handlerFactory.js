import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import APIFeatures from '../utils/apiFeatures.js'
import passport from 'passport'

export const registerFactory = (Model) =>
  catchAsync(async (req, res, next) => {
    const { email, password, givenName, familyName, accountType, ...rest } =
      req.body

    const newUserData = {
      accountType,
      givenName,
      familyName,
      email,
      password,
      displayName: `${givenName} ${familyName}`,
    }

    if (accountType === 'student') {
      // Object.assign(newUserData, { ...rest })
      Object.assign(
        newUserData,
        { dateOfBirth: 'nov 20 1988' },
        { classroomID: 1234568 }
      )
    }

    const user = await new Model(newUserData)

    Model.register(user, password, async (err) => {
      if (err) {
        console.log(err)

        return next(new AppError(err.message, 500))
      }

      // return to frontend newUserAction
      /*
        {
          status: 'success',
          message: *accountType* registered successfully
          user: {
            accountType,
            givenName,
            familyName,
            displayName,
            email,
            newUser: true,
            hash,
            salt,
            createdAt,
            updatedAt,
          }
        }
      */
      passport.authenticate(`${accountType}Local`)(req, res, () => {
        console.log('trying to authenticate user through email')
        res.status(200).json({
          status: 'success',
          message: `${accountType} registered successfully`,
          user: req.user,
        })
      })
    })
  })

export const getAllFactory = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {
      // only return classrooms and students of user
      owner: req.user._id,
    }

    // if (req.params.classroom) filter = { classroom: req.params.classroom };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const doc = await features.query

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    })
  })

export const getOneFactory = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id)
    if (popOptions) query = query.populate(popOptions)
    const doc = await query

    if (!doc) {
      return next(new AppError('No document found with that Id', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

export const getAuthenticatedUserFactory = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.user._id)
    if (popOptions) query = query.populate(popOptions)
    const user = await query

    if (!user) {
      return next(new AppError('No document found with that Id', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'successfully received teacher credentials',
      user,
    })
  })

export const createOneFactory = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

export const updateOneFactory = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    })
  })

export const deleteOneFactory = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: null,
    })
  })
