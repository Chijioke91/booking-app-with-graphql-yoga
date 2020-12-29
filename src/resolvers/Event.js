const Event = {
  createdBy(parent, args, { models: { User } }) {
    try {
      return User.findById(parent.createdBy);
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export default Event;
