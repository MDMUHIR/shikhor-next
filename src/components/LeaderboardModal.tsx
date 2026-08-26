import { X, Trophy, Medal, Award, Timer, Target, Search } from 'lucide-react';
import { Exam, LeaderboardEntry } from '../types';
import { LEADERBOARD_DATA } from '../data/coursesData';
import { useState } from 'react';

interface LeaderboardModalProps {
  exam: Exam;
  onClose: () => void;
}

export default function LeaderboardModal({ exam, onClose }: LeaderboardModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = LEADERBOARD_DATA.filter((entry) =>
    entry.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.collegeOrSchool.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.roll.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-300 flex items-center justify-center">
              <Trophy className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                Live Leaderboard
              </span>
              <h2 className="text-xl font-black text-white mt-0.5">
                {exam.title}
              </h2>
            </div>
          </div>
          <p className="text-xs text-blue-100">
            {exam.subject} • Total Participants: 1,480 Students
          </p>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student by name, roll or college..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Top 3 Podium Highlights */}
        <div className="px-6 py-4 bg-gradient-to-b from-blue-50/50 to-white border-b border-slate-100 grid grid-cols-3 gap-2 text-center">
          {/* Rank 2 */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 mx-auto rounded-full bg-slate-300 text-slate-800 text-xs font-black flex items-center justify-center mb-1">
              2
            </div>
            <p className="text-xs font-bold text-slate-900 line-clamp-1">{LEADERBOARD_DATA[1]?.studentName}</p>
            <p className="text-[10px] text-blue-600 font-bold">{LEADERBOARD_DATA[1]?.score}/{exam.totalMarks}</p>
          </div>

          {/* Rank 1 */}
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 scale-105 shadow-xs">
            <div className="w-7 h-7 mx-auto rounded-full bg-amber-400 text-amber-950 text-xs font-black flex items-center justify-center mb-1 shadow-xs">
              👑 1
            </div>
            <p className="text-xs font-extrabold text-slate-900 line-clamp-1">{LEADERBOARD_DATA[0]?.studentName}</p>
            <p className="text-[10px] text-amber-700 font-black">{LEADERBOARD_DATA[0]?.score}/{exam.totalMarks}</p>
          </div>

          {/* Rank 3 */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 mx-auto rounded-full bg-amber-700/30 text-amber-900 text-xs font-black flex items-center justify-center mb-1">
              3
            </div>
            <p className="text-xs font-bold text-slate-900 line-clamp-1">{LEADERBOARD_DATA[2]?.studentName}</p>
            <p className="text-[10px] text-blue-600 font-bold">{LEADERBOARD_DATA[2]?.score}/{exam.totalMarks}</p>
          </div>
        </div>

        {/* Table List */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100 p-2">
          {filteredEntries.map((entry) => (
            <div
              key={entry.rank}
              className="p-3 hover:bg-slate-50 rounded-xl flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                    entry.rank === 1
                      ? 'bg-amber-400 text-amber-950'
                      : entry.rank === 2
                      ? 'bg-slate-300 text-slate-800'
                      : entry.rank === 3
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {entry.rank}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {entry.studentName}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {entry.collegeOrSchool} • <span className="font-mono">{entry.roll}</span>
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs sm:text-sm font-black text-blue-600">
                  {entry.score} <span className="text-[10px] text-slate-400 font-normal">/ {entry.totalMarks}</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                  <Timer className="w-3 h-3" />
                  <span>{entry.timeSpent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
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
