import React, { useState } from 'react';
import { Users, Award, Clock, Phone, MapPin, Calendar, Activity, Shield, Stethoscope } from 'lucide-react';

const MedicalIllustration = () => (
  <svg viewBox="0 0 800 500" className="w-full h-full">
    {/* Background */}
    <rect width="800" height="500" fill="#f8fafc" />
    
    {/* Hospital Building */}
    <rect x="200" y="100" width="400" height="300" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
    <rect x="350" y="150" width="100" height="150" fill="#3b82f6"/>
    
    {/* Windows */}
    <rect x="250" y="150" width="60" height="60" fill="#bfdbfe"/>
    <rect x="490" y="150" width="60" height="60" fill="#bfdbfe"/>
    <rect x="250" y="250" width="60" height="60" fill="#bfdbfe"/>
    <rect x="490" y="250" width="60" height="60" fill="#bfdbfe"/>
    
    {/* Hospital Cross */}
    <rect x="380" y="170" width="40" height="110" fill="#fff"/>
    <rect x="345" y="205" width="110" height="40" fill="#fff"/>
    
    {/* Ground */}
    <path d="M0 400 Q400 380 800 400 L800 500 L0 500 Z" fill="#dbeafe"/>
    
    {/* Medical Symbols */}
    <circle cx="150" cy="150" r="30" fill="#3b82f6" opacity="0.2"/>
    <circle cx="650" cy="150" r="30" fill="#3b82f6" opacity="0.2"/>
  </svg>
);

// Rest of the component remains the same, just replace the img tag with:
// Replace:
// <img 
//   className="w-full rounded-lg shadow-xl"
//   src={assets.about_image}
//   alt="About Prescripto Hospital"
// />
// With:
const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: "50+", label: "Specialist Doctors", icon: Users },
    { number: "30+", label: "Years of Excellence", icon: Award },
    { number: "24/7", label: "Emergency Care", icon: Clock },
    { number: "100K+", label: "Patients Served", icon: Activity }
  ];

  const departments = [
    { name: "Cardiology", description: "World-class cardiac care with state-of-the-art facilities" },
    { name: "Neurology", description: "Advanced neurological treatments and brain health services" },
    { name: "Orthopedics", description: "Comprehensive bone and joint care solutions" },
    { name: "Pediatrics", description: "Specialized care for children of all ages" },
    { name: "Oncology", description: "Advanced cancer treatment and support services" },
    { name: "Emergency Care", description: "24/7 emergency medical services" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Excellence in Healthcare
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Providing world-class medical care with compassion and innovation since 1990
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="rounded-lg shadow-xl overflow-hidden bg-white">
          <MedicalIllustration />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Your Trusted Healthcare Partner
          </h2>
          <p className="text-gray-600">
            Welcome to Prescripto, where cutting-edge medical technology meets compassionate care. Our state-of-the-art facility is equipped with the latest medical innovations and staffed by leading healthcare professionals.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">{stat.number}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-20">
        <div className="flex justify-center space-x-4 border-b">
          {['mission', 'values', 'accreditations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="mt-6">
          {activeTab === 'mission' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex gap-4">
                <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To provide exceptional healthcare services that enhance the quality of life for our community through innovative medical solutions, compassionate care, and continuous advancement in medical excellence.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'values' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex gap-4">
                <Stethoscope className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Core Values</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      Excellence in Patient Care
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      Integrity and Transparency
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      Innovation in Healthcare
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      Compassionate Service
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'accreditations' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex gap-4">
                <Award className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Accreditations</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      Joint Commission International (JCI)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      National Quality Forum (NQF)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      ISO 9001:2015 Certified
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Departments Grid */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Departments</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>
              <p className="text-gray-600">{dept.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Get in Touch</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Emergency</h3>
              <p className="text-gray-600">1-800-PRESCRIPTO</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-gray-600">123 Healthcare Ave, Medical City</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Appointments</h3>
              <p className="text-gray-600">Book Online or Call Us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;