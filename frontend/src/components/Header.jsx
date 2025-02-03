import React from 'react';

const Header = () => {
  // Professional background pattern
  const BackgroundPattern = () => (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4d4fab', stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.9 }} />
        </linearGradient>
        <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 0 40 L 40 0 M -10 10 L 10 -10 M 30 50 L 50 30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
        </pattern>
      </defs>
      
      {/* Main Background */}
      <rect width="100%" height="100%" fill="url(#gradient)" />
      <rect width="100%" height="100%" fill="url(#pattern)" />
      
      {/* Medical Cross Symbols */}
      <g opacity="0.1" fill="#fff">
        <path d="M60,20 h20 v-20 h20 v20 h20 v20 h-20 v20 h-20 v-20 h-20 z" />
        <path d="M760,580 h20 v-20 h20 v20 h20 v20 h-20 v20 h-20 v-20 h-20 z" />
      </g>
      
      {/* Abstract Medical Shapes */}
      <circle cx="10%" cy="20%" r="50" fill="rgba(255,255,255,0.05)" />
      <circle cx="90%" cy="80%" r="100" fill="rgba(255,255,255,0.05)" />
    </svg>
  );

  return (
    <div className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background */}
      <BackgroundPattern />
      
      {/* Content */}
      <div className="relative z-10 bg-black/30 backdrop-blur-sm p-8 rounded-lg max-w-4xl mx-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Transforming Lives Through Excellence in Healthcare
        </h1>
        <p className="text-base md:text-lg font-light mb-6 max-w-2xl mx-auto">
          We are committed to providing exceptional patient care and promoting wellness in our community.
        </p>
        <a 
          href="#speciality" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Book an Appointment
        </a>
      </div>
    </div>
  );
};

export default Header;