import formatDate from '../utils/formatDate';

const User = {
  async createdEvents(parent, args, { models: { Event } }) {
    return Event.find({ createdBy: parent.id });
  },
};

export default User;
