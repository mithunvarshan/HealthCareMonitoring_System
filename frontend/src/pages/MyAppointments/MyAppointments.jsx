import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className='text-zinc-700 border-b pb-3 mt-12 font-medium'>My Appointments</p>
      {doctors.slice(0, 3).map((item, index) => (
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b' key={index}>
          {/* Doctor Image */}
          <div>
            <img className='w-32 bg-indigo-50' src={item.image} alt={`${item.name}`} />
          </div>

          {/* Doctor Details */}
          <div className='flex-1 text-sm'>
            <p className='text-neutral-800 font-semibold'>{item.name}</p>
            <p className='text-zinc-600'>{item.speciality}</p>
            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
            <p className='text-xs'>{item.address.line1}</p>
            <p className='text-xs'>{item.address.line2}</p>
            <p className='text-zinc-700 font-medium mt-2'>Date & Time: <span className='text-neutral-700'>25, July, 2024 | 8:30 PM</span></p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col gap-2 justify-end'>
            <button className='text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'>
              Pay Online
            </button>
            <button className='text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'>
              Cancel Appointment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
