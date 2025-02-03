import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

// Create the AppContext
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(sessionStorage.getItem("token") || null);
    const [userData, setUserData] = useState(null);

    // Function to fetch doctors' data
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message || "Failed to fetch doctors list.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while fetching doctors data.");
        }
    };

    // Function to fetch user profile data
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while fetching user profile data.");
        }
    };

    // Fetch doctors data on component mount
    useEffect(() => {
        getDoctorsData();
    }, []);

    // Fetch user profile data when token changes
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null);
        }
    }, [token]);

    const contextValue = {
        doctors,
        getDoctorsData,
        currencySymbol,
        backendUrl,
        token,
        setToken: (newToken) => {
            if (newToken) {
                sessionStorage.setItem("token", newToken);
                setToken(newToken);
            } else {
                sessionStorage.removeItem("token");
                setToken(null);
            }
        },
        userData,
        setUserData,
        loadUserProfileData,
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Define prop types for AppContextProvider
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppContextProvider;
