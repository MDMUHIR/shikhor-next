import { useState } from 'react';
import { Calendar, FileQuestion, Search, Sparkles } from 'lucide-react';
import { Exam } from '../types';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState<'Public' | 'Private'>('Public');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExams = exams.filter((exam) => {
    const matchesType = exam.type === activeType;
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const publicExams = exams.filter((exam) => exam.type === 'Public').length;
  const privateExams = exams.filter((exam) => exam.type === 'Private').length;
  const totalQuestions = exams.reduce((total, exam) => total + exam.questionsCount, 0);

  return (
    <div className="min-h-screen rm-page-bg py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Exam Hub Header */}
        <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] bg-[#071e22] px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-amber-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                {t('practiceWithPurpose')}
              </div>
              <h1 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                {t('examHubTitle')}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {t('examHubDescription')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[350px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{exams.length}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">{t('totalTests')}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{totalQuestions}+</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">{t('questions')}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{publicExams + privateExams}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">{t('waysToPractice')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Search Panel */}
        <section className="relative z-10 mb-8 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                  <FileQuestion className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{t('chooseAssessment')}</p>
                  <p className="text-xs font-medium text-slate-500">{filteredExams.length} {t('examsMatch')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(['Public', 'Private'] as const).map((type) => {
                  const count = type === 'Public' ? publicExams : privateExams;
                  return (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                        activeType === type
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {type === 'Public' ? t('public') : t('private')} <span className={activeType === type ? 'text-blue-100' : 'text-slate-400'}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchExams', 'Search by chapter or subject...')}
                aria-label="Search exams"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:text-sm"
              />
            </div>
          </div>
        </section>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">{activeType === 'Public' ? t('public') : t('private')} {t('examAssessments')}</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">{t('availableExams')}</h2>
          </div>
          <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 sm:inline-flex">
            {filteredExams.length} {t('results', 'results')}
          </span>
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
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div>
                  {/* Exam Banner */}
                  <div className="relative flex aspect-video flex-col justify-between overflow-hidden bg-[#121c2b] p-5">
                    <img src={exam.banner} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen transition duration-500 group-hover:scale-105 group-hover:opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#121c2b]/80 via-[#09111c]/95 to-[#04080e]" />
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

                    {/* Center Title */}
                    <div className="relative z-10 text-center my-auto py-2">
                      <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-md sm:text-2xl">
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

                  {/* Exam Metadata */}
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-600">{exam.subject}</p>
                        <h4 className="mt-1 line-clamp-2 text-base font-black leading-6 text-slate-900">
                          {exam.title}
                        </h4>
                      </div>
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
                        {exam.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-center">
                      <div>
                        <p className="text-sm font-black text-slate-900">{exam.durationMinutes}m</p>
                        <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Duration</p>
                      </div>
                      <div className="border-x border-slate-100">
                        <p className="text-sm font-black text-slate-900">{exam.totalMarks}</p>
                        <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Total marks</p>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{exam.questionsCount}</p>
                        <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Questions</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                        <span className="truncate">Starts: {exam.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">Ends: {exam.endDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Action Buttons (Matching Screenshot #4: Retake | Leaderboard | Result) */}
                <div className="grid grid-cols-3 gap-2 p-5 pt-0">
                  
                  {/* Retake Button (Sky Blue) */}
                  <button
                    onClick={() => onTakeExam(exam)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-sky-600 px-2 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-sky-700 cursor-pointer"
                  >
                    <span>Retake</span>
                  </button>

                  {/* Leaderboard Button (Royal Blue) */}
                  <button
                    onClick={() => onViewLeaderboard(exam)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-blue-600 px-2 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700 cursor-pointer"
                  >
                    <span>Leaderboard</span>
                  </button>

                  {/* Result Button (Purple / Violet) */}
                  <button
                    onClick={() => onViewResult(exam)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-purple-600 px-2 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-purple-700 cursor-pointer"
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
