import { Link } from 'react-router-dom';
import { specialityData } from '/src/assets/assets_frontend/assets.js';

const SpecialityMenu = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-600' id='speciality'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of specialties.<br />Find the best doctor for your treatment.
      </p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-scroll hide-scrollbar'>
        {specialityData.map((item, index) => (
          <Link
            onClick={handleScrollToTop}
            key={index}
            to={`/doctors/${item.speciality}`}
            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:scale-105 transition-transform duration-300'
          >
            <img className='w-16 sm:w-24 mb-2' src={item.image} alt={`${item.speciality} icon`} />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
