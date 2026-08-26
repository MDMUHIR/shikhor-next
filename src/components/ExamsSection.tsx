import { useState } from 'react';
import { Calendar, Clock, Award, CheckCircle2, Trophy, Play, FileQuestion, Search, Sparkles } from 'lucide-react';
import { Exam } from '../types';

interface ExamsSectionProps {
  exams: Exam[];
  onTakeExam: (exam: Exam) => void;
  onViewLeaderboard: (exam: Exam) => void;
  onViewResult: (exam: Exam) => void;
}

export default function ExamsSection({
  exams,
  onTakeExam,
  onViewLeaderboard,
  onViewResult,
}: ExamsSectionProps) {
  const [activeType, setActiveType] = useState<'Public' | 'Private'>('Public');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExams = exams.filter((exam) => {
    const matchesType = exam.type === activeType;
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header Box (Matching Screenshot #4) */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 sm:p-8 shadow-xs mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            Welcome to Redwans Method Exams
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal">
            Your comprehensive online learning platform
          </p>
        </div>

        {/* Filters and Tab Navigation (Matching Screenshot #4) */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Available Exams
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveType('Public')}
                className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeType === 'Public'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Public
              </button>
              <button
                onClick={() => setActiveType('Private')}
                className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeType === 'Private'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Private
              </button>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exam by chapter..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Exams Grid (Matching Screenshot #4) */}
        {filteredExams.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FileQuestion className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No exams found</h3>
            <p className="text-xs text-slate-500 mt-1">Try switching tabs or clearing your search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Exam Dark Banner with Glowing Bangla Typography (Matching Screenshot #4) */}
                  <div className="relative aspect-16/9 bg-radial from-[#121c2b] via-[#09111c] to-[#04080e] p-5 flex flex-col justify-between overflow-hidden">
                    {/* Background Golden Grid Pattern */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-amber-500/15 blur-2xl rounded-full pointer-events-none" />

                    {/* Top Badges */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[11px] font-extrabold tracking-wider text-white/90 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                        {exam.badge}
                      </span>
                      <span className="text-[10px] font-extrabold tracking-wider text-white bg-sky-500 px-2 py-0.5 rounded shadow-xs">
                        {exam.format}
                      </span>
                    </div>

                    {/* Center Title in Golden / Yellow Bangla Script */}
                    <div className="relative z-10 text-center my-auto py-2">
                      <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-md">
                        {exam.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-300/90 mt-1">
                        অধ্যায় ভিত্তিক এক্সাম
                      </p>
                    </div>

                    <div className="relative z-10 flex justify-end">
                      <span className="text-[10px] text-slate-400">
                        {exam.code}
                      </span>
                    </div>
                  </div>

                  {/* Exam Metadata (Date, Duration, Marks) */}
                  <div className="p-5 space-y-2.5 text-xs text-slate-600">
                    <h4 className="font-bold text-slate-900 text-base mb-3">
                      {exam.title}
                    </h4>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Starts: {exam.startDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Ends: {exam.endDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Duration: {exam.durationMinutes} minutes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Total Marks: {exam.totalMarks}</span>
                    </div>
                  </div>
                </div>

                {/* 3 Action Buttons (Matching Screenshot #4: Retake | Leaderboard | Result) */}
                <div className="p-5 pt-0 grid grid-cols-3 gap-2">
                  
                  {/* Retake Button (Sky Blue) */}
                  <button
                    onClick={() => onTakeExam(exam)}
                    className="py-2.5 px-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-2xs transition-colors text-center flex items-center justify-center gap-1"
                  >
                    <span>Retake</span>
                  </button>

                  {/* Leaderboard Button (Royal Blue) */}
                  <button
                    onClick={() => onViewLeaderboard(exam)}
                    className="py-2.5 px-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-2xs transition-colors text-center flex items-center justify-center gap-1"
                  >
                    <span>Leaderboard</span>
                  </button>

                  {/* Result Button (Purple / Violet) */}
                  <button
                    onClick={() => onViewResult(exam)}
                    className="py-2.5 px-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-2xs transition-colors text-center flex items-center justify-center gap-1"
                  >
                    <span>Result</span>
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
