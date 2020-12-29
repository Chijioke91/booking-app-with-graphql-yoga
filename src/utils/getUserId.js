import jwt from 'jsonwebtoken';

const getUserId = (request) => {
  const header = request.request.headers.authorization;

  if (header) {
    const token = header.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.id;
  }

  throw new Error('Authentication required');
};

export default getUserId;
