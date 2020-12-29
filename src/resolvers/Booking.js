const Booking = {
  event(parent, args, { models: { Event } }) {
    try {
      return Event.findById(parent.event);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  user(parent, args, { models: { User } }) {
    try {
      return User.findById(parent.user);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  createdAt(parent) {
    return new Date(parent.createdAt).toISOString();
  },
  updatedAt(parent) {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Booking;
