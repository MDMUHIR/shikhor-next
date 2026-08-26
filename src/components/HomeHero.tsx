import { useState, useEffect, useRef } from 'react';
import type React from 'react';
import { ChevronLeft, ChevronRight, Users, PlaySquare, GraduationCap, Video, ArrowRight, BookOpen, Sparkles, ExternalLink } from 'lucide-react';

interface HomeHeroProps {
  onSelectCourse: (courseId: string) => void;
  onNavigateCourses: () => void;
}

export default function HomeHero({ onSelectCourse, onNavigateCourses }: HomeHeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const bannerSlides = [
    {
      courseId: 'pcmb-1st-paper-combo-hsc28',
      title: 'HSC 28 PCMB Combo Batch',
      subtitle: 'Physics 1st • Chemistry 1st • Higher Math 1st • Biology 1st',
      tag: 'ADMISSION & BOARD FOUNDATION',
      badge: '50% OFF',
      price: '৳ 9,990',
      originalPrice: '৳ 20,000',
      enrolled: '4,516+ Students Enrolled',
      gradient: 'from-slate-950 via-blue-950/90 to-indigo-950/80',
      accentGlow: 'from-blue-600/30 to-indigo-600/20',
      borderColor: 'border-blue-500/30',
      badgeColor: 'bg-blue-600 text-white',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&auto=format&fit=crop&q=85',
      teachers: [
        { name: 'Redwan Hushen', role: 'Physics Lead' },
        { name: 'Hasan Anam', role: 'Higher Math' },
        { name: 'Fahad Shovon', role: 'Chemistry' },
        { name: 'Junnurain Khan', role: 'Biology' },
      ],
      highlights: ['240+ Live HD Classes', 'Complete 1st Paper Syllabus', '24/7 Doubt Solving'],
    },
    {
      courseId: 'hsc-28-ebi-combo',
      title: 'HSC 28 EBI 2.0 Batch',
      subtitle: 'English 1st & 2nd • Bangla 1st & 2nd • ICT Full Paper',
      tag: 'SPECIAL COMPULSORY COMBO',
      badge: 'POPULAR BATCH',
      price: '৳ 3,490',
      originalPrice: '৳ 7,000',
      enrolled: '3,820+ Students Enrolled',
      gradient: 'from-slate-950 via-amber-950/90 to-orange-950/80',
      accentGlow: 'from-amber-600/30 to-orange-600/20',
      borderColor: 'border-amber-500/30',
      badgeColor: 'bg-amber-600 text-white',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&auto=format&fit=crop&q=85',
      teachers: [
        { name: 'Hamja Sir', role: 'English' },
        { name: 'Kawsar Sir', role: 'Bangla' },
        { name: 'Faysal Sir', role: 'ICT' },
        { name: 'Jilani Sir', role: 'ICT' },
      ],
      highlights: ['120+ Interactive Classes', 'Special Grammar & Code Hacks', 'Full Exam Series'],
    },
    {
      courseId: 'buet-medical-admission-mastery',
      title: 'BUET & Medical Admission Mastery',
      subtitle: 'Engineering Physics, Chemistry & Higher Math Mastery for Top Ranks',
      tag: 'VARSITY & BUET ADMISSION',
      badge: 'TOP CHOICE',
      price: '৳ 7,490',
      originalPrice: '৳ 15,000',
      enrolled: '5,120+ Students Enrolled',
      gradient: 'from-slate-950 via-purple-950/90 to-indigo-950/80',
      accentGlow: 'from-purple-600/30 to-indigo-600/20',
      borderColor: 'border-purple-500/30',
      badgeColor: 'bg-purple-600 text-white',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=85',
      teachers: [
        { name: 'Redwan Hushen', role: 'Physics' },
        { name: 'Hasan Anam', role: 'Higher Math' },
        { name: 'Fahad Shovon', role: 'Chemistry' },
      ],
      highlights: ['20 Years BUET Solved', 'Live Speed Ranking Tests', '1-on-1 Top Tier Mentorship'],
    },
    {
      courseId: 'ssc-27-foundation-batch',
      title: 'SSC 27 Science Foundation Batch',
      subtitle: 'Class 9-10 Physics • Chemistry • General & Higher Mathematics',
      tag: 'PREMIER FOUNDATION',
      badge: 'NEW BATCH',
      price: '৳ 4,990',
      originalPrice: '৳ 10,000',
      enrolled: '2,940+ Students Enrolled',
      gradient: 'from-slate-950 via-emerald-950/90 to-teal-950/80',
      accentGlow: 'from-emerald-600/30 to-teal-600/20',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-600 text-white',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=85',
      teachers: [
        { name: 'Redwan Hushen', role: 'Physics' },
        { name: 'Hasan Anam', role: 'Higher Math' },
        { name: 'Fahad Shovon', role: 'Chemistry' },
      ],
      highlights: ['180+ Animated Classes', 'Board Standard Test Papers', 'Parent SMS Report'],
    },
  ];

  // Auto-scroll slider interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, bannerSlides.length]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative pt-4 sm:pt-6 pb-12 overflow-hidden">
      {/* Background Soft Aura Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-200/40 via-purple-200/30 to-pink-200/30 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* WIDE IMAGE BANNER SLIDER (Each image links directly to course view page) */}
        {/* ========================================================================= */}
        <div 
          id="hero-wide-image-slider"
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider Slides Container */}
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {bannerSlides.map((slide, idx) => (
              <div
                key={slide.courseId}
                id={`banner-slide-${slide.courseId}`}
                onClick={() => onSelectCourse(slide.courseId)}
                className="w-full shrink-0 relative cursor-pointer select-none overflow-hidden"
                style={{ minHeight: '340px' }}
              >
                {/* Wide Banner Aspect Ratio Wrapper */}
                <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] lg:h-[490px] flex items-center">
                  
                  {/* 1. Full-bleed Background Image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />

                  {/* 2. Rich Multi-layered Gradient Darkening & Tone Shading */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-95 sm:opacity-90`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${slide.accentGlow} mix-blend-screen opacity-60`} />

                  {/* 3. Subtle Hex/Grid High-Tech Texture Overlay */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

                  {/* 4. Clickable Floating Course View Link Pill Indicator (Top-Right) */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-lg transition-all transform hover:scale-105">
                      <span className="hidden sm:inline">Click to view course</span>
                      <span className="sm:hidden">View Course</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  </div>

                  {/* 5. Main Graphical Banner Content (Aligned across the wide banner) */}
                  <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 py-8 flex flex-col justify-between h-full">
                    
                    {/* Top Row: Category Tag & Badge */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-bold text-amber-300 tracking-wide uppercase">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {slide.tag}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-extrabold tracking-wider ${slide.badgeColor} shadow-md`}>
                        {slide.badge}
                      </span>
                      <span className="text-white/70 text-xs font-medium hidden md:inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-blue-400" />
                        {slide.enrolled}
                      </span>
                    </div>

                    {/* Middle: Prominent Course Graphics & Title */}
                    <div className="my-auto py-2">
                      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                        {slide.title}
                      </h2>
                      <p className="text-sm sm:text-lg md:text-xl text-slate-200 font-semibold mt-2 max-w-3xl drop-shadow">
                        {slide.subtitle}
                      </p>

                      {/* Course Key Bullet Highlights */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4 text-xs sm:text-sm text-slate-200">
                        {slide.highlights.map((h, i) => (
                          <div key={i} className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Row: Instructor Lineup + Price & Interactive Action Stamp */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2 border-t border-white/10">
                      {/* Instructors Row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] sm:text-xs font-medium text-slate-400 mr-1 hidden sm:inline">Instructors:</span>
                        {slide.teachers.map((t, tidx) => (
                          <div 
                            key={tidx}
                            className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/15 text-[11px] sm:text-xs font-medium text-slate-200 flex items-center gap-1"
                          >
                            <span className="font-semibold text-white">{t.name}</span>
                            <span className="text-white/40 text-[10px]">({t.role})</span>
                          </div>
                        ))}
                      </div>

                      {/* Price & View Banner Button */}
                      <div className="flex items-center gap-3">
                        <div className="text-left sm:text-right">
                          <div className="text-xl sm:text-2xl font-black text-amber-300 leading-none">
                            {slide.price}
                          </div>
                          <div className="text-xs text-slate-400 line-through mt-0.5">
                            {slide.originalPrice}
                          </div>
                        </div>

                        <div className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg group-hover:shadow-blue-500/40 transition-all">
                          <span>View Course</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Slider Prev / Next Glass Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-xl"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-xl"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Indicator Dots & Progress Bars */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            {bannerSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx
                    ? 'w-8 bg-amber-400 shadow-sm'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* 2 Dark Teal / Cyan Feature Cards Side-by-Side (from Screenshot #2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          
          {/* Card 1: Online Batches are ongoing! */}
          <div className="bg-[#0b242a] text-white rounded-3xl p-6 sm:p-8 border border-teal-900/50 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-teal-700/60 transition-all">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                Online Course
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                Online Batches are ongoing!
              </h3>
              <p className="text-teal-200/80 text-sm mb-6">
                Book your seat now!
              </p>

              {/* Items List */}
              <div className="space-y-3 mb-6">
                <div
                  onClick={() => onSelectCourse('ssc-27-foundation-batch')}
                  className="bg-[#0f333b]/80 hover:bg-[#14424d] p-4 rounded-2xl border border-teal-800/40 flex items-center gap-4 cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Class 9, 10</h4>
                    <p className="text-xs text-teal-300/80">SSC Preparation</p>
                  </div>
                </div>

                <div
                  onClick={() => onSelectCourse('pcmb-1st-paper-combo-hsc28')}
                  className="bg-[#0f333b]/80 hover:bg-[#14424d] p-4 rounded-2xl border border-teal-800/40 flex items-center gap-4 cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">College</h4>
                    <p className="text-xs text-teal-300/80">HSC Preparation</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateCourses}
              className="inline-flex items-center gap-2 text-teal-300 hover:text-white text-sm font-semibold group/btn transition-colors"
            >
              <span>See All Courses</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: See the stats! */}
          <div className="bg-[#0b242a] text-white rounded-3xl p-6 sm:p-8 border border-teal-900/50 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-teal-700/60 transition-all">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                Online Course
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                See the stats!
              </h3>
              <p className="text-cyan-200/80 text-sm mb-6">
                The trust we are building!
              </p>

              {/* 2x2 Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#0f333b]/80 p-4 rounded-2xl border border-teal-800/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-extrabold text-white leading-none">
                      282,902
                    </p>
                    <p className="text-xs text-cyan-300/80 mt-1 font-medium">Students</p>
                  </div>
                </div>

                <div className="bg-[#0f333b]/80 p-4 rounded-2xl border border-teal-800/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                    <PlaySquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-extrabold text-white leading-none">
                      66
                    </p>
                    <p className="text-xs text-cyan-300/80 mt-1 font-medium">Courses</p>
                  </div>
                </div>

                <div className="bg-[#0f333b]/80 p-4 rounded-2xl border border-teal-800/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-extrabold text-white leading-none">
                      29
                    </p>
                    <p className="text-xs text-cyan-300/80 mt-1 font-medium">Teachers</p>
                  </div>
                </div>

                <div className="bg-[#0f333b]/80 p-4 rounded-2xl border border-teal-800/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-extrabold text-white leading-none">
                      5,059
                    </p>
                    <p className="text-xs text-cyan-300/80 mt-1 font-medium">Videos</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateCourses}
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-white text-sm font-semibold group/btn transition-colors"
            >
              <span>See All Courses</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

