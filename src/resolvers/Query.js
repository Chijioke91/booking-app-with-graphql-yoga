const Query = {
  welcome() {
    return 'Welcome to the App';
  },
  events(_, args, { db }) {
    return db;
  },
};

export default Query;
