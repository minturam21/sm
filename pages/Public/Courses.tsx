
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Course } from '../../types';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.courses.getPublished().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];
  const filteredCourses = filter === 'All' ? courses : courses.filter(c => c.category === filter);

  if (loading) return <div className="p-20 text-center">Loading courses...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Explore our range of academic and professional programs designed to prepare you for global success.</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
            <div className="relative h-56">
              <img 
                src={`https://picsum.photos/seed/${course.id}/600/400`} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-blue-700 shadow-sm">
                {course.mode}
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <span className="text-xs font-bold text-blue-600 uppercase mb-2 tracking-wide">{course.category}</span>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h2>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3">{course.description}</p>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-sm font-medium text-gray-500">Duration: {course.duration}</span>
                <Link 
                  to={`/courses/${course.id}`} 
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
