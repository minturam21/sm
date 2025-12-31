
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { InstituteInfo } from '../../types';

const Contact: React.FC = () => {
  const [info, setInfo] = useState<InstituteInfo | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.settings.getInfo().then(setInfo);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.enquiries.create(formData);
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  if (!info) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-gray-600 text-lg">Have questions? We're here to help you navigate your academic journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-8">Send an Enquiry</h2>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl">
              <h3 className="font-bold mb-2">Thank you!</h3>
              <p>Your enquiry has been received. Our team will get back to you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-green-700 font-bold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" required value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" required value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" required value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea 
                  rows={4} required value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50"
                ></textarea>
              </div>
              <button 
                type="submit" disabled={loading}
                className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-shadow shadow-md disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Info & Map */}
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-bold text-gray-900 mb-2">Our Campus</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{info.address}</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">{info.phone}</p>
              <p className="text-gray-600 text-sm">Mon-Fri, 9am - 6pm</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl sm:col-span-2">
              <div className="text-2xl mb-2">✉️</div>
              <h3 className="font-bold text-gray-900 mb-2">Email Address</h3>
              <p className="text-gray-600 text-sm">{info.email}</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-[300px]">
            <iframe 
              src={info.mapEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
