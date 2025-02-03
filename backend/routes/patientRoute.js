import express from 'express';
import { getPatientsData, addPatient } from '../controllers/patientController.js';

const patientRouter = express.Router();

patientRouter.get('/getPatientsData', getPatientsData);  // Get patient data
patientRouter.post('/addpatients', addPatient);      // Add patient with API keys

export default patientRouter;
