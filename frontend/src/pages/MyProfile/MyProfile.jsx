import { useState } from 'react';
import { assets } from '/src/assets/assets_frontend/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: '+1 123 456 7890',
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London"
    },
    gender: 'Male',
    dob: '2000-01-20'
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (line, value) => {
    setUserData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [line]: value
      }
    }));
  };

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm m-auto'>
      <img className='w-36 rounded' src={userData.image} alt="Profile" />

      <div className='text-2xl font-semibold mt-4'>
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className='bg-gray-50 text-3xl font-medium w-full'
          />
        ) : (
          <p>{userData.name}</p>
        )}
      </div>

      <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Email:</p>
        <p className='text-blue-500'>{userData.email}</p>

        <p className='font-medium'>Phone:</p>
        {isEdit ? (
          <input
            type="text"
            value={userData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className='bg-gray-50 border border-zinc-300 rounded w-full p-2'
          />
        ) : (
          <p className='text-blue-400'>{userData.phone}</p>
        )}

        <p className='font-medium'>Address:</p>
        {isEdit ? (
          <div>
            <input
              type="text"
              value={userData.address.line1}
              onChange={(e) => handleAddressChange('line1', e.target.value)}
              className='bg-gray-50 border border-zinc-300 rounded w-full p-2'
              placeholder="Address Line 1"
            />
            <input
              type="text"
              value={userData.address.line2}
              onChange={(e) => handleAddressChange('line2', e.target.value)}
              className='bg-gray-50 border border-zinc-300 rounded w-full p-2 mt-2'
              placeholder="Address Line 2"
            />
          </div>
        ) : (
          <p className='text-gray-500'>
            {userData.address.line1} <br /> {userData.address.line2}
          </p>
        )}
      </div>

      <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Gender:</p>
        {isEdit ? (
          <select
            value={userData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className='bg-gray-50 border border-zinc-300 rounded w-full p-2'
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <p className='text-gray-400'>{userData.gender}</p>
        )}

        <p className='font-medium'>Birthday:</p>
        {isEdit ? (
          <input
            type="date"
            value={userData.dob}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            className='bg-gray-50 border border-zinc-300 rounded w-full p-2'
          />
        ) : (
          <p className='text-gray-400'>{userData.dob}</p>
        )}
      </div>

      <div className='mt-10'>
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className='bg-primary text-white px-8 py-2 rounded-full'
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className='border border-primary text-primary px-8 py-2 rounded-full'
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;