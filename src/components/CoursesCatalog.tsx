import { useState } from 'react';
import { Search, Filter, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Course } from '../types';
import CourseCard from './CourseCard';

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
    <div className="min-h-screen py-10 sm:py-14 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Academic &amp; Admission Programs
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3">
            Explore All Courses &amp; Combos
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select from our comprehensive subject combos and specialized foundation batches tailored for HSC &amp; SSC excellence.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          
          {/* Categories Pill List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses or teachers..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No courses match your filter</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Try selecting a different category or search term.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl"
            >
              Reset Filters
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
