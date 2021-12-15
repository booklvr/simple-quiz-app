import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import validator from 'validator'
import crypto from 'crypto'
import Classroom from './ClassroomModel.js'

const TeacherSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      default: 'teacher',
    },
    googleId: {
      type: String,
      select: false,
    },
    familyName: {
      type: String,
    },
    givenName: {
      type: String,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide an email'],
    },

    salt: {
      type: String,
      select: false,
    },
    hash: {
      type: String,
      select: false,
    },
    passwordResetToken: String,
    passwordChangedAt: Date,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
)

TeacherSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

TeacherSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

TeacherSchema.virtual('classrooms', {
  ref: 'Classroom',
  localField: '_id',
  foreignField: 'teacher',
})

TeacherSchema.virtual('students', {
  ref: 'Student', // reference Classroom Model,
  localField: '_id', // local property that is same as foreign field (user _id);
  foreignField: 'teacher', // name of thing on Classroom model that creates relationship (user.id);
})

TeacherSchema.post('findOneAndDelete', async function (user) {
  if (user) {
    const classrooms = await Classroom.find({ teacher: user._id })

    await Promise.all(
      classrooms.map(async (classroom) => {
        const deletedClassroom = await Classroom.findByIdAndDelete(
          classroom._id
        )
      })
    )
  }
})

const Teacher = mongoose.model('Teacher', TeacherSchema)
export default Teacher

// export default mongoose.model('User', UserSchema)
