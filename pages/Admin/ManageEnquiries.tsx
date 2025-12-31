
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Enquiry } from '../../types';

const ManageEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    const data = await api.enquiries.getAll();
    setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusUpdate = async (id: string, status: Enquiry['status']) => {
    await api.enquiries.updateStatus(id, status);
    fetchEnquiries();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Manage Enquiries</h1>
      
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enquiries.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(e.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{e.name}</div>
                  <div className="text-xs text-gray-500">{e.email}</div>
                  <div className="text-xs text-gray-500">{e.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {e.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    e.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                    e.status === 'RESOLVED' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {e.status === 'PENDING' && (
                    <button 
                      onClick={() => handleStatusUpdate(e.id, 'RESOLVED')}
                      className="text-blue-600 hover:text-blue-900 font-bold mr-4"
                    >
                      Resolve
                    </button>
                  )}
                  <button 
                    onClick={() => handleStatusUpdate(e.id, 'SPAM')}
                    className="text-gray-400 hover:text-red-600"
                  >
                    Spam
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-10 text-center text-gray-500">Loading enquiries...</div>}
        {!loading && enquiries.length === 0 && <div className="p-10 text-center text-gray-500">No enquiries found.</div>}
      </div>
    </div>
  );
};

export default ManageEnquiries;
