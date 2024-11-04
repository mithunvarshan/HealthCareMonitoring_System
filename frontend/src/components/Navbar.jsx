import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AppContext } from '/src/context/AppContext'; // Adjust the path as necessary
import { assets } from '/src/assets/assets_frontend/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext); // Access token and setToken from context

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b'>
      <img
        onClick={() => navigate('/')}
        className='w-44 cursor-pointer'
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Navigation Links */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        {['/', '/doctors', '/about', '/contact'].map((path, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) => (isActive ? 'active py-1 text-blue-700' : 'py-1')}
          >
            <li>{path.toUpperCase().slice(1) || 'HOME'}</li>
            <hr className='border-none outline-none h-0.5' />
          </NavLink>
        ))}
      </ul>

      <div className='relative flex items-center'>
        {/* Conditional for Logged-In User */}
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
            {/* Dropdown Menu */}
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('/my-profile')}>My Profile</p>
                <p onClick={() => navigate('/my-appointments')}>My Appointments</p>
                <p
                  onClick={() => {
                    setToken(null); // Clear token on logout
                    navigate('/login');
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <div
          onClick={() => setShowMenu(true)}
          className='w-6 h-6 flex flex-col justify-between items-center cursor-pointer md:hidden'
        >
          {/* Hamburger Icon Lines */}
          <div className='w-3/4 h-0.5 bg-primary'></div>
          <div className='w-3/4 h-0.5 bg-primary'></div>
          <div className='w-3/4 h-0.5 bg-primary'></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className='fixed w-full h-full bg-white z-50 right-0 top-0 bottom-0'>
          {/* Close Button */}
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt='Logo' />
            <div
              className='w-6 h-6 flex flex-col justify-between items-center cursor-pointer md:hidden'
              onClick={() => setShowMenu(false)}
            >
              {/* Close Icon (X shape) */}
              <div className='w-full h-0.5 bg-black transform rotate-45 translate-y-1'></div>
              <div className='w-full h-0.5 bg-black transform -rotate-45 -translate-y-1'></div>
            </div>
          </div>

          {/* Menu Links */}
          <ul className='flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium'>
            {['/', '/doctors', '/about', '/contact'].map((path, index) => (
              <NavLink
                key={index}
                onClick={() => setShowMenu(false)}
                to={path}
              >
                <p className='px-4 py-2 rounded inline-block'>
                  {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
                </p>
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
