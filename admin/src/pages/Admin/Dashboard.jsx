import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const [lastAlertedPatients, setLastAlertedPatients] = useState(new Set());

    // Function to fetch patient data
    const fetchPatientsData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/patients');
            setPatients(response.data.data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Function to play alert sound
    const playAlertSound = () => {
        const audio = new Audio('/alert-sound.mp3');
        audio.play().catch((err) => console.error("Error playing sound:", err));
    };

    // Fetch patients on component mount
    useEffect(() => {
        fetchPatientsData();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Patient Dashboard</h1>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Name</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Guardian Name</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Disease</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Doctor</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Room</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Bed</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Heartbeat Level</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Oxygen Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => {
                            const isCritical = patient.heartbeatLevel < 70 || patient.oxygenLevel < 90;

                            // Check for critical conditions and whether we've already alerted for this patient
                            if (isCritical && !lastAlertedPatients.has(patient._id)) {
                                playAlertSound(); // Play alert sound
                                lastAlertedPatients.add(patient._id);
                                setLastAlertedPatients(new Set(lastAlertedPatients)); // Update state to trigger re-render
                            }

                            return (
                                <tr key={index} className={`hover:bg-gray-50 transition duration-200 ${isCritical ? 'bg-red-100' : ''}`}>
                                    <td className="py-4 px-6 border-b border-gray-200">{patient.name}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{patient.guardianName}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{patient.disease}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{patient.doctor}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{patient.room}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{patient.bed}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{patient.heartbeatLevel}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{patient.oxygenLevel}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
