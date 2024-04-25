import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig.mjs';
import { hasUserAccessByRole } from '../helpers/authHelper.mjs';

const authMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { JWT_SECRET_KEY } = envConfig();
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const hasAccess = hasUserAccessByRole(token, roles);
    if (!hasAccess) {
      return res.status(403);
    }

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
      // Store user information for later use in route handlers
      req.user = decodedToken.user;
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

export default authMiddleware;
