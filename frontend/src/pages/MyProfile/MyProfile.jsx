import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, backendUrl, loadUserProfileData } = useContext(AppContext) || [{}, () => {}];
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

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

  const updateUserProfileData = async () => {
    try {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("phone", userData.phone);
        formData.append("gender", userData.gender);
        formData.append("dob", userData.dob);
        formData.append("street", userData.address?.street);
        formData.append("city", userData.address?.city);
        if (image) formData.append("image", image);

        const token = sessionStorage.getItem("token"); // ✅ Fixed: Get token from sessionStorage
        if (!token) {
            toast.error("Unauthorized: No token found.");
            return;
        }

        const { data } = await axios.post( // ✅ Changed POST to PUT (check your API)
            `${backendUrl}/api/user/update-profile`,
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
            toast.success(data.message);
            await loadUserProfileData();
            setIsEdit(false);
            setImage(null);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating the profile.");
    }
};

  if (!userData) return <p>Loading...</p>;

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm m-auto'>
      {isEdit ? (
        <label htmlFor="image" className='inline-block relative cursor-pointer'>
          <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
          <img className='w-10 absolute bottom-12 right-12' src={image ? '' : '/assets/upload.png'} alt="Upload Icon" />
          <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
        </label>
      ) : (
        <img className='w-36 rounded' src={userData.image} alt="Profile" />
      )}

      <div className='text-2xl font-semibold mt-4'>
        {isEdit ? (
          <input
            type="text"
            value={userData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className='bg-gray-50 text-3xl font-medium w-full'
          />
        ) : (
          <p>{userData.name || 'N/A'}</p>
        )}
      </div>

      <p className='text-neutral-500 underline mt-3'>PERSONAL INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Gender:</p>
        {isEdit ? (
          <input
            type="text"
            value={userData.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className='bg-gray-50 border border-zinc-300 rounded w-full p-2'
          />
        ) : (
          <p>{userData.gender || 'N/A'}</p>
        )}

        <p className='font-medium'>Date of Birth:</p>
        {isEdit ? (
          <input
            type="date"
            value={userData.dob || ''}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            className='bg-gray-50 border border-zinc-300 rounded w-full p-2'
          />
        ) : (
          <p>{userData.dob || 'N/A'}</p>
        )}
      </div>

      <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Email:</p>
        <p className='text-blue-500'>{userData.email || 'N/A'}</p>

        <p className='font-medium'>Phone:</p>
        {isEdit ? (
          <input
            type="text"
            value={userData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className='bg-gray-50 border border-zinc-300 rounded w-full p-2'
          />
        ) : (
          <p className='text-blue-400'>{userData.phone || 'N/A'}</p>
        )}
      </div>

      <p className='text-neutral-500 underline mt-3'>ADDRESS</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Street:</p>
        {isEdit ? (
          <input
            type="text"
            value={userData.address?.street || ''}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            className='bg-gray-50 border border-zinc-300 rounded w-full p-2'
          />
        ) : (
          <p>{userData.address?.street || 'N/A'}</p>
        )}

        <p className='font-medium'>City:</p>
        {isEdit ? (
          <input
            type="text"
            value={userData.address?.city || ''}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            className='bg-gray-50 border border-zinc-300 rounded w-full p-2'
          />
        ) : (
          <p>{userData.address?.city || 'N/A'}</p>
        )}
      </div>

      <div className='mt-10'>
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
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