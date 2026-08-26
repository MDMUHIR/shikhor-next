import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, Home, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg space-y-6">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            404 Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Lost in Curriculum?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            The page or lecture batch you requested does not exist or has been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-1/2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </button>

          <button
            onClick={() => navigate('/courses')}
            className="w-full sm:w-1/2 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Courses</span>
          </button>
        </div>
      </div>
    </div>
  );
}
