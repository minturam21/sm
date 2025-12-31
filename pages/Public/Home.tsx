
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Course, Notice, Testimonial } from '../../types';

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [c, n] = await Promise.all([
          api.courses.getPublished(),
          api.notices.getActive()
        ]);
        setCourses(c.slice(0, 3));
        setNotices(n.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Building the Future of <span className="text-blue-200">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 mb-10 leading-relaxed">
              Join a community of innovators, leaders, and life-long learners. Choose from our wide range of industry-aligned courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses" className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-center hover:bg-blue-50 transition-colors shadow-lg">
                Explore Courses
              </Link>
              <Link to="/admissions" className="bg-blue-600 border border-blue-400 text-white px-8 py-4 rounded-lg font-bold text-center hover:bg-blue-500 transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none hidden md:block">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full">
            <path fill="#FFFFFF" d="M44.7,-76.4C58.2,-69.2,70.1,-58.5,78.2,-45.3C86.3,-32.1,90.6,-16.1,89.5,-0.6C88.4,14.8,82,29.6,73,42.1C64,54.6,52.3,64.8,39,72.4C25.7,80,10.8,85,1.9,81.7C-7.1,78.4,-24.1,66.8,-38.3,58.3C-52.6,49.8,-64,44.4,-72.1,34.8C-80.2,25.2,-85.1,11.3,-83.4,-1C-81.8,-13.2,-73.7,-23.8,-65.1,-33.4C-56.5,-43.1,-47.4,-51.7,-36.9,-60.7C-26.4,-69.7,-14.4,-79.1,1.1,-81C16.6,-82.9,31.2,-77.3,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
          <div className="mt-2 h-1 w-20 bg-blue-600 mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Expert Faculty', desc: 'Learn from professors with real-world industry experience.', icon: '🎓' },
            { title: 'Global Recognition', desc: 'Our certifications are accepted by top global employers.', icon: '🌍' },
            { title: 'Career Support', desc: 'Dedicated placement cell to help you land your dream job.', icon: '💼' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Notices - Fixed Sidebar/Row Layout */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
                <Link to="/courses" className="text-blue-600 font-semibold hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img src={`https://picsum.photos/seed/${course.id}/400/250`} alt={course.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{course.category}</span>
                      <h3 className="text-xl font-bold mt-2 mb-3">{course.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{course.description}</p>
                      <Link to={`/courses/${course.id}`} className="inline-block text-blue-600 font-semibold text-sm hover:text-blue-800">
                        Course Details &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">📢</span> Latest Notices
              </h3>
              <div className="space-y-6">
                {notices.map(notice => (
                  <div key={notice.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="text-xs text-gray-500 mb-1 font-medium">{new Date(notice.publishDate).toLocaleDateString()}</div>
                    <h4 className="font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                      <Link to="/notices">{notice.title}</Link>
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{notice.content}</p>
                  </div>
                ))}
              </div>
              <Link to="/notices" className="block text-center mt-8 text-blue-600 font-bold border-2 border-blue-600 rounded-lg py-2 hover:bg-blue-50 transition-colors">
                View All Notices
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10k+</div>
            <div className="text-blue-300">Graduates</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-blue-300">Courses</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">200+</div>
            <div className="text-blue-300">Partners</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-blue-300">Awards</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
