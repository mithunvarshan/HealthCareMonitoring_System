import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { toast } from "react-toastify"; 
import axios from "axios"; 

// Create the AdminContext
export const AdminContext = createContext();

// AdminContextProvider component
const AdminContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]); 
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || ''); // State to hold the token
    const backendUrl = import.meta.env.VITE_BACKEND_URL; 

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {
                headers: {
                    atoken:aToken // Include the aToken in the header
                }
            });

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }; 
    const changeAvailability = async (docId) => {
      try {
          const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {
            headers: {
                atoken:aToken // Include the aToken in the header
            }
        });
  
          if (data.success) {
              toast.success(data.message); // Show success message
              getAllDoctors(); // Refresh the list of doctors
          } else {
              toast.error(data.message); // Show error message if not successful
          }
      } catch (error) {
          toast.error(error.message); // Show error message on failure
      }
  };
  // Retrieve the backend URL from environment variables
    console.log('Backend URL:', backendUrl);

    // Effect to save the token to local storage whenever it changes
    useEffect(() => {
        if (aToken) {
            localStorage.setItem('aToken', aToken); // Save token to local storage
        } else {
            localStorage.removeItem('aToken'); // Remove token from local storage if empty
        }
    }, [aToken]);

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors, // Add doctors to the context value
        getAllDoctors, 
        changeAvailability// Expose the function if needed in components
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children} {/* Render any children components */}
        </AdminContext.Provider>
    );
};

// Define prop types for AdminContextProvider
AdminContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Specify that children is a required prop
};

export default AdminContextProvider;
