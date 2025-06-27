const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Access Denied');
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // attaches decoded user to req
    next();
  } catch {
    res.status(400).send('Invalid Token');
  }
};

module.exports = authMiddleware;
