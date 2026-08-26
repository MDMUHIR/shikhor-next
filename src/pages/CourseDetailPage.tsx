import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CourseDetail from '../components/CourseDetail';
import { BookOpen, ArrowLeft } from 'lucide-react';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { courses, user, handleEnrollClick } = useApp();

  const course = courses.find((c) => c.slug === slug || c.id === slug);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Course Not Found</h2>
        <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
          The course or academic batch you are looking for might have been updated or moved.
        </p>
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Courses</span>
        </button>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourseIds.includes(course.id) || false;

  return (
    <CourseDetail
      course={course}
      onBack={() => navigate('/courses')}
      onEnroll={handleEnrollClick}
      isEnrolled={isEnrolled}
      onGoToLearn={() => navigate(`/learn/${course.id}`)}
    />
  );
}
