import express from 'express';
import { bookAppointment, cancelAppointment, getAppointments, getProfile, loginUser, paymentRazorpay, registerUser, updateAppointmentStatus, updateProfile } from '../controllers/userController.js'; // Adjust the path accordingly
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js'; 

const userRouter = express.Router();

// Register user route
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser,getProfile);
userRouter.post('/update-profile', upload.single('image'),authUser,updateProfile);
userRouter.post('/book-appointment',authUser,bookAppointment);
userRouter.get('/get-appointments', authUser, getAppointments);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/payment-razorpay', authUser,paymentRazorpay);
userRouter.post('/update-status', authUser,updateAppointmentStatus);

export default userRouter;
