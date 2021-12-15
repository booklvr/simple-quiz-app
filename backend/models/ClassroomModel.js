import mongoose from 'mongoose'
import slugify from 'slugify'
import Student from './StudentModel.js'
import { customAlphabet } from 'nanoid'

// CREATE CLASSROOM SCHEMA
const classroomSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId, // from user schema logged in user
      ref: 'User', // connect to user model
    },
    className: {
      type: String,
      trim: true,
      required: true,
    },
    inviteCode: {
      type: String,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
)

classroomSchema.virtual('students', {
  ref: 'Student', // reference Classroom Model,
  localField: '_id', // local property that is same as foreign field (user _id);
  foreignField: 'classroom', // name of thing on Classroom model that creates relationship (user.id);
})

classroomSchema.pre(/^find/, function (next) {
  // populate students when finding classroom
  this.populate({ path: 'students' })

  next()
})

classroomSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'students',
  })
  next()
})

// create a slug for tour names
classroomSchema.pre('save', function (next) {
  this.slug = slugify(this.className, { lower: true })
  next()
})

classroomSchema.pre('save', function (next) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const nanoid = customAlphabet(alphabet, 6)
  this.inviteCode = nanoid()
  next()
})

classroomSchema.post('findOneAndDelete', async function (classroom) {
  if (classroom) {
    const deleteResults = await Student.deleteMany({
      classroom: classroom._id,
    })

    console.log('Student delete results', deleteResults)
  }
})

export default mongoose.model('Classroom', classroomSchema)
