import bcrypt from 'bcrypt';
import validator from 'validator'; // Make sure to import the validator library
import jwt from 'jsonwebtoken'; // Import JWT for token generation
import UserModel from '../models/UserModel.js';
import cloudinary from 'cloudinary'; 
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from "../models/doctorModel.js";
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import crypto from 'crypto';


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
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
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
        const { userId } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "User ID is missing" });
        }

        const userData = await UserModel.findById(userId).select('-password');

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

    const updateProfile = async (req, res) => {
        try {
            const { userId, name, phone, address, dob, gender } = req.body;
            const imageFile = req.file; // Assuming multer is handling file uploads
    
            // Validate required fields
            if (!name || !phone || !dob || !gender) {
                return res.json({ success: false, message: "Data Missing" });
            }
    
            // Ensure address is parsed only if it's a string
            let parsedAddress = address;
            if (typeof address === "string") {
                try {
                    parsedAddress = JSON.parse(address);
                } catch (error) {
                    return res.json({ success: false, message: "Invalid address format" });
                }
            }
    
            // Update user details
            await UserModel.findByIdAndUpdate(userId, {
                name,
                phone,
                address: parsedAddress,
                dob,
                gender,
            });
    
            // Handle image upload if provided
            if (imageFile) {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'auto' });
                const imageURL = imageUpload.secure_url;
                await UserModel.findByIdAndUpdate(userId, { image: imageURL });
            }
    
            res.json({ success: true, message: "Profile Updated" });
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message });
        }
    };
    const bookAppointment = async (req, res) => {
        try {
            const { userId, slotDate, slotTime, docId } = req.body;
            const mongooseDocId = new mongoose.Types.ObjectId(docId);
    
            // Validate docId format
            if (!mongoose.Types.ObjectId.isValid(mongooseDocId)) {
                return res.status(400).json({ success: false, message: 'Invalid Doctor ID format' });
            }
    
            console.log("Received docId:", mongooseDocId);
    
            // Fetch doctor data
            const docData = await doctorModel.findById(mongooseDocId).select('-password');
            console.log("Doctor data:", docData);
    
            if (!docData) {
                return res.status(404).json({ success: false, message: 'Doctor not found' });
            }
    
            // If doctor is not available, return a 404 error instead of 400
            if (!docData.available) {
                return res.status(404).json({ success: false, message: 'Doctor not available' });
            }
    
            // Fetch user's data
            const userData = await UserModel.findById(userId).select('-password');
            if (!userData) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
    
            // Check for slot availability
            let slotsBooked = docData.slots_booked || {};
    
            if (slotsBooked[slotDate]) {
                if (slotsBooked[slotDate].includes(slotTime)) {
                    return res.status(400).json({ success: false, message: 'Slot not available' });
                } else {
                    slotsBooked[slotDate].push(slotTime);
                }
            } else {
                slotsBooked[slotDate] = [slotTime];
            }
    
            // Log updated slots to verify
            console.log("Updated slots_booked:", slotsBooked);
    
            // Update doctor's slots_booked using findOneAndUpdate
            await doctorModel.findOneAndUpdate(
                { _id: mongooseDocId },
                { $set: { slots_booked: slotsBooked } },
                { new: true }  // Return the updated document
            );
    
            // Prepare appointment data
            const appointmentData = {
                userId,
                docId: mongooseDocId,
                userData,
                docData,
                amount: docData.fees, // Assuming `fees` field in doctor data
                slotTime,
                slotDate,
                date: Date.now(),
                expiresAt: Date.now() + 60 * 60 * 1000, // Set expiration time to 1 hour after the appointment time
            };
    
            // Create a new appointment
            const newAppointment = new appointmentModel(appointmentData);
            await newAppointment.save();
    
            // Respond with success message
            res.status(200).json({
                success: true,
                message: 'Appointment booked successfully',
                appointment: newAppointment,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'An error occurred while booking the appointment' });
        }
    };
    
      const getAppointments = async (req, res) => {
        try {
            // Extract the token from the Authorization header
            const token = req.headers.authorization?.split(' ')[1]; // 'Bearer <token>'
    
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }
    
            // Verify and decode the token to get the userId
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            if (!decoded || !decoded.id) {
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
    
            const userId = decoded.id; // Extracted from the token
    
            // Fetch appointments for the logged-in user
            const appointments = await appointmentModel.find({ userId })
                .populate('docId', 'name image speciality address'); // Populate doctor details
    
            // If no appointments found, return a message
            if (!appointments.length) {
                return res.status(404).json({ success: false, message: 'No appointments found' });
            }
    
            // Return appointments in the response
            res.json({ success: true, appointments });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    };
    export const cancelAppointment = async (req, res) => {
        try {
            const { appointmentId } = req.body; // The ID of the appointment to cancel
    
            // Check if the appointment exists
            const appointment = await appointmentModel.findById(appointmentId);
            if (!appointment) {
                return res.status(404).json({ success: false, message: 'Appointment not found' });
            }
    
            // Fetch doctor data based on the docId of the appointment
            const doctor = await doctorModel.findById(appointment.docId);
            if (!doctor) {
                return res.status(404).json({ success: false, message: 'Doctor not found' });
            }
    
            console.log('Doctor before update:', doctor);
    
            // Check if the canceled appointment's slot exists in the doctor's booked slots
            if (doctor.slots_booked[appointment.slotDate]) {
                const slotIndex = doctor.slots_booked[appointment.slotDate].indexOf(appointment.slotTime);
                if (slotIndex !== -1) {
                    // Remove the slot from the doctor's slots_booked
                    doctor.slots_booked[appointment.slotDate].splice(slotIndex, 1);
    
                    // If no slots are left for that date, remove the date entry
                    if (doctor.slots_booked[appointment.slotDate].length === 0) {
                        delete doctor.slots_booked[appointment.slotDate];
                    }
    
                    // Update the doctor's slots_booked field in the database
                    await doctorModel.findByIdAndUpdate(
                        appointment.docId,
                        { $set: { slots_booked: doctor.slots_booked } },
                        { new: true }
                    );
                    console.log('Doctor after update:', doctor);
                }
            }
    
            // Delete the appointment from the appointments collection
            await appointmentModel.findByIdAndDelete(appointmentId);
    
            return res.status(200).json({ success: true, message: 'Appointment canceled successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    };
    const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      }); // Initialize Razorpay instance
      const paymentRazorpay = async (req, res) => {
        const { appointmentId } = req.body;
      
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
          return res.json({ success: false, message: "Invalid appointment ID format" });
        }
      
        try {
          const appointmentData = await appointmentModel.findById(appointmentId);
      
          if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found" });
          }
      
          const options = {
            amount: appointmentData.amount * 100, // Amount in paise
            currency: process.env.CURRENCY,
            receipt: appointmentId.toString(),
          };
      
          const order = await razorpayInstance.orders.create(options);
      
          return res.json({ success: true, order });
      
        } catch (err) {
          console.error(err);
          return res.json({ success: false, message: 'Error creating Razorpay order' });
        }
      };
      
      // Updating Appointment Status
      const updateAppointmentStatus = async (req, res) => {
        try {
          const { appointmentId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
      
          console.log("Received Data:", { appointmentId, razorpayPaymentId, razorpayOrderId, razorpaySignature });
      
          // Creating HMAC SHA256 Signature
          const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpayOrderId + "|" + razorpayPaymentId)
            .digest("hex");
      
          
          console.log("Generated Signature:", generatedSignature);
console.log("Received Signature:", razorpaySignature);
      
          if (generatedSignature !== razorpaySignature) {
            return res.status(400).json({ success: false, message: "Payment validation failed" });
          }
      
          // Find the appointment
          const appointment = await appointmentModel.findById(appointmentId);
          if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
          }
      
          console.log("Before Update:", appointment);
      
          // Update the appointment status
          appointment.status = "Booked";
          appointment.payment = true;
      
          await appointment.save();
      
          console.log("After Update:", appointment);
      
          res.status(200).json({ success: true, message: "Appointment booked successfully" });
        } catch (err) {
          console.error("Error in updateAppointmentStatus:", err);
          res.status(500).json({ success: false, message: "Internal Server Error" });
        }
      };
export { registerUser,loginUser,getProfile,updateProfile ,bookAppointment,getAppointments,paymentRazorpay,updateAppointmentStatus };
