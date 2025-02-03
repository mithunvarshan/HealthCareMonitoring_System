import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Building, ArrowRight, Briefcase, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const officeHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Sunday', hours: 'Emergency Only' }
  ];

  // Professional medical illustration using SVG
  const ContactIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <rect width="400" height="300" fill="#f8fafc"/>
      <circle cx="200" cy="150" r="100" fill="#e2e8f0"/>
      <path d="M150 100 Q200 50 250 100 T350 100" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <rect x="160" y="120" width="80" height="120" rx="10" fill="#3b82f6"/>
      <rect x="180" y="140" width="40" height="60" fill="white"/>
      <circle cx="200" cy="220" r="5" fill="white"/>
      <path d="M140 240 Q200 280 260 240" fill="none" stroke="#3b82f6" strokeWidth="4"/>
    </svg>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're here to help and answer any questions you might have. We look forward to hearing from you.
        </p>
      </div>

      {/* Main Contact Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="relative h-64 mb-8">
            <ContactIllustration />
          </div>

          {/* Contact Details */}
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Location</h3>
                <p className="text-gray-600">54709 Willms Station, Suite 350, Washington</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">(415) 555-0132</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">contact@prescripto.com</p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-gray-50 rounded-xl p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Office Hours</h3>
              </div>
              <div className="space-y-2">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="text-gray-900 font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Careers Section */}
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Careers at PRESCRIPTO</h2>
            <p className="text-gray-600 mb-6">Join our team of healthcare professionals and make a difference in people's lives.</p>
            <button className="bg-white px-6 py-3 rounded-md border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center gap-2">
              Explore Opportunities
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;