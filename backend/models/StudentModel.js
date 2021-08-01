import mongoose from 'mongoose'
// const Classroom = require('./classroomModel');

const studentSchema = new mongoose.Schema(
  {
    classroom: {
      type: mongoose.Schema.ObjectId, // from user schema logged in user
      required: [true, 'Student must belong to a class!'],
      ref: 'Classroom', // connect to userModel
    },
    name: {
      type: String,
      required: [true, 'Student must have a name'],
    },
    gender: {
      type: String,
      required: [true, 'must list a student gender'], // remove later?
    },
    gamePoints: {
      type: Number,
      default: 0,
    },
    classPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//CALCULATE AVERAGE GAME SCORE
// reviewSchema.statics.calcAverageGameScore = async function (classroomId) {
//   //
// };

//CALCULATE AVERAGE PARTICIPATION SCORE

export default mongoose.model('Student', studentSchema);


