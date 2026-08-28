import { useDeferredValue, useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  LayoutGrid,
  List,
  Play,
  Search,
  Sparkles,
  Target,
  User,
} from 'lucide-react';
import { Course, UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LearnDashboardProps {
  user: UserProfile | null;
  enrolledCourses: Course[];
  onNavigateCourses: () => void;
  onNavigateExams: () => void;
  onNavigateProfile: () => void;
  onSelectCourse: (courseId: string) => void;
  onOpenLiveClass: (course: Course) => void;
}

type CourseFilter = 'all' | 'progress' | 'completed';
type CourseView = 'grid' | 'list';

export default function LearnDashboard({
  user,
  enrolledCourses,
  onNavigateCourses,
  onNavigateExams,
  onNavigateProfile,
  onSelectCourse,
  onOpenLiveClass,
}: LearnDashboardProps) {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<CourseFilter>('all');
  const [courseView, setCourseView] = useState<CourseView>('grid');
  const [focusedCourseId, setFocusedCourseId] = useState(enrolledCourses[0]?.id || '');
  const [progressByCourse, setProgressByCourse] = useState<Record<string, number>>(() =>
    Object.fromEntries(enrolledCourses.map((course, index) => [course.id, index === 0 ? 32 : 0])),
  );
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const formatNumber = (value: number) => value.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US');
  const localizedTitle = (course: Course) => language === 'bn' ? course.titleBn || course.title : course.title;
  const localizedDescription = (course: Course) => language === 'bn' ? course.shortDescriptionBn || course.shortDescription : course.shortDescription;
  const categoryLabel = (course: Course) => t(`category${course.category}`, course.category);

  useEffect(() => {
    setProgressByCourse((current) => {
      const next = Object.fromEntries(
        enrolledCourses.map((course, index) => [course.id, current[course.id] ?? (index === 0 ? 32 : 0)]),
      );
      return JSON.stringify(current) === JSON.stringify(next) ? current : next;
    });

    if (!enrolledCourses.some((course) => course.id === focusedCourseId)) {
      setFocusedCourseId(enrolledCourses[0]?.id || '');
    }
  }, [enrolledCourses, focusedCourseId]);

  const filteredCourses = enrolledCourses.filter((course) => {
    const progress = progressByCourse[course.id] || 0;
    const matchesFilter = courseFilter === 'all' ||
      (courseFilter === 'progress' && progress < 100) ||
      (courseFilter === 'completed' && progress === 100);
    const query = deferredSearchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      localizedTitle(course).toLowerCase().includes(query) ||
      course.instructors.some((instructor) => instructor.name.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  const focusedCourse = enrolledCourses.find((course) => course.id === focusedCourseId) || enrolledCourses[0];
  const focusedProgress = focusedCourse ? progressByCourse[focusedCourse.id] || 0 : 0;
  const completedCourses = enrolledCourses.filter((course) => (progressByCourse[course.id] || 0) === 100).length;
  const overallProgress = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((total, course) => total + (progressByCourse[course.id] || 0), 0) / enrolledCourses.length)
    : 0;
  const totalLessons = enrolledCourses.reduce(
    (total, course) => total + course.syllabus.reduce((count, section) => count + section.lessons.length, 0),
    0,
  );

  const updateProgress = (courseId: string) => {
    setProgressByCourse((current) => ({
      ...current,
      [courseId]: Math.min(100, (current[courseId] || 0) + 8),
    }));
  };

  const resetLibraryFilters = () => {
    setSearchQuery('');
    setCourseFilter('all');
  };

  const learnerName = user?.name?.split(' ')[0] || (language === 'bn' ? 'শিক্ষার্থী' : 'Learner');

  return (
    <div className="min-h-screen bg-[#f6f8fb] py-6 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#071e22] px-6 py-7 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-9 lg:px-12 lg:py-11">
          <div className="pointer-events-none absolute -right-24 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-48 left-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_380px] lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                {t('yourLearningSpace')}
              </div>
              <h1 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                {t('keepGoing')}, {learnerName}.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {t('learningDescription')}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => focusedCourse ? onOpenLiveClass(focusedCourse) : onNavigateCourses()}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
                >
                  <Play className="h-4 w-4 fill-current" />
                  {focusedCourse ? t('continueCourse') : t('exploreCourses')}
                </button>
                <button
                  type="button"
                  onClick={onNavigateExams}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-black text-white transition hover:bg-white/10"
                >
                  <Target className="h-4 w-4 text-blue-200" />
                  {t('practiceWithPurpose')}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-blue-200">{t('courseProgress')}</p>
                  <p className="mt-1 text-lg font-black text-white">{t('keepYourMomentum')}</p>
                </div>
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full p-1"
                  style={{ background: `conic-gradient(#60a5fa ${overallProgress * 3.6}deg, rgba(255,255,255,0.12) 0deg)` }}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#102f33] text-lg font-black">
                    {formatNumber(overallProgress)}%
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                <div>
                  <p className="text-xl font-black">{formatNumber(enrolledCourses.length)}</p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">{t('activePrograms')}</p>
                </div>
                <div>
                  <p className="text-xl font-black">{formatNumber(totalLessons)}</p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">{t('lessonsLabel')}</p>
                </div>
                <div>
                  <p className="text-xl font-black">{formatNumber(completedCourses)}</p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">{t('completed')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <button
            type="button"
            onClick={onNavigateCourses}
            className="group flex items-center justify-between rounded-2xl border border-blue-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100 transition group-hover:scale-105"><LayoutGrid className="h-5 w-5" /></span>
              <span><span className="block text-sm font-black text-slate-900">{t('browseCourses')}</span><span className="mt-1 block text-xs font-medium text-slate-500">{t('discoverPrograms')}</span></span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
          </button>
          <button
            type="button"
            onClick={onNavigateExams}
            className="group flex items-center justify-between rounded-2xl border border-sky-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-inset ring-sky-100 transition group-hover:scale-105"><ClipboardList className="h-5 w-5" /></span>
              <span><span className="block text-sm font-black text-slate-900">{t('allExams')}</span><span className="mt-1 block text-xs font-medium text-slate-500">{t('practiceResults')}</span></span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-sky-600" />
          </button>
          <button
            type="button"
            onClick={onNavigateProfile}
            className="group flex items-center justify-between rounded-2xl border border-indigo-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 transition group-hover:scale-105"><User className="h-5 w-5" /></span>
              <span><span className="block text-sm font-black text-slate-900">{t('profile')}</span><span className="mt-1 block text-xs font-medium text-slate-500">{t('accountEnrollments')}</span></span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
          </button>
        </div>

        {!enrolledCourses.length ? (
          <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-500 ring-8 ring-blue-50/60"><BookOpen className="h-10 w-10 stroke-[1.5]" /></div>
              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">{t('yourClassroom')}</p>
              <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{t('noEnrolledCourses')}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">{t('classroomReady')}</p>
              <button type="button" onClick={onNavigateCourses} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                {t('exploreCourses')}<ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="min-w-0">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">{t('yourClassroom')}</p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">{t('learningLibrary')}</h2>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" />{t('unlimitedAccess')}</span>
              </div>

              <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="relative min-w-0 flex-1">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder={t('searchMyCourses')}
                      aria-label={t('searchMyCourses')}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
                      {[
                        { id: 'all', label: t('allProgramsFilter') },
                        { id: 'progress', label: t('inProgress') },
                        { id: 'completed', label: t('completed') },
                      ].map((filter) => (
                        <button
                          key={filter.id}
                          type="button"
                          onClick={() => setCourseFilter(filter.id as CourseFilter)}
                          className={`rounded-lg px-2.5 py-2 text-[11px] font-bold transition sm:px-3 ${courseFilter === filter.id ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                    <div className="hidden items-center gap-1 rounded-xl border border-slate-200 p-1 sm:flex">
                      <button type="button" onClick={() => setCourseView('grid')} aria-label={t('gridView')} className={`rounded-lg p-2 ${courseView === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}><LayoutGrid className="h-4 w-4" /></button>
                      <button type="button" onClick={() => setCourseView('list')} aria-label={t('listView')} className={`rounded-lg p-2 ${courseView === 'list' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}><List className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
                  <Search className="mx-auto mb-3 h-9 w-9 text-slate-300" />
                  <h3 className="text-base font-black text-slate-900">{t('noMatchingCourses')}</h3>
                  <button type="button" onClick={resetLibraryFilters} className="mt-4 text-xs font-black text-blue-600 hover:text-blue-800">{t('clearSearch')}</button>
                </div>
              ) : (
                <div className={courseView === 'grid' ? 'grid grid-cols-1 gap-5 xl:grid-cols-2' : 'space-y-4'}>
                  {filteredCourses.map((course) => {
                    const progress = progressByCourse[course.id] || 0;
                    const isFocused = focusedCourse?.id === course.id;
                    const lessonCount = course.syllabus.reduce((count, section) => count + section.lessons.length, 0);
                    return (
                      <article key={course.id} className={`group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${isFocused ? 'border-blue-300 ring-2 ring-blue-500/10' : 'border-slate-200'}`}>
                        <div className={courseView === 'list' ? 'flex flex-col sm:flex-row' : ''}>
                          <div className={`relative overflow-hidden bg-slate-900 ${courseView === 'list' ? 'h-36 sm:h-auto sm:w-48' : 'h-40'}`}>
                            <img src={course.banner} alt={localizedTitle(course)} className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
                            <div className="absolute left-4 top-4 flex items-center gap-2">
                              <span className="rounded-full border border-white/20 bg-slate-950/40 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm">{categoryLabel(course)}</span>
                              {progress === 100 && <span className="rounded-full bg-emerald-400 px-2.5 py-1 text-[10px] font-black text-emerald-950">{t('completed')}</span>}
                            </div>
                            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-200"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.18)]" />{t('activeStatus')}</span>
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
                            <div>
                              <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-black leading-7 text-slate-900 group-hover:text-blue-700">{localizedTitle(course)}</h3>
                              <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{localizedDescription(course)}</p>
                              <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-500">
                                <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-blue-500" />{formatNumber(course.syllabus.length)} {t('modulesLabel')}</span>
                                <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-purple-500" />{formatNumber(lessonCount)} {t('lessonsLabel')}</span>
                              </div>
                            </div>
                            <div className="mt-5">
                              <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500"><span>{t('courseProgress')}</span><span className="text-blue-600">{formatNumber(progress)}%</span></div>
                              <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5">
                          <button type="button" onClick={() => setFocusedCourseId(course.id)} className={`text-xs font-black transition ${isFocused ? 'text-blue-700' : 'text-slate-600 hover:text-blue-600'}`}>{isFocused ? t('focusCourse') : t('focusCourse')}</button>
                          <div className="flex items-center gap-2">
                            {progress < 100 && <button type="button" onClick={() => updateProgress(course.id)} className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-[11px] font-black text-emerald-700 transition hover:bg-emerald-50">{t('markLessonComplete')}</button>}
                            <button type="button" onClick={() => onSelectCourse(course.id)} className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-[11px] font-black text-white shadow-sm transition hover:bg-blue-700"><Play className="h-3.5 w-3.5 fill-current" />{t('continueCourse')}</button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24">
              {focusedCourse && (
                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative h-36 overflow-hidden bg-slate-900">
                    <img src={focusedCourse.banner} alt={localizedTitle(focusedCourse)} className="h-full w-full object-cover opacity-75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-200">{t('nextLesson')}</p><h3 className="mt-1 line-clamp-2 text-base font-black text-white">{localizedTitle(focusedCourse)}</h3></div>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500"><span>{t('courseProgress')}</span><span className="text-blue-600">{formatNumber(focusedProgress)}%</span></div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" style={{ width: `${focusedProgress}%` }} /></div>
                    <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-xs font-bold text-blue-800"><Clock3 className="h-4 w-4 shrink-0 text-blue-600" />{t('weeklyGoalDescription')}</div>
                    <button type="button" onClick={() => onSelectCourse(focusedCourse.id)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-700">{t('continueCourse')}<ArrowRight className="h-4 w-4" /></button>
                  </div>
                </section>
              )}

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">{t('weeklyGoal')}</p><h3 className="mt-1 text-base font-black text-slate-900">{t('studyRhythm')}</h3></div><Target className="h-5 w-5 text-blue-500" /></div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><div><p className="text-xs font-black text-slate-800">{t('continueLearning')}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{t('weeklyGoalDescription')}</p></div></div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3"><ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" /><div><p className="text-xs font-black text-slate-800">{t('recentActivity')}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{user?.examHistory?.length ? `${formatNumber(user.examHistory.length)} ${t('examsTaken')}` : t('noExamAttempts')}</p></div></div>
                </div>
                <button type="button" onClick={onNavigateExams} className="mt-4 inline-flex items-center gap-1 text-xs font-black text-blue-600 transition hover:text-blue-800">{t('viewResults')}<ArrowRight className="h-3.5 w-3.5" /></button>
              </section>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
