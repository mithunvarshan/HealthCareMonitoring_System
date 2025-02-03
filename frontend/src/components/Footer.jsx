const Footer = () => {
  return (
    <div className=' py-10 px-6 md:px-16'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 text-sm'>
        
        {/* Left Section */}
        <div>
          <h1 className="text-4xl font-bold text-blue-700 tracking-wider drop-shadow-md">
            VIVEKSHA Hospital
          </h1>
          <p className='w-full md:w-2/3 text-gray-600 leading-6 mt-3'>
            Providing compassionate and comprehensive healthcare with excellence and innovation.
          </p>
        </div>
  
        {/* Center Section */}
        <div>
          <p className='text-xl font-semibold mb-5 text-gray-800'>Quick Links</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Departments</li>
            <li>Doctors</li>
            <li>Contact</li>
          </ul>
        </div>
  
        {/* Right Section */}
        <div>
          <p className='text-xl font-semibold mb-5 text-gray-800'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Email: contact@vivekshahospital.com</li>
            <li>Phone: +1-212-456-7890</li>
            <li>Emergency: +1-800-123-4567</li>
            <li>123 Health St., New York, NY 10001</li>
          </ul>
        </div>
      </div>
  
      {/* Copyright Section */}
      <div className='border-t border-gray-300 mt-6 pt-4 text-center text-gray-600 text-sm'>
        <p>Copyright 2024 @ viveksha Hospital - All Rights Reserved</p>
      </div>
    </div>
  );
};
  
export default Footer;
