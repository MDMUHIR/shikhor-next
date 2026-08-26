import { BookOpen, LayoutGrid, ClipboardList, User, Play, FileText, Award, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Course, UserProfile } from '../types';

interface LearnDashboardProps {
  user: UserProfile | null;
  enrolledCourses: Course[];
  onNavigateCourses: () => void;
  onNavigateExams: () => void;
  onNavigateProfile: () => void;
  onSelectCourse: (courseId: string) => void;
  onOpenLiveClass: (course: Course) => void;
}

export default function LearnDashboard({
  user,
  enrolledCourses,
  onNavigateCourses,
  onNavigateExams,
  onNavigateProfile,
  onSelectCourse,
  onOpenLiveClass,
}: LearnDashboardProps) {
  const hasEnrollments = enrolledCourses.length > 0;

  return (
    <div className="min-h-screen py-12 sm:py-16 rm-aura-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Matching Screenshot #1) */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20 mb-3">
            <BookOpen className="w-6 h-6" />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              My Enrolled Courses
            </h1>
          </div>
          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto">
            Continue your learning journey and open course exams when you are ready.
          </p>
        </div>

        {/* 3 Shortcut Cards in a Row (Matching Screenshot #1) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          
          {/* Card 1: Browse courses */}
          <div
            onClick={onNavigateCourses}
            className="bg-white/90 backdrop-blur-xs hover:bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-blue-100">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                Browse courses
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Discover new programs
              </p>
            </div>
          </div>

          {/* Card 2: All exams */}
          <div
            onClick={onNavigateExams}
            className="bg-white/90 backdrop-blur-xs hover:bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-sky-100">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                All exams
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Public &amp; private schedules
              </p>
            </div>
          </div>

          {/* Card 3: Profile */}
          <div
            onClick={onNavigateProfile}
            className="bg-white/90 backdrop-blur-xs hover:bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-indigo-100">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                Profile
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Account &amp; enrollments
              </p>
            </div>
          </div>

        </div>

        {/* Dynamic State: If No Courses Enrolled -> Empty State matching Screenshot #1 */}
        {!hasEnrollments ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-10 sm:p-20 text-center flex flex-col items-center justify-center min-h-[380px]">
            
            {/* Center Book Circle Icon */}
            <div className="w-20 h-20 rounded-full bg-slate-100/90 text-slate-400 flex items-center justify-center mb-6 ring-8 ring-slate-50">
              <BookOpen className="w-10 h-10 stroke-[1.5]" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              No enrolled courses yet
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm mb-8 font-normal leading-relaxed">
              Start your learning journey by enrolling in courses that interest you.
            </p>

            <button
              onClick={onNavigateCourses}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          /* Enrolled Courses Grid & Student Classroom */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Active Enrolled Programs ({enrolledCourses.length})
              </h2>
              <span className="text-xs text-slate-500">
                24/7 Unlimited Access
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {course.category}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-1 line-clamp-1">
                          {course.title}
                        </h3>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-5">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Course Progress</span>
                        <span className="text-blue-600">32% Completed</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full w-[32%]" />
                      </div>
                    </div>

                    {/* Meta highlights */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span>Next Live: Tomorrow 8 PM</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
                        <FileText className="w-3.5 h-3.5 text-purple-500" />
                        <span>12 Lecture Sheets</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectCourse(course.id)}
                      className="text-xs font-semibold text-slate-700 hover:text-blue-600"
                    >
                      View Syllabus
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={onNavigateExams}
                        className="px-3 py-1.5 text-xs font-bold bg-white text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-50"
                      >
                        Exams
                      </button>
                      <button
                        onClick={() => onOpenLiveClass(course)}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Enter Class</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
