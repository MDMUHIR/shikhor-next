import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';
import CourseCard from './CourseCard';

interface FeaturedBatchesSectionProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onEnrollCourse: (course: Course) => void;
  onViewAll: () => void;
}

type CategoryFilter = 'All' | Course['category'];
type SortOption = 'popular' | 'rating' | 'priceLow' | 'priceHigh';

const categoryTranslationKeys: Record<CategoryFilter, string> = {
  All: 'categoryAll',
  HSC: 'categoryHSC',
  SSC: 'categorySSC',
  Admission: 'categoryAdmission',
  Combo: 'categoryCombo',
  Skill: 'categorySkill',
};

function sortCourses(courses: Course[], sortBy: SortOption) {
  return [...courses].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating || b.enrolledCount - a.enrolledCount;
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;

    const featureScore = (course: Course) => Number(Boolean(course.isPopular)) * 2 + Number(Boolean(course.isNew));
    return featureScore(b) - featureScore(a) || b.enrolledCount - a.enrolledCount || b.rating - a.rating;
  });
}

export default function FeaturedBatchesSection({
  courses,
  onSelectCourse,
  onEnrollCourse,
  onViewAll,
}: FeaturedBatchesSectionProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [activeCourseId, setActiveCourseId] = useState(courses[0]?.id || '');
  const [showAll, setShowAll] = useState(false);

  const featuredCourses = sortCourses(courses, sortBy).slice(0, 6);
  const categories: CategoryFilter[] = [
    'All',
    ...Array.from(new Set(featuredCourses.map((course) => course.category))),
  ];
  const filteredCourses = featuredCourses.filter(
    (course) => selectedCategory === 'All' || course.category === selectedCategory,
  );
  const activeCourse = filteredCourses.find((course) => course.id === activeCourseId) || filteredCourses[0];
  const supportingCourses = filteredCourses.filter((course) => course.id !== activeCourse?.id);
  const visibleCourses = showAll ? supportingCourses : supportingCourses.slice(0, 3);
  const formatNumber = (value: number) => value.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US');
  const categoryLabel = (category: CategoryFilter) => t(categoryTranslationKeys[category], category);
  const localizedTitle = (course: Course) => language === 'bn' ? course.titleBn || course.title : course.title;
  const localizedDescription = (course: Course) => language === 'bn' ? course.shortDescriptionBn || course.shortDescription : course.shortDescription;

  useEffect(() => {
    if (activeCourse && activeCourse.id !== activeCourseId) {
      setActiveCourseId(activeCourse.id);
    }
  }, [activeCourse, activeCourseId]);

  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory, sortBy]);

  return (
    <section className="relative isolate overflow-hidden bg-[#071e22] py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute -left-32 top-12 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              {t('featuredBatchesEyebrow')}
            </div>
            <h2 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              {t('featuredBatchesTitle')}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              {t('featuredBatchesDescription')}
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:border-blue-300/40 hover:bg-white/10"
          >
            {t('viewAllBatches')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm sm:p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {categoryLabel(category)}
              </button>
            ))}
          </div>

          <label className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-slate-950/20 px-3.5 py-2.5 text-xs font-bold text-slate-400">
            <span>{t('sortPrograms')}</span>
            <ChevronDown className="h-3.5 w-3.5 text-blue-300" />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              aria-label={t('sortPrograms')}
              className="max-w-32 bg-transparent text-xs font-black text-white outline-none"
            >
              <option className="text-slate-900" value="popular">{t('popular')}</option>
              <option className="text-slate-900" value="rating">{t('rating')}</option>
              <option className="text-slate-900" value="priceLow">{t('priceLow')}</option>
              <option className="text-slate-900" value="priceHigh">{t('priceHigh')}</option>
            </select>
          </label>
        </div>

        {activeCourse ? (
          <>
            <article className="mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white text-slate-900 shadow-2xl shadow-black/20 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-72 overflow-hidden bg-slate-900 lg:min-h-[390px]">
                <img
                  src={activeCourse.banner}
                  alt={localizedTitle(activeCourse)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-slate-950/10" />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-7 sm:top-7">
                  <span className="rounded-full bg-blue-500 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white">
                    {categoryLabel(activeCourse.category)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-[11px] font-black text-slate-950">
                    <Sparkles className="h-3 w-3" />
                    {activeCourse.isPopular
                      ? t('topPick')
                      : activeCourse.isNew
                        ? t('newProgram')
                        : t('curatedProgram')}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7 sm:right-7">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200">{t('selectedProgram')}</p>
                  <h3 className="max-w-xl text-2xl font-black leading-tight sm:text-3xl">{localizedTitle(activeCourse)}</h3>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-blue-500" />
                      {formatNumber(activeCourse.enrolledCount)} {t('enrolledLabel')}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {activeCourse.rating.toFixed(1)} ({formatNumber(activeCourse.reviewsCount)})
                    </span>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-slate-600">{localizedDescription(activeCourse)}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs font-bold text-slate-600">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      {formatNumber(activeCourse.syllabus.length)} {t('learningModules')}
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs font-bold text-slate-600">
                      <Clock3 className="h-4 w-4 text-blue-500" />
                      {t('learnAtYourPace')}
                    </div>
                  </div>
                </div>

                <div className="mt-7 border-t border-slate-100 pt-5">
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400">{t('startingFrom')}</p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-blue-600">৳{formatNumber(activeCourse.price)}</span>
                        <span className="text-xs font-bold text-slate-400 line-through">৳{formatNumber(activeCourse.originalPrice)}</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                      {activeCourse.discountPercentage}% {t('off')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => onSelectCourse(activeCourse.id)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {t('viewDetails')}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEnrollCourse(activeCourse)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {t('enroll')}
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {visibleCourses.length > 0 && (
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-300">{t('curatedGoals')}</p>
                    <h3 className="mt-1 text-xl font-black text-white sm:text-2xl">{t('morePopularBatches')}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300">
                    {formatNumber(filteredCourses.length)} {t('results')}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleCourses.map((course) => (
                    <div key={course.id} onClick={() => setActiveCourseId(course.id)} className="cursor-pointer">
                      <CourseCard
                        course={course}
                        onSelect={(id) => {
                          setActiveCourseId(id);
                          onSelectCourse(id);
                        }}
                        onEnroll={onEnrollCourse}
                      />
                    </div>
                  ))}
                </div>
                {supportingCourses.length > 3 && (
                  <div className="mt-7 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAll((current) => !current)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold text-white transition hover:border-blue-300/40 hover:bg-white/10"
                    >
                      {showAll ? t('showLess') : t('showMore')}
                      <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-500" />
            <h3 className="text-lg font-black text-white">{t('featuredEmpty')}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{t('featuredEmptyDescription')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
