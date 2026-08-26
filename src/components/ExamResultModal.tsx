import { X, Award, CheckCircle2, XCircle, Clock, Target, ArrowRight, Share2 } from 'lucide-react';
import { Exam } from '../types';

interface ExamResultModalProps {
  exam: Exam;
  score?: number;
  total?: number;
  timeSpent?: string;
  onClose: () => void;
  onRetake: () => void;
}

export default function ExamResultModal({
  exam,
  score = 23,
  total = 25,
  timeSpent = '08m 45s',
  onClose,
  onRetake,
}: ExamResultModalProps) {
  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= 40;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Award className="w-9 h-9 text-amber-300" />
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
            Official Exam Result
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            {exam.title}
          </h2>
          <p className="text-xs text-purple-100">{exam.subject} • {exam.code}</p>
        </div>

        {/* Body Stats */}
        <div className="p-6 space-y-6">
          
          {/* Score Counter Card */}
          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
              Your Secured Score
            </p>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-4xl sm:text-5xl font-black text-purple-900">
                {score}
              </span>
              <span className="text-base text-slate-500 font-bold">/ {total}</span>
            </div>
            <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {percentage}% Accuracy • {isPassed ? 'Passed (Excellent!)' : 'Needs Practice'}
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400">Time Taken</p>
                <p className="font-bold text-slate-800 text-sm">{timeSpent}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400">Rank Preview</p>
                <p className="font-bold text-slate-800 text-sm">Top 5% Nationwide</p>
              </div>
            </div>
          </div>

          {/* Question Breakdown preview */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Answer Sheet Summary
            </h4>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {exam.questions?.slice(0, 3).map((q, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800 line-clamp-1">{q.question}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onRetake();
            }}
            className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Retake Exam
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
