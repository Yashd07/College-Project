import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
