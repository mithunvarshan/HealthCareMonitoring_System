import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: String,
    guardianName: String,
    disease: String,
    doctor: String,
    room: String,
    bed: String,
    // Other fields as needed
});

const patientModel =mongoose.model('Patient', patientSchema);
export default patientModel;