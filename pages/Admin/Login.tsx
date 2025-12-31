
import React, { useState } from 'react';
import { api } from '../../services/api';

const AdminLogin: React.FC = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await api.auth.login(user, pass);
    if (success) {
      window.location.href = '#/admin/dashboard';
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Portal</h1>
          <p className="text-slate-500 mt-2">Sign in to manage your institute</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
            <input 
              type="text" required value={user}
              onChange={e => setUser(e.target.value)}
              className="w-full border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 p-4 bg-slate-50"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              type="password" required value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 p-4 bg-slate-50"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            Login to Dashboard
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <a href="#/" className="text-sm text-blue-600 font-medium hover:underline">Back to Website</a>
          <p className="text-xs text-slate-400 mt-6">Default: admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
