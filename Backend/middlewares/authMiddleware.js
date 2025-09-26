const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  // 1. Get token from the header
  const token = req.header('x-auth-token');

  // 2. Check if no token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. If there is a token, verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Add the user's info from the token's payload to the request object
    req.user = decoded.user;
    
    // 5. Call the next function in the chain (the actual route controller)
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
