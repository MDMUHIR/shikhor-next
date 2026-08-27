import { BookOpen, LayoutGrid, ClipboardList, User, Play, FileText, ArrowRight, CheckCircle2, Clock, ChevronRight, Sparkles } from 'lucide-react';
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
  const learnerName = user?.name?.split(' ')[0] || 'Learner';
  const subjectTracks = enrolledCourses.reduce((total, course) => total + course.syllabus.length, 0);
  const examsAttempted = user?.examHistory?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50/80 py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Learning space header */}
        <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] bg-[#071e22] px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-10 lg:px-12 lg:py-11">
          <div className="absolute -right-20 -top-36 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Your learning space
              </div>
              <h1 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Keep going, {learnerName}.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Pick up where you left off, join your next class, or test what you know.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[350px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{enrolledCourses.length}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">Active programs</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{subjectTracks}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">Subject tracks</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{examsAttempted}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">Exams taken</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <div className="mb-9 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <button
            onClick={onNavigateCourses}
            className="group flex items-center justify-between rounded-2xl border border-blue-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100 transition group-hover:scale-105">
                <LayoutGrid className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-black text-slate-900">Browse courses</span>
                <span className="mt-1 block text-xs font-medium text-slate-500">Discover new programs</span>
              </span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
          </button>

          <button
            onClick={onNavigateExams}
            className="group flex items-center justify-between rounded-2xl border border-sky-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-inset ring-sky-100 transition group-hover:scale-105">
                <ClipboardList className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-black text-slate-900">All exams</span>
                <span className="mt-1 block text-xs font-medium text-slate-500">Practice and track results</span>
              </span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-sky-600" />
          </button>

          <button
            onClick={onNavigateProfile}
            className="group flex items-center justify-between rounded-2xl border border-indigo-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 transition group-hover:scale-105">
                <User className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-black text-slate-900">Your profile</span>
                <span className="mt-1 block text-xs font-medium text-slate-500">Account and enrollments</span>
              </span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
          </button>
        </div>

        {/* Dynamic State: If No Courses Enrolled -> Empty State matching Screenshot #1 */}
        {!hasEnrollments ? (
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-10 text-center shadow-sm sm:p-20">
            
            {/* Center Book Circle Icon */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-500 ring-8 ring-blue-50/60">
              <BookOpen className="w-10 h-10 stroke-[1.5]" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              No enrolled courses yet
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm mb-8 font-normal leading-relaxed">
              Your classroom is ready when you are. Enroll in a program to access live classes, notes, and practice exams.
            </p>

            <button
              onClick={onNavigateCourses}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Courses
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </button>
          </div>
        ) : (
          /* Enrolled Courses Grid & Student Classroom */
          <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">Your classroom</p>
                <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  Continue learning
                </h2>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                24/7 unlimited access
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="relative h-36 overflow-hidden bg-slate-900">
                    <img src={course.banner} alt={course.title} className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                      <span className="rounded-full border border-white/20 bg-slate-950/35 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
                          {course.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.18)]" />
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-black leading-7 text-slate-900 transition group-hover:text-blue-700">
                      {course.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="mb-5 mt-5 space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Course progress</span>
                        <span className="text-blue-600">32% complete</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[32%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
                      </div>
                    </div>

                    {/* Meta highlights */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                        <span className="truncate font-semibold">Tomorrow, 8 PM</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5">
                        <FileText className="h-3.5 w-3.5 shrink-0 text-purple-500" />
                        <span className="truncate font-semibold">12 lecture sheets</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
                    <button
                      onClick={() => onSelectCourse(course.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 transition hover:text-blue-600 cursor-pointer"
                    >
                      View syllabus <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={onNavigateExams}
                        className="rounded-xl border border-purple-200 bg-white px-3 py-2 text-xs font-bold text-purple-700 transition hover:bg-purple-50 cursor-pointer"
                      >
                        Exams
                      </button>
                      <button
                        onClick={() => onOpenLiveClass(course)}
                        className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-blue-600/20 cursor-pointer"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Enter class</span>
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
