import getUserId from '../utils/getUserId';

const Mutation = {
  async createEvent(
    _,
    { data: { title, description, price, date } },
    { models: { Event, User }, request }
  ) {
    const userId = getUserId(request);

    try {
      const newEvent = await Event.create({
        title,
        description,
        price,
        date,
        createdBy: userId,
      });

      const user = await User.findById(newEvent.createdBy);

      await user.createdEvents.push(newEvent);

      await user.save();

      return newEvent;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async createUser(_, { data: { email, password } }, { models: { User } }) {
    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        throw new Error('User already exists');
      }

      const newUser = await User.create({ email, password });

      const token = newUser.getAuthToken();

      return {
        user: {
          id: newUser.id,
          ...newUser._doc,
          password: null,
        },
        token,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async loginUser(_, { data: { email, password } }, { models: { User } }) {
    try {
      // check user
      let user = await User.findOne({ email }).select('+password');

      if (!user) {
        throw new Error('Invalid Credentials');
      }

      // check for password match
      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        throw new Error('Invalid Credentials');
      }

      const token = user.getAuthToken();

      return {
        user,
        token,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async bookEvent(parent, { eventId }, { models: { Booking }, request }) {
    const userId = getUserId(request);
    try {
      return Booking.create({
        user: userId,
        event: eventId,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async cancelBooking(parent, { bookingId }, { models: { Booking }, request }) {
    try {
      // const booking = await Booking.findById(bookingId).populate('event');

      const userId = getUserId(request);

      const booking = await Booking.findOne({
        _id: bookingId,
        user: userId,
      }).populate('event');

      if (!booking) {
        throw new Error('Unable to Cancel Booking: Check if it exists');
      }

      await booking.remove();

      return booking.event;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export default Mutation;
