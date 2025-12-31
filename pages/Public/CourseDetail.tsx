
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Course } from '../../types';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.courses.getById(id).then(data => {
        setCourse(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading details...</div>;
  if (!course) return <div className="p-20 text-center">Course not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <Link to="/courses" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Courses</Link>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{course.title}</h1>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{course.category}</span>
              <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">{course.mode}</span>
              <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">{course.duration}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{course.description}</p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Syllabus</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 whitespace-pre-line text-gray-700 leading-loose">
              {course.syllabus}
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4">Eligibility Criteria</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
              <p className="text-blue-900 font-medium">{course.eligibility}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Sticky CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold mb-6">Course Quick Facts</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold">{course.duration}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Study Mode</span>
                <span className="font-semibold">{course.mode}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Certificate</span>
                <span className="font-semibold text-green-600">Included</span>
              </li>
            </ul>
            <div className="space-y-4">
              <Link to="/contact" className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-bold hover:bg-blue-700 transition-shadow shadow-lg">
                Enquire Now
              </Link>
              <Link to="/admissions" className="block w-full border-2 border-blue-600 text-blue-600 text-center py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                Apply for Admission
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-6 text-center">
              Our team will contact you within 24 hours of enquiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
