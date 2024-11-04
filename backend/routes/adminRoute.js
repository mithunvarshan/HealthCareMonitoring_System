import express from 'express';
import { addDoctor,allDoctors,loginAdmin } from '../controllers/adminController.js'; // Ensure the path is correct
import upload from '../middlewares/multer.js'; // Ensure the path is correct
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';
const adminRouter = express.Router();

// Route for adding a doctor with file upload
adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);

adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors',authAdmin, allDoctors);
adminRouter.post('/change-availability',authAdmin, changeAvailability);

export default adminRouter;
