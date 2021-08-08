import mongoose from 'mongoose'
import validator from 'validator'
// const Classroom = require('./classroomModel');

const studentSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      default: 'student',
    },
    name: {
      type: String,
      // required: [true, 'Student must have a name'],
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

//CALCULATE AVERAGE GAME SCORE
// reviewSchema.statics.calcAverageGameScore = async function (classroomId) {
//   //
// };

//CALCULATE AVERAGE PARTICIPATION SCORE

export default mongoose.model('Student', studentSchema)
