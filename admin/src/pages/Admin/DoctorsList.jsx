import  { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors(); // Fetch all doctors if the token is available
        }
    }, [aToken]);

    return (
        <div className="p-5 max-h-[90vh] overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-5">All Doctors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {doctors.map((item, index) => (
                    <div 
                        key={index} 
                        className="border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white p-4 flex flex-col items-center text-center"
                    >
                        <img 
                            src={item.image || "default-doctor-image.jpg"} // Placeholder image if no image URL
                            alt={item.name}
                            className="w-24 h-24 rounded-full object-cover mb-3"
                        />
                        <p className="text-xl font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500 mb-2">{item.speciality}</p>
                        <div className="flex items-center gap-1 text-sm">
                            <input 
                                type="checkbox" 
                                checked={item.available} 
                                onChange={() => changeAvailability(item._id)}
                                className="cursor-pointer accent-indigo-600"
                            />
                            <p>Available</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
