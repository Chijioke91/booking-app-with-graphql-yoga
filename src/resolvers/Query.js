const Query = {
  welcome() {
    return 'Welcome to the App';
  },
  async event(_, { id }, { models: { Event } }) {
    try {
      return Event.findById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async events(_, args, { models: { Event } }) {
    try {
      const events = await Event.find();

      return events.map((evt) => ({
        id: evt.id,
        ...evt._doc,
        date: new Date(evt.date).toISOString(),
      }));
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async users(parent, args, { models: { User } }) {
    try {
      const users = await User.find();
      return users;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async booking(_, { id }, { models: { Booking } }) {
    try {
      return Booking.findById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async bookings(parent, args, { models: { Booking } }) {
    try {
      return Booking.find();
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export default Query;
