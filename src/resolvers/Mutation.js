const Mutation = {
  async createEvent(
    _,
    { data: { title, description, price, date } },
    { models: { Event, User } }
  ) {
    try {
      const newEvent = await Event.create({
        title,
        description,
        price,
        date,
        createdBy: '5fe9ef85fe4bd409548c5340',
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

      return {
        id: newUser.id,
        ...newUser._doc,
        password: null,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async bookEvent(parent, { eventId }, { models: { Booking } }) {
    try {
      return Booking.create({
        user: '5fe9ef85fe4bd409548c5340',
        event: eventId,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async cancelBooking(parent, { bookingId }, { models: { Booking, Event } }) {
    try {
      const booking = await Booking.findById(bookingId).populate('event');

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
