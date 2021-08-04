import mongoose from 'mongoose'
// const Classroom = require('./classroomModel');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, 'Student must have a name'],
    },
    newUser: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      // required: [true, 'must list a student gender'], // remove later?
    },
    gamePoints: {
      type: Number,
      default: 0,
    },
    classPoints: {
      type: Number,
      default: 0,
    },
    accountType: {
      type: String,
      default: 'student',
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
