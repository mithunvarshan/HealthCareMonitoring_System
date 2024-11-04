import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '/src/assets/assets_frontend/assets';
import RelatedDoctors from '../../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const fetchDocInfo = () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // Adjust today's slots based on current time
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(today.getHours() + (today.getMinutes() > 30 ? 1 : 0));
        currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      if (timeSlots.length > 0) {
        setDocSlots(prev => [...prev, timeSlots]);
      }
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const handleBookAppointment = () => {
    // You can add logic to handle booking the appointment, e.g., API call
    alert(`Appointment booked on ${docSlots[selectedDateIndex][0].datetime.toLocaleDateString()} at ${selectedTimeSlot}`);
  };

  const handleDateSelect = (index) => {
    setSelectedDateIndex(index);
    setSelectedTimeSlot(''); // Clear previously selected time slot
  };

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
        </div>
        
        <div className='flex-1 border border-gray-400 rounded-lg p-8 bg-white'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="Verified" />
          </p>
          <p className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            {docInfo.degree} - {docInfo.speciality}
          </p>
          <p className='text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4'>
        <p className='text-gray-700 font-medium'>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 && docSlots.map((item, index) => {
            const isToday = new Date().getDate() === item[0].datetime.getDate() &&
                            new Date().getMonth() === item[0].datetime.getMonth() &&
                            new Date().getFullYear() === item[0].datetime.getFullYear();
            
            const isSelected = selectedDateIndex === index; // Check if this date is selected
            
            return (
              <div
                key={index}
                onClick={() => handleDateSelect(isSelected ? null : index)} // Toggle selection
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer border border-gray-300 ${isSelected ? 'bg-indigo-200 text-white' : 'hover:bg-indigo-100'} ${isToday ? 'bg-indigo-200' : ''}`}
              >
                <p className='text-gray-900'>
                  {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p className='text-gray-600'>
                  {item[0] && item[0].datetime.getDate()} {isToday && <span className="text-green-500">(Today)</span>}
                </p>
              </div>
            );
          })}
        </div>

        {/* Show timings for the selected date */}
        {selectedDateIndex !== null && (
          <div className='mt-4'>
            <p className='text-gray-700 font-medium'>Available Timings</p>
            <div className='flex gap-3 items-center overflow-x-scroll mt-2'>
              {docSlots[selectedDateIndex].map((slot, index) => (
                <p
                  key={index}
                  onClick={() => setSelectedTimeSlot(slot.time)} // Set selected time slot
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border border-gray-300 hover:bg-indigo-100 ${selectedTimeSlot === slot.time ? 'bg-indigo-200 text-white' : ''}`}
                >
                  {slot.time.toLowerCase()}
                </p>
              ))}
            </div>

            {/* Book Appointment Button */}
            <button 
              onClick={handleBookAppointment} 
              className='mt-8 ml-6 px-12 py-2 bg-blue-600 text-white rounded-2xl hover:bg-indigo-200'
              disabled={!selectedTimeSlot} // Disable if no time slot is selected
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;
