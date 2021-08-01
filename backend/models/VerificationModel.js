
import mongoose from 'mongoose';
import crypto from 'crypto'

// CREATE verificationToken SCHEMA
const verificationSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

verificationSchema.methods.createVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString('hex');

  this.token = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  console.log('verificationToken', verificationToken);

  return verificationToken;
};

export default mongoose.model('verification', verificationSchema);

