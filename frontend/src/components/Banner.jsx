import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Subtle badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 text-slate-700">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Simple Online Booking</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 max-w-2xl">
            Book Appointments With Trusted Doctors
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-600 max-w-xl">
            Connect with qualified healthcare professionals for quality care and consultations
          </p>
          
          {/* Simple CTA */}
          <button
            onClick={() => {
              navigate('/login');
              scrollTo(0, 0);
            }}
            className="px-8 py-3 text-sm bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            Create Account
          </button>
          
          {/* Simple stats */}
          <div className="flex flex-wrap justify-center gap-12 pt-8 text-slate-600">
            <div className="text-center">
              <div className="text-2xl font-semibold text-slate-900">100+</div>
              <div className="text-sm">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-slate-900">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-slate-900">4.9★</div>
              <div className="text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;