import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams(); // Get the speciality from the route parameter
  const { doctors } = useContext(AppContext); // Get doctors data from context
  const [filterDoc, setFilterDoc] = useState([]); // State to store filtered doctors
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false); // State to toggle filters

  useEffect(() => {
    // Apply filter to set the filtered doctors based on the selected specialty
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors); // Show all doctors if no specialty is selected
    }
  }, [doctors, speciality]); // Only depends on doctors and speciality

  const handleNavigate = (spec) => {
    if (spec === '') {
      // If "All Doctors" is clicked, navigate to the base route without a specialty
      navigate('/doctors');
    } else {
      navigate(`/doctors/${encodeURIComponent(spec)}`);
    }
  };

  const toggleFilter = () => {
    setShowFilter(prev => {
      if (!prev) {
        // If the filter is being shown, reset the speciality to show all doctors
        navigate('/doctors'); // Navigate to show all doctors
      }
      return !prev;
    });
  };

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialties:</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        
        {/* Filters Button */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary' : ''}`}
          onClick={toggleFilter}
        >
          Filters
        </button>

        {/* Sidebar with Specialty Options */}
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} w-[94vw] sm:w-auto`}>
          <p
            onClick={() => handleNavigate('')}
            className={`pl-3 pr-10 py-1.5 border border-gray-300 rounded transition-all cursor-pointer w-full sm:w-auto
              ${!speciality ? 'text-black bg-indigo-100' : ''}`}
          >
            All Doctors
          </p>
          {['General_physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map(spec => (
            <p
              key={spec}
              onClick={() => handleNavigate(spec)}
              className={`pl-3 pr-10 py-1.5 border border-gray-300 rounded transition-all cursor-pointer w-full sm:w-auto
                ${speciality === spec ? 'text-black bg-indigo-100' : ''}`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6">
          {filterDoc.length > 0 ? (
            filterDoc.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border cursor-pointer rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <img className="bg-blue-50 w-full" src={item.image} alt={item.name} />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">No doctors found for this specialty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
