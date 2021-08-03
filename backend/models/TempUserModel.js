import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import validator from 'validator';
import crypto from 'crypto'
import Classroom from './ClassroomModel.js'

const TempUserSchema = new mongoose.Schema(
  {
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
    },
    newUser: {
      type: Boolean,
      default: true,
    },
  },
);






const TempUser = mongoose.model('TempUser', TempUserSchema)
export default TempUser;

// export default mongoose.model('User', UserSchema)

