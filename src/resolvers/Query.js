import formatDate from '../utils/formatDate';
import getUserId from '../utils/getUserId';

const Query = {
  welcome() {
    return 'Welcome to the App';
  },

  async me(_, args, { models: { User }, request }) {
    try {
      const userId = getUserId(request);

      return User.findById(userId);
    } catch (e) {
      throw new Error(e.message);
    }
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
        date: formatDate(evt.date),
      }));
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async users(parent, args, { models: { User }, request }) {
    const userId = getUserId(request);

    console.log(userId);
    try {
      return User.find();
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
