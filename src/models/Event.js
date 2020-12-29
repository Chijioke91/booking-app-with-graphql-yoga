import { model, Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const EventSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  createdBy: { type: ObjectId, ref: 'User' },
});

export default model('Event', EventSchema);
