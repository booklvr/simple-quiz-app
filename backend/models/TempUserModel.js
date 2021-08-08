import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import validator from 'validator'
import crypto from 'crypto'
import Classroom from './ClassroomModel.js'

const TempUserSchema = new mongoose.Schema({
  accountType: {
    type: String,
    default: 'temp'
  },
  googleId: {
    type: String,
    select: true,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  newUser: {
    type: Boolean,
    default: true,
  },

})

const TempUser = mongoose.model('TempUser', TempUserSchema)
export default TempUser

// export default mongoose.model('User', UserSchema)
