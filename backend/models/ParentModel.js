import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import validator from 'validator'
import crypto from 'crypto'
import Classroom from './ClassroomModel.js'

const ParentSchema = new mongoose.Schema({
  accountType: {
    type: String,
    default: 'parent',
  },
  googleId: {
    type: String,
    select: true,
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
  },
  newUser: {
    type: Boolean,
    default: true,
  },
})

ParentSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

const Parent = mongoose.model('Parent', ParentSchema)
export default Parent

// export default mongoose.model('User', UserSchema)
