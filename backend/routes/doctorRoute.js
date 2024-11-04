import express from 'express';
import { doctorList } from '../controllers/doctorController.js'; // Correct path to your controller

const doctorRouter = express.Router();

// Define the route for getting the list of doctors
doctorRouter.get('/list', doctorList);

export default doctorRouter; // Export the router for use in your app
