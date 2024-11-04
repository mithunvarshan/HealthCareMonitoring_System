// controllers/patientController.js
import PatientModel from '../models/patientModel.js';
import axios from 'axios';

// Fetch patient details along with heartbeat level and oxygen level from ThingSpeak
const getPatientsData = async (req, res) => {
    try {
        // Fetch patient details from MongoDB
        const patients = await PatientModel.find({});

        // Define your ThingSpeak Channel ID and API Key from your .env file
        const CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID;
        const API_KEY = process.env.THINGSPEAK_READ_API_KEY;

        // Fetch data from ThingSpeak for heartbeat level
        const heartbeatResponse = await axios.get(`https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/1.json?api_key=${API_KEY}&results=1`);
        const heartbeatData = heartbeatResponse.data.feeds; // Assuming field 1 is for heartbeat level

        // Fetch data from ThingSpeak for oxygen level
        const oxygenResponse = await axios.get(`https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/2.json?api_key=${API_KEY}&results=1`);
        const oxygenData = oxygenResponse.data.feeds; // Assuming field 2 is for oxygen level

        // Combine patient data with sensor data
        const combinedData = patients.map((patient, index) => {
            // Only provide heartbeat and oxygen level data for the first patient
            const heartbeatLevel = (index === 0 && heartbeatData.length > 0) ? heartbeatData[0]?.field1 : "N/A"; // Default to "N/A" for others
            const oxygenLevel = (index === 0 && oxygenData.length > 0) ? oxygenData[0]?.field2 : "N/A"; // Default to "N/A" for others
            
            return {
                ...patient._doc,
                heartbeatLevel,
                oxygenLevel,
            };
        });

        res.json({ success: true, data: combinedData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export { getPatientsData };
