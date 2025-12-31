
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold text-white mb-4 block">EduInstify</span>
            <p className="text-sm">
              Empowering the next generation of leaders through quality education and practical innovation.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Our Courses</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link to="/notices" className="hover:text-white transition-colors">Notices</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest news and announcements.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-slate-800 border-none rounded-l-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="bg-blue-600 text-white rounded-r-md px-4 py-2 text-sm hover:bg-blue-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>© {new Date().getFullYear()} EduInstify International. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
