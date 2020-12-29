import { model, Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const BookingSchema = new Schema(
  {
    event: { type: ObjectId, ref: 'Event' },
    user: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default model('Booking', BookingSchema);
