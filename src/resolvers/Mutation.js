const Mutation = {
  createEvent(_, { data: { title, description, price, date } }, { db }) {
    const newEvent = {
      id: Math.random().toString(),
      title,
      description,
      price,
      date,
    };

    db.push(newEvent);

    return newEvent;
  },
};

export default Mutation;
