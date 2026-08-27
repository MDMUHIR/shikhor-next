import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/CourseCard';
import { ArrowLeft, Users, Award, BookOpen, GraduationCap, Star, CheckCircle2, Facebook, Youtube, Instagram } from 'lucide-react';

export default function InstructorDetailPage() {
  const { instructorId } = useParams<{ instructorId: string }>();
  const navigate = useNavigate();
  const { instructors, courses, handleEnrollClick } = useApp();

  const instructor = instructors.find(
    (i) => i.id === instructorId || i.name.toLowerCase().includes(instructorId?.toLowerCase() || '')
  );

  if (!instructor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Faculty Profile Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested educator profile is not available.</p>
        <button
          onClick={() => navigate('/instructors')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Instructors</span>
        </button>
      </div>
    );
  }

  const assignedCourses = courses.filter((c) =>
    c.instructors.some((inst) => inst.name === instructor.name || inst.id === instructor.id)
  );

  return (
    <div className="min-h-screen rm-page-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <button
          onClick={() => navigate('/instructors')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Instructors</span>
        </button>

        {/* Instructor Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
          <div className="relative shrink-0">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover ring-4 ring-blue-50 shadow-md"
            />
            <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold shadow-xs">
              Verified
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-lg inline-block mb-2">
                {instructor.subject}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {instructor.name}
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-1">{instructor.role}</p>
            </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {instructor.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <span className="mr-1 text-xs font-bold text-slate-500">Find {instructor.name} on</span>
                {[
                  { label: 'Facebook', href: instructor.socialLinks?.facebook || `https://www.facebook.com/search/top?q=${encodeURIComponent(instructor.name)}`, Icon: Facebook },
                  { label: 'YouTube', href: instructor.socialLinks?.youtube || `https://www.youtube.com/results?search_query=${encodeURIComponent(instructor.name)}`, Icon: Youtube },
                  { label: 'Instagram', href: instructor.socialLinks?.instagram || `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(instructor.name)}`, Icon: Instagram },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${label}: ${instructor.name}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center md:text-left">
                <span className="text-[10px] text-slate-400 block font-semibold">Experience</span>
                <span className="font-bold text-slate-900 text-sm">{instructor.experience}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center md:text-left">
                <span className="text-[10px] text-slate-400 block font-semibold">Students Mentored</span>
                <span className="font-bold text-blue-600 text-sm">{instructor.studentsCount.toLocaleString()}+</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center md:text-left">
                <span className="text-[10px] text-slate-400 block font-semibold">Active Batches</span>
                <span className="font-bold text-slate-900 text-sm">{instructor.coursesCount} Programs</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center md:text-left">
                <span className="text-[10px] text-slate-400 block font-semibold">Student Rating</span>
                <span className="font-bold text-amber-500 text-sm flex items-center justify-center md:justify-start gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>4.95</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Courses Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Courses Conducted by {instructor.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore specialized batches and conceptual masterclasses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(assignedCourses.length > 0 ? assignedCourses : courses.slice(0, 3)).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={(id) => {
                  const target = courses.find((c) => c.id === id);
                  navigate(`/courses/${target?.slug || id}`);
                }}
                onEnroll={handleEnrollClick}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
