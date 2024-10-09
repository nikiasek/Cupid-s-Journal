const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1m'
    });
};
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');
  
    try {
      const verified = await verifyToken(token);
      req.user = verified;
      next();
    } catch (err) {
      res.status(401).send('Invalid token');
    }
  };

module.exports = { generateToken, verifyToken, authenticate };