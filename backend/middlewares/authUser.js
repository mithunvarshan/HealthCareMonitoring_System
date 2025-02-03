import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Please log in again.' });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; // Ensure userId is correctly assigned

    next(); 
  } catch (error) {
    console.error('JWT Verification Error:', error);
    res.status(403).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
  }
};

export default authUser;
