import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: 'Not Authorized. Please log in again.' });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId=token_decode.id;
    // Check if the decoded email matches the admin email in the environment variables
   

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

  

export default authUser;
