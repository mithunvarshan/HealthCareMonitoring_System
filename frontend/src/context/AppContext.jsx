import { createContext, useState, useEffect } from "react";
import axios from "axios"; 
import { toast } from "react-toastify"; 
import PropTypes from "prop-types"; 

// Create the AppContext
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Get the backend URL from environment variables
    const [doctors, setDoctors] = useState([]); // State to hold doctors data
    const [token, setToken] = useState(localStorage.getItem('token') || null); // State to hold the token
    const [userData, setUserData] = useState(null); // Changed from false to null for clarity

    const value = {
        doctors,
        currencySymbol,
        backendUrl, // Include backendUrl in the context
        token, // Include token in the context
        setToken: (newToken) => {
            if (newToken) {
                localStorage.setItem('token', newToken); // Store token in localStorage
                setToken(newToken);
            } else {
                localStorage.removeItem('token'); // Remove token from localStorage
                setToken(null);
            }
        },
        userData,
        setUserData // Provide setUserData method for updating user data
    };

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success) {
                setDoctors(data.doctors);
                toast.success("Doctors list fetched successfully!"); // Success message
            } else {
                toast.error(data.message || "Failed to fetch doctors list."); // Error message
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while fetching doctors data."); // Error message for catching error
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message); // Error message
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while fetching user profile data."); // Specific error message
        }
    };

    // Fetch doctors data on component mount
    useEffect(() => {
        getDoctorsData();
    }, []); // Empty dependency array to run once when the component mounts
    
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null); // Reset userData to null if no token
        }
    }, [token]); // Added token as a dependency

    return (
        <AppContext.Provider value={value}>
            {props.children} {/* Render any children components */}
        </AppContext.Provider>
    );
};

// Define prop types for AppContextProvider
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Specify that children is a required prop
};

export default AppContextProvider;
