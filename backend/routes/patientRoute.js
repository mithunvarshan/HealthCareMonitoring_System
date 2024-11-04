// routes/api.js
import express from 'express';
import { getPatientsData } from '../controllers/patientController.js';

const patientRouter = express.Router();

// Route to get patient data
patientRouter.get('/patients', getPatientsData);

export default patientRouter;
