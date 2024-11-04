import PropTypes from "prop-types";
import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const value = {
    // Define any values or functions you want to provide to the context here
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

// Define prop types for DoctorContextProvider
DoctorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoctorContextProvider;
