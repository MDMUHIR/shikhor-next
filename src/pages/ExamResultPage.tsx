import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Award, ArrowLeft, RotateCcw, CheckCircle2, Clock, Target, Share2, BookOpen, AlertCircle } from 'lucide-react';

export default function ExamResultPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { exams, activeResult, user } = useApp();

  const exam = exams.find((e) => e.id === examId || e.code.toLowerCase() === examId?.toLowerCase()) || activeResult?.exam || exams[0];

  const score = activeResult?.score ?? 24;
  const total = activeResult?.total ?? exam?.totalMarks ?? 25;
  const timeSpent = activeResult?.timeSpent ?? '11m 45s';
  const percentage = Math.round((score / total) * 100);

  const getGradeBadge = (pct: number) => {
    if (pct >= 80) return { label: 'Outstanding (A+)', color: 'bg-emerald-500 text-white' };
    if (pct >= 70) return { label: 'Excellent (A)', color: 'bg-blue-500 text-white' };
    if (pct >= 60) return { label: 'Good (A-)', color: 'bg-indigo-500 text-white' };
    return { label: 'Needs Revision', color: 'bg-amber-500 text-white' };
  };

  const badge = getGradeBadge(percentage);

  return (
    <div className="min-h-screen rm-page-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Result Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg text-center space-y-6">
          
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner ring-8 ring-blue-50/50">
            <Award className="w-10 h-10 stroke-[1.75]" />
          </div>

          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 ${badge.color}`}>
              {badge.label}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Exam Performance Scorecard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {exam?.title} • {exam?.subject}
            </p>
          </div>

          {/* Big Score Display */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-4xl sm:text-5xl font-black text-blue-600 font-mono tracking-tight">
              {score} <span className="text-xl sm:text-2xl text-slate-400 font-sans font-medium">/ {total}</span>
            </div>
            <p className="text-xs font-bold text-slate-600 mt-2">
              Overall Accuracy: {percentage}%
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Time Spent</span>
              </div>
              <p className="font-mono font-bold text-slate-900 text-sm">{timeSpent}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Target className="w-3.5 h-3.5 text-emerald-500" />
                <span>Merit Rank</span>
              </div>
              <p className="font-mono font-bold text-emerald-700 text-sm">#4 in Batch</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                <span>Status</span>
              </div>
              <p className="font-bold text-slate-900 text-sm">Verified</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => navigate(`/exams/${exam.id}`)}
              className="w-full sm:w-1/2 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>

            <button
              onClick={() => navigate(`/exams/${exam.id}/leaderboard`)}
              className="w-full sm:w-1/2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>View Leaderboard</span>
            </button>
          </div>

          <button
            onClick={() => navigate('/exams')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 block mx-auto cursor-pointer"
          >
            ← Back to All Exams
          </button>
        </div>

      </div>
    </div>
  );
}
