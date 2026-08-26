import { X, User, Phone, Mail, GraduationCap, Award, BookOpen, LogOut, CheckCircle2 } from 'lucide-react';
import { UserProfile, Course } from '../types';

interface StudentProfileModalProps {
  user: UserProfile;
  enrolledCourses: Course[];
  onClose: () => void;
  onLogout: () => void;
  onSelectCourse: (courseId: string) => void;
}

export default function StudentProfileModal({
  user,
  enrolledCourses,
  onClose,
  onLogout,
  onSelectCourse,
}: StudentProfileModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold ring-4 ring-white/10">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {user.name}
              </h2>
              <p className="text-xs text-blue-300 font-medium mt-0.5">
                {user.hscBatch} • {user.institution}
              </p>
              <div className="inline-flex items-center gap-1 mt-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Student</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          
          {/* Contact and Batch Specs */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Mobile:</span>
              </span>
              <span className="font-mono font-bold text-slate-800">{user.phone}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Email:</span>
              </span>
              <span className="font-medium text-slate-800">{user.email}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span>Target Board:</span>
              </span>
              <span className="font-bold text-slate-800">Dhaka Board</span>
            </div>
          </div>

          {/* Enrolled Courses Summary */}
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">
              Enrolled Batches ({enrolledCourses.length})
            </h3>
            {enrolledCourses.length === 0 ? (
              <p className="text-slate-400 text-xs italic">No batches enrolled yet.</p>
            ) : (
              <div className="space-y-2">
                {enrolledCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onClose();
                      onSelectCourse(c.id);
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-white flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-bold text-slate-900 text-xs line-clamp-1">{c.title}</p>
                      <p className="text-[11px] text-blue-600 font-semibold">{c.category}</p>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      Enter
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
