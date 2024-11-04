
import PropTypes from "prop-types";
import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const value = {
    // Define any values or functions you want to provide to the context here
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Define prop types
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;

