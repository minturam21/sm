
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Course, Notice, Enquiry } from '../../types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ courses: 0, notices: 0, enquiries: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [c, n, e] = await Promise.all([
        api.courses.getAll(),
        api.notices.getAll(),
        api.enquiries.getAll()
      ]);
      setStats({
        courses: c.length,
        notices: n.length,
        enquiries: e.filter(enq => enq.status === 'PENDING').length
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium uppercase">Active Courses</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">{stats.courses}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium uppercase">Total Notices</div>
          <div className="text-3xl font-bold text-slate-800 mt-2">{stats.notices}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium uppercase">New Enquiries</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">{stats.enquiries}</div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-50 text-blue-700 p-4 rounded-lg font-medium hover:bg-blue-100 transition-colors">Add New Course</button>
          <button className="bg-blue-50 text-blue-700 p-4 rounded-lg font-medium hover:bg-blue-100 transition-colors">Post Notice</button>
          <button className="bg-blue-50 text-blue-700 p-4 rounded-lg font-medium hover:bg-blue-100 transition-colors">Upload Photos</button>
          <button className="bg-blue-50 text-blue-700 p-4 rounded-lg font-medium hover:bg-blue-100 transition-colors">System Settings</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
