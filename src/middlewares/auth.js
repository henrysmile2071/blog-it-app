import jwt from 'jsonwebtoken';
import * as errors from '../utils/api-error.js';

const { UnauthorizedError } = errors.default;

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError();
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new UnauthorizedError(err.message);
    }
    req.user = user;
    next();
  });
};

export default authenticateJwt;
