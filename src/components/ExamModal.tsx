import { useState, useEffect } from 'react';
import { X, Clock, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, Award } from 'lucide-react';
import { Exam, ExamQuestion } from '../types';

interface ExamModalProps {
  exam: Exam;
  onClose: () => void;
  onFinishExam: (examId: string, score: number, total: number, timeSpent: string) => void;
}

export default function ExamModal({ exam, onClose, onFinishExam }: ExamModalProps) {
  const questions: ExamQuestion[] = exam.questions || [
    {
      id: 1,
      question: `${exam.title} বিষয়ক মৌলিক প্রশ্ন ১`,
      options: ['বিকল্প ক', 'বিকল্প খ', 'বিকল্প গ', 'বিকল্প ঘ'],
      correctAnswer: 1,
      explanation: 'সঠিক উত্তরের বিশদ ব্যাখ্যা।'
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
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += Math.round(exam.totalMarks / questions.length);
      }
    });
    return score;
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    const timeSpentSeconds = (exam.durationMinutes * 60) - secondsRemaining;
    const spentM = Math.floor(timeSpentSeconds / 60);
    const spentS = timeSpentSeconds % 60;
    const timeSpentStr = `${spentM}m ${spentS}s`;
    onFinishExam(exam.id, score, exam.totalMarks, timeSpentStr);
  };

  const currentQ = questions[currentQuestionIdx];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        
        {/* Top App Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-600 rounded">
                {exam.badge}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {exam.title}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {exam.subject} • Total Marks: {exam.totalMarks}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Exam Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* Question Navigation Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Question {currentQuestionIdx + 1} of {totalQuestions}
            </span>
            <div className="flex items-center gap-1.5">
              {questions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isCurrent = currentQuestionIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIdx(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
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

          {/* Current Question */}
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-5 leading-snug">
              {currentQuestionIdx + 1}. {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                const isCorrect = isSubmitted && currentQ.correctAnswer === optIdx;
                const isWrong = isSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm sm:text-base font-medium ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300'
                        : isWrong
                        ? 'bg-red-50 border-red-400 text-red-900 ring-2 ring-red-300'
                        : isSelected
                        ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-200'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900 mb-4">
              <strong className="block font-bold mb-1">ব্যাখ্যা (Explanation):</strong>
              {currentQ.explanation}
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
            disabled={currentQuestionIdx === 0}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-xs text-slate-500 font-medium">
            Answered: {answeredCount}/{totalQuestions}
          </span>

          <div className="flex items-center gap-2">
            {currentQuestionIdx < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx((p) => Math.min(totalQuestions - 1, p + 1))}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              !isSubmitted && (
                <button
                  onClick={handleSubmitExam}
                  className="px-6 py-2 text-xs sm:text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
                >
                  Submit Exam
                </button>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
