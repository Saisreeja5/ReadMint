import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // make sure your file has `.js` if using ES6

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id); 
    console.log(user);// assuming you signed token with user._id

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Auth middleware error", error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
