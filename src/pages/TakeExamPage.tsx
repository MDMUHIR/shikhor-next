import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Clock, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, ArrowLeft, Award, HelpCircle } from 'lucide-react';
import { ExamQuestion } from '../types';

export default function TakeExamPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { exams, handleFinishExam, setActiveResult } = useApp();

  const exam = exams.find((e) => e.id === examId || e.code.toLowerCase() === examId?.toLowerCase());

  if (!exam) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Exam Schedule Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested test code does not exist or has concluded.</p>
        <button
          onClick={() => navigate('/exams')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exams</span>
        </button>
      </div>
    );
  }

  const questions: ExamQuestion[] = exam.questions || [
    {
      id: 1,
      question: `${exam.title} - পদার্থবিজ্ঞানের ভেক্টর বিভাজনের মূল শর্ত কোনটি?`,
      options: ['উভয় উপাংশ পরস্পর সমকোণে অবস্থিত হতে হবে', 'উপাংশ দুটির মান সর্বদাই শূন্য হবে', 'লব্ধির মান সর্বোচ্চ হতে হবে', 'কোন শর্তের প্রয়োজন নেই'],
      correctAnswer: 0,
      explanation: 'পরস্পর লম্ব উপাংশ বিভাজনের ক্ষেত্রে ভেক্টর দুটি সমকোণে কার্যকর থাকে।'
    },
    {
      id: 2,
      question: `যদি $\\vec{A} \\cdot \\vec{B} = 0$ হয়, তবে ভেক্টরদ্বয়ের মধ্যবর্তী কোণ কত?`,
      options: ['0°', '45°', '90°', '180°'],
      correctAnswer: 2,
      explanation: 'ডট গুণফল শূন্য হওয়ার অর্থ ভেক্টরদ্বয় পরস্পর লম্ব (90°)।'
    },
    {
      id: 3,
      question: `কোন বল দ্বারা কৃতকাজ শূন্য হতে পারে?`,
      options: ['অভিকর্ষজ বলের উলম্ব গতি', 'কেন্দ্রমুখী বলের অধীন গতি', 'ঘর্ষণ বলের বিপরীতে গতি', 'স্প্রিং বলের টান'],
      correctAnswer: 1,
      explanation: 'কেন্দ্রমুখী বল সরণের সাথে 90° কোণে ক্রিয়া করায় কোনো কাজ হয় না।'
    },
    {
      id: 4,
      question: `মহাকর্ষীয় বিভবের মান সর্বদা কীরূপ হয়?`,
      options: ['ধনাত্মক', 'ঋণাত্মক', 'সর্বদা শূন্য', 'অসীম'],
      correctAnswer: 1,
      explanation: 'অসীম দূরত্বের বিভবকে শূন্য ধরে হিসাব করায় মহাকর্ষীয় বিভব সর্বদা ঋণাত্মক হয়।'
    },
    {
      id: 5,
      question: `আইনস্টাইনের ভর-শক্তি সমীকরণ কোনটি?`,
      options: ['E = mc²', 'E = hf', 'E = 1/2 mv²', 'E = mgh'],
      correctAnswer: 0,
      explanation: 'ভর এবং শক্তির রূপান্তর সমীকরণ হলো E = mc²।'
    }
  ];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(exam.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    const perQuestionMark = exam.totalMarks / questions.length;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += perQuestionMark;
      }
    });
    return Math.round(score);
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    const timeSpentSeconds = (exam.durationMinutes * 60) - secondsRemaining;
    const spentM = Math.floor(timeSpentSeconds / 60);
    const spentS = timeSpentSeconds % 60;
    const timeSpentStr = `${spentM}m ${spentS}s`;

    handleFinishExam(exam.id, score, exam.totalMarks, timeSpentStr);
    setActiveResult({ exam, score, total: exam.totalMarks, timeSpent: timeSpentStr });
    navigate(`/exams/${exam.id}/result`);
  };

  const currentQ = questions[currentQuestionIdx];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to exit the exam? Your progress will be lost.')) {
                  navigate('/exams');
                }
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-600 rounded">
                  {exam.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">Code: {exam.code}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white mt-0.5 line-clamp-1">
                {exam.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400 font-mono font-bold text-sm">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={handleSubmitExam}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white shadow-md transition-colors cursor-pointer"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Question Palette Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-slate-700">Question Matrix ({answeredCount}/{totalQuestions} Answered)</span>
            <span className="text-slate-500">Negative marking: 0.25</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentQuestionIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Canvas Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-lg">
              Question {currentQuestionIdx + 1} of {totalQuestions}
            </span>
            <span className="text-xs text-slate-500">
              Marks: {Math.round(exam.totalMarks / totalQuestions)}
            </span>
          </div>

          <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === oIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];
              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-500 text-blue-950 font-semibold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-300'
                    }`}
                  >
                    {optionLetters[oIdx]}
                  </div>
                  <span className="text-xs sm:text-sm">{opt}</span>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination / Nav Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentQuestionIdx === 0}
              onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentQuestionIdx < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish &amp; View Result</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
