import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddPatient = () => {
    const [patientData, setPatientData] = useState({
        name: '',
        guardianName: '',
        disease: '',
        doctor: '',
        room: '',
        bed: '',
        thingSpeakChannelId: '',
        thingSpeakReadApiKey: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/addpatients', patientData);
            if (response.data.success) {
                setMessage('Patient added successfully.');
                toast.success(response.data.message);
            } else {
                setMessage(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding patient:', error);
            setMessage('Failed to add patient.');
            toast.error('An error occurred while adding the patient.');
        }
    };

    return (
        <form className='m-5 w-full' onSubmit={handleSubmit}>
            <p className='mb-3 text-lg font-medium'>Add Patient</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-auto text-gray-500'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Patient Name Section */}
                    <div>
                        <p>Patient Name</p>
                        <input
                            className='border rounded px-3 py-2 w-full'
                            type="text"
                            name="name"
                            value={patientData.name}
                            onChange={handleChange}
                            placeholder='Patient Name'
                            required
                        />
                    </div>

                    {/* Guardian Name Section */}
                    <div>
                        <p>Guardian Name</p>
                        <input
                            className='border rounded px-3 py-2 w-full'
                            type="text"
                            name="guardianName"
                            value={patientData.guardianName}
                            onChange={handleChange}
                            placeholder='Guardian Name'
                            required
                        />
                    </div>

                    {/* Disease Section */}
                    <div>
                        <p>Disease</p>
                        <input
                            className='border rounded px-3 py-2 w-full'
                            type="text"
                            name="disease"
                            value={patientData.disease}
                            onChange={handleChange}
                            placeholder='Disease'
                            required
                        />
                    </div>

                    {/* Doctor Section */}
                    <div>
                        <p>Doctor</p>
                        <input
                            className='border rounded px-3 py-2 w-full'
                            type="text"
                            name="doctor"
                            value={patientData.doctor}
                            onChange={handleChange}
                            placeholder='Doctor'
                            required
                        />
                    </div>

                    {/* Room Section */}
                    <div>
                        <p>Room</p>
                        <input
                            className='border rounded px-3 py-2 w-full'
                            type="text"
                            name="room"
                            value={patientData.room}
                            onChange={handleChange}
                            placeholder='Room'
                            required
                        />
                    </div>

                    {/* Bed Section */}
                    <div>
                        <p>Bed</p>
                        <input
                            className='border rounded px-3 py-2 w-full'
                            type="text"
                            name="bed"
                            value={patientData.bed}
                            onChange={handleChange}
                            placeholder='Bed'
                            required
                        />
                    </div>

                    {/* ThingSpeak Channel ID Section */}
                    <div>
                        <p>ThingSpeak Channel ID</p>
                        <input
                            className='border rounded px-3 py-2 w-full'
                            type="text"
                            name="thingSpeakChannelId"
                            value={patientData.thingSpeakChannelId}
                            onChange={handleChange}
                            placeholder='ThingSpeak Channel ID'
                            required
                        />
                    </div>

                    {/* ThingSpeak API Key Section */}
                    <div>
                        <p>ThingSpeak Read API Key</p>
                        <input
                            className='border rounded px-3 py-2 w-full'
                            type="text"
                            name="thingSpeakReadApiKey"
                            value={patientData.thingSpeakReadApiKey}
                            onChange={handleChange}
                            placeholder='ThingSpeak Read API Key'
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Add Patient</button>

            {/* Message */}
            {message && <p className='mt-4 text-center text-green-600'>{message}</p>}
        </form>
    );
};

export default AddPatient;
