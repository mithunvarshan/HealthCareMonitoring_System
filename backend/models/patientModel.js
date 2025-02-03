import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: String,
    guardianName: String,
    disease: String,
    doctor: String,
    room: String,
    bed: String,
    thingSpeakChannelId: String, // Store ThingSpeak Channel ID
    thingSpeakReadApiKey: String,
    heartbeatLevel: { type: String, default: "N/A" },
    oxygenLevel: { type: String, default: "N/A" } // Store ThingSpeak Read API Key
});

const PatientModel = mongoose.model('Patient', patientSchema);
export default PatientModel;
