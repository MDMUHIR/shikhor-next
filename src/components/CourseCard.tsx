import { Users, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  key?: string;
  course: Course;
  onSelect: (courseId: string) => void;
  onEnroll: (course: Course, discountCode?: string) => void;
}


export default function CourseCard({ course, onSelect, onEnroll }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-blue-200">
      
      {/* Top Banner Image */}
      <div
        className="relative aspect-video overflow-hidden cursor-pointer bg-slate-900"
        onClick={() => onSelect(course.id)}
      >
        <img
          src={course.banner}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-blue-600 text-white shadow-sm">
            {course.category}
          </span>
          {course.isPopular && (
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-500 text-white flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Popular
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-600 text-white shadow-sm">
            {course.discountPercentage}% OFF
          </span>
        </div>

        {/* Bottom Banner Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
            <Users className="w-3.5 h-3.5 text-blue-300" />
            <span className="font-semibold">{course.enrolledCount.toLocaleString()} enrolled</span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-full text-amber-300">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-bold">{course.rating}</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onSelect(course.id)}
            className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer mb-2"
          >
            {course.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {course.shortDescription}
          </p>

          {/* Instructors Avatars */}
          <div className="flex items-center gap-2 mb-4 pt-2 border-t border-slate-100">
            <div className="flex -space-x-2 overflow-hidden">
              {course.instructors.slice(0, 4).map((inst) => (
                <img
                  key={inst.id}
                  src={inst.avatar}
                  alt={inst.name}
                  title={inst.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
                />
              ))}
              {course.instructors.length > 4 && (
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  +{course.instructors.length - 4}
                </div>
              )}
            </div>
            <span className="text-xs text-slate-600 font-medium">
              {course.instructors[0]?.name} {course.instructors.length > 1 && `& ${course.instructors.length - 1} more`}
            </span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-blue-600">
                ৳{course.price.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ৳{course.originalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelect(course.id)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onEnroll(course)}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-all flex items-center gap-1"
            >
              <span>Enroll</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
