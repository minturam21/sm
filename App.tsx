
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Public/Home';
import CourseList from './pages/Public/Courses';
import CourseDetail from './pages/Public/CourseDetail';
import Contact from './pages/Public/Contact';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ManageEnquiries from './pages/Admin/ManageEnquiries';
import { api } from './services/api';

// Admin Layout Component
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = api.auth.isAuthenticated();
  if (!auth) return <Navigate to="/admin/login" />;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white shrink-0">
        <div className="p-6">
          <span className="text-xl font-bold">Edu Admin</span>
        </div>
        <nav className="mt-4 px-4 space-y-1">
          <a href="#/admin/dashboard" className="block px-4 py-3 rounded-lg hover:bg-slate-800">Dashboard</a>
          <a href="#/admin/courses" className="block px-4 py-3 rounded-lg hover:bg-slate-800">Courses</a>
          <a href="#/admin/notices" className="block px-4 py-3 rounded-lg hover:bg-slate-800">Notices</a>
          <a href="#/admin/enquiries" className="block px-4 py-3 rounded-lg hover:bg-slate-800">Enquiries</a>
          <a href="#/admin/settings" className="block px-4 py-3 rounded-lg hover:bg-slate-800">Settings</a>
          <button 
            onClick={() => { api.auth.logout(); window.location.href = '#/'; }}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-900 text-red-400 mt-10"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

// Public Layout Component
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><div className="max-w-7xl mx-auto p-20 text-center">About page content here</div></PublicLayout>} />
        <Route path="/courses" element={<PublicLayout><CourseList /></PublicLayout>} />
        <Route path="/courses/:id" element={<PublicLayout><CourseDetail /></PublicLayout>} />
        <Route path="/admissions" element={<PublicLayout><div className="max-w-7xl mx-auto p-20 text-center">Admission process page content here</div></PublicLayout>} />
        <Route path="/notices" element={<PublicLayout><div className="max-w-7xl mx-auto p-20 text-center">Notices archive page content here</div></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><div className="max-w-7xl mx-auto p-20 text-center">Gallery page content here</div></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><div className="max-w-7xl mx-auto p-20 text-center">Privacy Policy content</div></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><div className="max-w-7xl mx-auto p-20 text-center">Terms and Conditions content</div></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/enquiries" element={<AdminLayout><ManageEnquiries /></AdminLayout>} />
        <Route path="/admin/courses" element={<AdminLayout><div className="p-8">Course Management (CRUD) feature</div></AdminLayout>} />
        <Route path="/admin/notices" element={<AdminLayout><div className="p-8">Notice Management (CRUD) feature</div></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><div className="p-8">Institute Settings feature</div></AdminLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
