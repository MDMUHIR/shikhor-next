import { Users, GraduationCap, Award, BookOpen, Star, Mail, ArrowRight } from 'lucide-react';
import { INSTRUCTORS } from '../data/coursesData';
import { Instructor } from '../types';

interface InstructorsSectionProps {
  onSelectInstructorCourses: (instructorName: string) => void;
}

export default function InstructorsSection({ onSelectInstructorCourses }: InstructorsSectionProps) {
  return (
    <div className="min-h-screen py-12 sm:py-16 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            World-Class Faculty
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Meet Our Expert Instructors
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Learn from Bangladesh&apos;s most renowned educators from BUET, DMC, and top public universities who specialize in conceptual mastery.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTRUCTORS.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-blue-300"
            >
              <div>
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-600 transition-all shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-xs">
                      ✓
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {instructor.subject}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {instructor.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {instructor.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                  {instructor.bio}
                </p>
              </div>

              <div>
                {/* Meta stats */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs mb-4">
                  <div>
                    <p className="text-slate-400 text-[10px]">Experience</p>
                    <p className="font-bold text-slate-800">{instructor.experience}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px]">Mentored</p>
                    <p className="font-bold text-blue-600">{instructor.studentsCount.toLocaleString()}+</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectInstructorCourses(instructor.name)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>View Courses ({instructor.coursesCount})</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
