
import { assets } from '/src/assets/assets_frontend/assets';

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      {/* Left section with text */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight'>
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt=" " />
          <p>
            Simply browse through our extensive list of trusted doctors, <br className='hidden md:block' /> and book your appointment today.
          </p>
        </div>
        <a href="#speciality" className='flex items-center gap-2 bg-white text-gray-600 text-sm px-8 py-3 rounded-full hover:scale-105 transition-all duration-300'>
          Book Appointment <img className='w-3' src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* Right section with image */}
      <div className='md:w-1/2 flex justify-center py-10'>
        <img className='w-56 md:w-72 lg:w-80' src={assets.header_img} alt="Doctors Group" />
      </div>
    </div>
  );
};

export default Header;
