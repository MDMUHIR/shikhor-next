import { Users, Award, BookOpen, ArrowRight, Sparkles, Clock, Facebook, Youtube, Instagram } from 'lucide-react';
import { INSTRUCTORS } from '../data/coursesData';
import { Instructor } from '../types';

interface InstructorsSectionProps {
  onSelectInstructorCourses: (instructorName: string) => void;
}

export default function InstructorsSection({ onSelectInstructorCourses }: InstructorsSectionProps) {
  const totalStudents = INSTRUCTORS.reduce((total, instructor) => total + instructor.studentsCount, 0);
  const totalPrograms = INSTRUCTORS.reduce((total, instructor) => total + instructor.coursesCount, 0);
  const subjectCount = new Set(INSTRUCTORS.map((instructor) => instructor.subject)).size;

  return (
    <div className="min-h-screen bg-slate-50/80 py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Faculty Header */}
        <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] bg-[#071e22] px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                The people behind the progress
              </div>
              <h1 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Learn from mentors who make hard things click.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Meet the educators helping students build durable concepts, sharper problem-solving skills, and confidence for what comes next.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[350px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{INSTRUCTORS.length}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">Expert mentors</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{subjectCount}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">Subject areas</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{Math.round(totalStudents / 1000)}k+</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">Learners reached</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">Find your guide</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">Our teaching faculty</h2>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
            <BookOpen className="h-3.5 w-3.5" />
            {totalPrograms} programs across the faculty
          </span>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTRUCTORS.map((instructor) => (
            <div
              key={instructor.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="h-full w-full object-cover object-center opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />
                <div className="absolute left-5 right-5 top-4 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/20 bg-slate-950/40 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
                    {instructor.subject}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-black text-emerald-700 shadow-sm">
                    <Award className="h-3 w-3" />
                    Verified
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-xl font-black tracking-tight text-white transition group-hover:text-blue-200">
                      {instructor.name}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-300">{instructor.role}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {[
                      { label: 'Search on Facebook', href: instructor.socialLinks?.facebook || `https://www.facebook.com/search/top?q=${encodeURIComponent(instructor.name)}`, Icon: Facebook },
                      { label: 'Search on YouTube', href: instructor.socialLinks?.youtube || `https://www.youtube.com/results?search_query=${encodeURIComponent(instructor.name)}`, Icon: Youtube },
                      { label: 'Search on Instagram', href: instructor.socialLinks?.instagram || `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(instructor.name)}`, Icon: Instagram },
                    ].map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${label}: ${instructor.name}`}
                        title={label}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-950/40 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white hover:text-[#071e22]"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="mb-5 line-clamp-3 min-h-[4.5rem] text-xs leading-6 text-slate-600 sm:text-sm">
                  {instructor.bio}
                </p>

                <div className="mb-5 grid grid-cols-2 divide-x divide-slate-200 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="pr-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      <Clock className="h-3 w-3" />
                      Experience
                    </div>
                    <p className="text-xs font-black text-slate-800">{instructor.experience}</p>
                  </div>
                  <div className="pl-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      <Users className="h-3 w-3" />
                      Mentored
                    </div>
                    <p className="text-xs font-black text-blue-600">{instructor.studentsCount.toLocaleString()}+</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectInstructorCourses(instructor.name)}
                  className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition-all hover:bg-blue-600 group/btn cursor-pointer"
                >
                  <span>Explore {instructor.coursesCount} programs</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
