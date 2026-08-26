import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Trophy, ArrowLeft, Search, Medal, Clock, Target, Users, Sparkles, Filter } from 'lucide-react';
import { LEADERBOARD_DATA } from '../data/coursesData';

export default function ExamLeaderboardPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { exams } = useApp();

  const exam = exams.find((e) => e.id === examId || e.code.toLowerCase() === examId?.toLowerCase()) || exams[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCollege, setFilterCollege] = useState('All');

  const filteredEntries = LEADERBOARD_DATA.filter((entry) => {
    const matchesSearch =
      entry.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.roll.includes(searchQuery) ||
      entry.collegeOrSchool.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollege = filterCollege === 'All' || entry.collegeOrSchool.includes(filterCollege);
    return matchesSearch && matchesCollege;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/exams')}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>Live Official Leaderboard</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {exam?.title || 'Academic Merit List'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Subject: {exam?.subject} • Total Marks: {exam?.totalMarks} • Format: {exam?.format}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/exams/${exam.id}`)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Take This Exam
            </button>
          </div>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Rank 2 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 text-center shadow-2xs flex flex-col items-center justify-center order-2 sm:order-1">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 font-black text-base flex items-center justify-center mb-2 ring-4 ring-slate-50">
              🥈 #2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{LEADERBOARD_DATA[1]?.studentName}</h3>
            <p className="text-[11px] text-slate-500">{LEADERBOARD_DATA[1]?.collegeOrSchool}</p>
            <div className="mt-3 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              Score: {LEADERBOARD_DATA[1]?.score} / {exam?.totalMarks}
            </div>
          </div>

          {/* Rank 1 */}
          <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl border-2 border-amber-300 p-6 text-center shadow-md flex flex-col items-center justify-center order-1 sm:order-2 -mt-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 font-black text-xl flex items-center justify-center mb-2 ring-8 ring-amber-100 shadow-sm">
              👑 #1
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-1">
              Top Scorer
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">{LEADERBOARD_DATA[0]?.studentName}</h3>
            <p className="text-xs text-slate-600">{LEADERBOARD_DATA[0]?.collegeOrSchool}</p>
            <div className="mt-3 px-4 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black shadow-xs">
              Score: {LEADERBOARD_DATA[0]?.score} / {exam?.totalMarks} (100% Accuracy)
            </div>
          </div>

          {/* Rank 3 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 text-center shadow-2xs flex flex-col items-center justify-center order-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 font-black text-base flex items-center justify-center mb-2 ring-4 ring-amber-50/50">
              🥉 #3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{LEADERBOARD_DATA[2]?.studentName}</h3>
            <p className="text-[11px] text-slate-500">{LEADERBOARD_DATA[2]?.collegeOrSchool}</p>
            <div className="mt-3 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              Score: {LEADERBOARD_DATA[2]?.score} / {exam?.totalMarks}
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name or roll..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={filterCollege}
              onChange={(e) => setFilterCollege(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-blue-600 cursor-pointer"
            >
              <option value="All">All Colleges &amp; Schools</option>
              <option value="Notre Dame">Notre Dame College</option>
              <option value="Holy Cross">Holy Cross College</option>
              <option value="Dhaka College">Dhaka College</option>
              <option value="Rajuk">Rajuk Uttara Model</option>
            </select>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Merit Rank</th>
                  <th className="py-3.5 px-4">Student &amp; College</th>
                  <th className="py-3.5 px-4 text-center">Score</th>
                  <th className="py-3.5 px-4 text-center">Time Spent</th>
                  <th className="py-3.5 px-4 text-center">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredEntries.map((entry) => {
                  const isTop3 = entry.rank <= 3;
                  return (
                    <tr key={entry.rank} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                              entry.rank === 1
                                ? 'bg-amber-400 text-amber-950 shadow-xs'
                                : entry.rank === 2
                                ? 'bg-slate-200 text-slate-800'
                                : entry.rank === 3
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{entry.studentName}</p>
                        <p className="text-[11px] text-slate-500">{entry.collegeOrSchool} • Roll: {entry.roll}</p>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-mono font-extrabold text-blue-600 text-xs sm:text-sm">
                          {entry.score} / {entry.totalMarks}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-500 font-mono text-xs">
                        {entry.timeSpent}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                          {entry.accuracy}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
