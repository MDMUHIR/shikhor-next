import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import HomeHero from '../components/HomeHero';
import LearningPaths from '../components/LearningPaths';
import StudentReviews from '../components/StudentReviews';
import CourseCard from '../components/CourseCard';
import { ArrowRight, Sparkles, PhoneCall, Award, Users, BookCheck } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { courses, handleEnrollClick } = useApp();

  return (
    <div className="space-y-0">
      {/* Hero with Interactive Carousel & Live Stats */}
      <HomeHero
        onSelectCourse={(courseId) => {
          const c = courses.find((item) => item.id === courseId);
          navigate(`/courses/${c?.slug || courseId}`);
        }}
        onNavigateCourses={() => navigate('/courses')}
      />

      {/* Featured Popular Batches Section */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ongoing Admission</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Popular Academic &amp; Foundation Combos
            </h2>
          </div>

          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group cursor-pointer"
          >
            <span>View All Batches</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={(id) => {
                const target = courses.find(c => c.id === id);
                navigate(`/courses/${target?.slug || id}`);
              }}
              onEnroll={handleEnrollClick}
            />
          ))}
        </div>
      </section>

      {/* 6 Learning Paths Grid Cards */}
      <LearningPaths
        onSelectCategory={(cat) => {
          navigate(`/courses?category=${encodeURIComponent(cat)}`);
        }}
      />

      {/* Student Reviews & Testimonials */}
      <StudentReviews />

      {/* Need Help Helpline Banner */}
      <section className="py-10 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-white">
              Have questions about course curriculum or enrollment?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Our student counselor team is available 10:00 AM - 10:00 PM daily.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:09617331133"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs sm:text-sm text-white flex items-center gap-2 shadow-lg transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 09617331133</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
