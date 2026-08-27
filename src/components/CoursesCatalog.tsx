import { useState } from 'react';
import { Search, Filter, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Course } from '../types';
import CourseCard from './CourseCard';
import { useLanguage } from '../context/LanguageContext';

interface CoursesCatalogProps {
  courses: Course[];
  initialCategory?: string;
  onSelectCourse: (courseId: string) => void;
  onEnrollCourse: (course: Course) => void;
}

export default function CoursesCatalog({
  courses,
  initialCategory = 'All',
  onSelectCourse,
  onEnrollCourse,
}: CoursesCatalogProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'priceLow' | 'priceHigh' | 'rating'>('popular');

  const categories = [
    'All',
    'HSC 28',
    'HSC 27',
    'SSC 27',
    'Admission',
    'Physics',
    'Math',
    'Chemistry',
    'ICT',
  ];

  const filteredCourses = courses
    .filter((course) => {
      const matchCategory =
        selectedCategory === 'All' ||
        course.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        course.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (course.subCategory && course.subCategory.toLowerCase().includes(selectedCategory.toLowerCase()));


      const matchSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructors.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.enrolledCount - a.enrolledCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen rm-page-bg py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Catalog Header */}
        <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] bg-[#071e22] px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/2 -z-10 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                {t('academicPrograms')}
              </div>
              <h1 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                {t('catalogTitle')}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {t('catalogDescription')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[320px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{courses.length}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">{t('courses')}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{categories.length - 1}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">{t('subjectTracks')}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">5.0</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">{t('avgRating')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Search Panel */}
        <section className="relative z-10 -mt-1 mb-8 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{t('browseStudyPath')}</p>
                  <p className="text-xs font-medium text-slate-500">
                    {filteredCourses.length} {t('coursesAvailable')}
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
                <div className="relative w-full sm:min-w-72 lg:w-80">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchCoursesTeachers')}
                    aria-label="Search courses or teachers"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:text-sm"
                  />
                </div>
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-500">
                  <Filter className="h-3.5 w-3.5 text-blue-600" />
                  <span className="whitespace-nowrap">{t('sortBy', 'Sort by')}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    aria-label="Sort courses"
                    className="min-w-28 bg-transparent text-xs font-black text-slate-800 outline-none"
                  >
                    <option value="popular">{t('popular', 'Popular')}</option>
                    <option value="rating">{t('rating', 'Rating')}</option>
                    <option value="priceLow">{t('priceLow', 'Price: Low')}</option>
                    <option value="priceHigh">{t('priceHigh', 'Price: High')}</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">{t('curatedGoals')}</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">{t('chooseNextCourse')}</h2>
          </div>
          <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 sm:inline-flex">
            {filteredCourses.length} {t('results', 'results')}
          </span>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">{t('noCourses', 'No courses match your filter')}</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">{t('tryAnother', 'Try selecting a different category or search term.')}</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl"
            >
              {t('resetFilters', 'Reset filters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={onSelectCourse}
                onEnroll={onEnrollCourse}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
