import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({ success: false, message: 'Not Authorized. Please log in again.' });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Check if the decoded email matches the admin email in the environment variables
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: 'Not Authorized. Please log in again.' });
    }

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

  

export default authAdmin;
