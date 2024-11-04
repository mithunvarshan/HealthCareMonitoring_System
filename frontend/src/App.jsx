import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Importing pages from the 'pages' directory
import Home from './pages/Home/Home';
import Doctors from './pages/Doctors/Doctors';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

import MyAppointments from './pages/MyAppointments/MyAppointments';
import Appointment from './pages/Appointment/Appointment';
import PageNotFound from './pages/PageNotFound/PageNotFound'; // 404 Page

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import MyProfile from "./pages/myprofile/MyProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <BrowserRouter>
      <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile/>} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='*' element={<PageNotFound />} /> {/* 404 Page */}
        </Routes>
        {/* Conditionally render Footer based on the current route */}
        <ConditionalFooter />
      </BrowserRouter>
    </div>
  );
};

// Component to conditionally render the Footer
const ConditionalFooter = () => {
  const location = useLocation(); // Get current location

  return (
    <>
      {/* Your component content here */}
      {!(location.pathname === '/my-profile' || location.pathname === '/login') ? <Footer /> : null}
    </>
  );
};

export default App;
