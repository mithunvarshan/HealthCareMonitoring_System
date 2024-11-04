import bcrypt from 'bcrypt';
import validator from 'validator'; // Make sure to import the validator library
import jwt from 'jsonwebtoken'; // Import JWT for token generation
import UserModel from '../models/UserModel.js';
import cloudinary from 'cloudinary'; 

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for missing details
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        // Validate strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user data
        const userData = {
            name,
            email,
            password: hashedPassword
        };

        // Save the user data to the database
        const newUser = new UserModel(userData);
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expiration can be adjusted

        // Respond with success message and token
        return res.json({ success: true, token });

    } catch (error) {
        console.error(error); // Log error for debugging
        return res.json({ success: false, message: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        // Compare provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // Check if the password matches
        if (isMatch) {
            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.json({ success: false, message: error.message });
    }
};
//to get user profile
const getProfile = async (req, res) => {

    try {
    
    const { userId } = req.body
    const userData = await UserModel. findById(userId).select('-password')
    
    res. json({success:true, userData})
    
    } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
    }}
    const updateProfile = async (req, res) => {
        try {
          const { userId, name, phone, address, dob, gender } = req.body;
          const imageFile = req.file; // Assuming you're using multer for file uploads
      
          // Check for required fields
          if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
          }
      
          // Parse the address from JSON
          const parsedAddress = JSON.parse(address);
      
          // Update user profile details in the database
          await UserModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: parsedAddress,
            dob,
            gender,
          });
      
          // Check if an image file was uploaded
          if (imageFile) {
            // Upload image to Cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'auto' });
            const imageURL = imageUpload.secure_url;
      
            // Update the user's image URL in the database
            await UserModel.findByIdAndUpdate(userId, { image: imageURL });
          }
      
          res.json({ success: true, message: "Profile Updated" });
        } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
        }
      };
export { registerUser,loginUser,getProfile,updateProfile };
