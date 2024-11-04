import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js"; // Fixed path
import jwt from 'jsonwebtoken';
// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body; // Make sure to destructure from req.body

    const imageFile = req.file; // Get the uploaded file

    // Check for all required fields
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hash the doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    // Prepare doctor data for saving
    const doctorData = {
      name,
      email,
      image: imageUrl, // Fixed variable name
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // Ensure this is a valid JSON string
      date: Date.now(),
    };

    // Create a new doctor instance and save it to the database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res.status(201).json({ success: true, message: "Doctor added successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to add doctor", error: error.message });
  }
};

const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Received Email:", email);
      console.log("Received Password:", password);
      console.log("Env Admin Email:", process.env.ADMIN_EMAIL);
      console.log("Env Admin Password:", process.env.ADMIN_PASSWORD);
  
      // Check if email and password match the ones in your environment variables
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(
          { email, password },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        return res.json({ success: true, token });
      } else {
        return res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
      const doctors = await doctorModel.find({}).select('-password');
      res.json({ success: true, doctors });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors };
