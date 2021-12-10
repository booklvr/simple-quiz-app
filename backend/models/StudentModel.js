import mongoose from 'mongoose'
import validator from 'validator'
import passportLocalMongoose from 'passport-local-mongoose'
// const Classroom = require('./classroomModel');

const StudentSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      default: 'student',
    },
    familyName: {
      type: String,
    },
    givenName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    // classroomID: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Classroom',
    // },
    classroomID: {
      type: Number,
    },
    googleId: {
      type: String,
      select: false,
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
    newUser: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      // required: [true, 'must list a student gender'], // remove later?
    },
  },
  { timestamps: true }
)

StudentSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

//CALCULATE AVERAGE GAME SCORE
// reviewSchema.statics.calcAverageGameScore = async function (classroomId) {
//   //
// };

//CALCULATE AVERAGE PARTICIPATION SCORE

export default mongoose.model('Student', StudentSchema)
