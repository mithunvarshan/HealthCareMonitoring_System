import PatientModel from '../models/patientModel.js';
import axios from 'axios';
import { io } from '../server.js';

// Function to add a new patient and notify clients
const addPatient = async (req, res) => {
    try {
        const { name, guardianName, disease, doctor, room, bed, thingSpeakChannelId, thingSpeakReadApiKey } = req.body;

        // Validate required fields
        if (!name || !guardianName || !disease || !doctor || !room || !bed || !thingSpeakChannelId || !thingSpeakReadApiKey) {
            return res.json({ success: false, message: "All fields, including ThingSpeak API keys, are required." });
        }

        // Create new patient entry
        const newPatient = new PatientModel({
            name,
            guardianName,
            disease,
            doctor,
            room,
            bed,
            thingSpeakChannelId,
            thingSpeakReadApiKey
        });

        await newPatient.save();

        // Notify all clients about the new patient
        io.emit("patientAdded", newPatient);

        res.json({ success: true, message: "Patient added successfully.", data: newPatient });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to add patient." });
    }
};

// Function to fetch and update sensor data
const updatePatientSensorData = async () => {
    try {
        const patients = await PatientModel.find({});
        let updatedPatients = [];

        await Promise.all(patients.map(async (patient) => {
            if (patient.thingSpeakChannelId && patient.thingSpeakReadApiKey) {
                try {
                    const heartbeatResponse = await axios.get(`https://api.thingspeak.com/channels/${patient.thingSpeakChannelId}/fields/1.json?api_key=${patient.thingSpeakReadApiKey}&results=1`);
                    const heartbeatLevel = heartbeatResponse.data.feeds.length > 0 ? heartbeatResponse.data.feeds[0].field1 : "N/A";

                    const oxygenResponse = await axios.get(`https://api.thingspeak.com/channels/${patient.thingSpeakChannelId}/fields/2.json?api_key=${patient.thingSpeakReadApiKey}&results=1`);
                    const oxygenLevel = oxygenResponse.data.feeds.length > 0 ? oxygenResponse.data.feeds[0].field2 : "N/A";

                    // Update database
                    const updatedPatient = await PatientModel.findByIdAndUpdate(patient._id, { heartbeatLevel, oxygenLevel }, { new: true });
                    updatedPatients.push(updatedPatient);
                } catch (error) {
                    console.error(`Error updating ThingSpeak data for ${patient.name}:`, error);
                }
            }
        }));

        // Emit updated data to all connected clients
        io.emit("patientDataUpdated", updatedPatients);
    } catch (error) {
        console.error("Error updating sensor data:", error);
    }
};

// Function to get all patients
const getPatientsData = async (req, res) => {
    try {
        const patients = await PatientModel.find({});
        res.json({ success: true, data: patients });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Schedule updates every minute
setInterval(updatePatientSensorData, 60 * 1000);

export { addPatient, getPatientsData, updatePatientSensorData };
