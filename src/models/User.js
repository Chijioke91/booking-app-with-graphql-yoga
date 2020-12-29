import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  createdEvents: [{ type: ObjectId, ref: 'Event' }],
});

// hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// check for password match
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default model('User', UserSchema);
