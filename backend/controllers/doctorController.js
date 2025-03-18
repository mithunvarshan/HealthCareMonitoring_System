import doctorModel from "../models/doctorModel.js"; // Correct import path

// API to change the availability status of a doctor
const changeAvailability = async (req, res) => 
    {
    try {
        const { docId } = req.body; // Extract doctor ID from request body

        // Find the doctor by ID
        const docData = await doctorModel.findById(docId);
        if (!docData) {
            return res.json({ success: false, message: 'Doctor not found' }); // Check if doctor exists
        }

        // Update the availability status
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

        // Respond with success message
        res.json({ success: true, message: 'Availability Changed' });
    } catch (error) {
        console.log(error); // Log the error for debugging
        res.json({ success: false, message: error.message }); // Send error message in response
    }
};

const doctorList = async (req, res) => {
    try {
        // Fetch doctors while excluding password and email fields
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        
        // Respond with success and the list of doctors
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        // Respond with failure and the error message
        res.json({ success: false, message: error.message });
    }
};

export { changeAvailability,doctorList }; // Export the function
