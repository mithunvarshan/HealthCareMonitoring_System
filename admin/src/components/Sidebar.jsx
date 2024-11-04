import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext); // Get the token from context

    return (
        <div className='min-h-screen bg-white border-r'>
            {aToken && ( // Conditionally render the sidebar content based on aToken
                <ul className='text-[#515151] mt-5'>
                    <li>
                        <NavLink
                            to='/admin-dashboard'
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${
                                    isActive ? 'border-primary bg-[#f2f3ff] border-r-4 font-bold text-blue-600' : ''
                                }`
                            }
                        >
                            <img src={assets.home_icon} alt="Dashboard" />
                            <p>Dashboard</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/all-appointments'
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${
                                    isActive ? 'border-primary bg-[#f2f3ff] border-r-4 font-bold text-blue-600' : ''
                                }`
                            }
                        >
                            <img src={assets.appointment_icon} alt="Appointments" />
                            <p>Appointments</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/add-doctor'
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${
                                    isActive ? 'border-primary bg-[#f2f3ff] border-r-4 font-bold text-blue-600' : ''
                                }`
                            }
                        >
                            <img src={assets.add_icon} alt="Add Doctor" />
                            <p>Add Doctor</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/doctor-list'
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${
                                    isActive ? 'border-primary bg-[#f2f3ff] border-r-4 font-bold text-blue-600' : ''
                                }`
                            }
                        >
                            <img src={assets.people_icon} alt="Doctors List" />
                            <p>Doctors List</p>
                        </NavLink>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
