import React from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '/src/assets/assets_frontend/assets.js';

const SpecialityMenu = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24" id="speciality">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Find by <span className="font-medium text-blue-900">Speciality</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg leading-relaxed">
            Browse through our comprehensive list of medical specialties and find the perfect specialist for your needs.
          </p>
        </div>

        {/* Specialities Grid */}
        <div className="relative">
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* Scrollable Container */}
          <div className="flex gap-8 overflow-x-auto hide-scrollbar py-8 px-4">
            {specialityData.map((item, index) => (
              <Link
                onClick={handleScrollToTop}
                key={index}
                to={`/doctors/${item.speciality}`}
                className="group flex flex-col items-center min-w-[160px] p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-20 h-20 mb-4 rounded-full bg-blue-50 p-4 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  <img
                    className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    src={item.image}
                    alt={`${item.speciality} specialty`}
                  />
                </div>
                <p className="text-gray-900 font-medium text-sm text-center group-hover:text-blue-700 transition-colors duration-300">
                  {item.speciality}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Hints */}
        
      </div>
    </div>
  );
};

export default SpecialityMenu;