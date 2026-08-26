import { useEffect, useRef, useState } from "react";
import type React from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  PlaySquare,
  Users,
  Video,
} from "lucide-react";

import { getActiveHeroSlides } from "../data/heroSlides";

interface HomeHeroProps {
  onSelectCourse: (courseId: string) => void;
  onNavigateCourses: () => void;
}

const AUTOPLAY_INTERVAL = 2500;
const SWIPE_THRESHOLD = 50;

const courses = [
  {
    id: "ssc-27-foundation-batch",
    title: "Class 9, 10",
    subtitle: "SSC Preparation",
    icon: GraduationCap,
  },
  {
    id: "pcmb-1st-paper-combo-hsc28",
    title: "College",
    subtitle: "HSC Preparation",
    icon: BookOpen,
  },
];

const stats = [
  {
    value: "282,913",
    label: "Students",
    icon: Users,
  },
  {
    value: "66",
    label: "Courses",
    icon: PlaySquare,
  },
  {
    value: "28",
    label: "Teachers",
    icon: GraduationCap,
  },
  {
    value: "5,062",
    label: "Videos",
    icon: Video,
  },
];

export default function HomeHero({
  onSelectCourse,
  onNavigateCourses,
}: HomeHeroProps) {
  const slideContent = getActiveHeroSlides();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (slideContent.length === 0) {
      setActiveSlide(0);
      return;
    }
    if (activeSlide >= slideContent.length) {
      setActiveSlide(0);
    }
  }, [activeSlide, slideContent.length]);

  useEffect(() => {
    if (isPaused || slideContent.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideContent.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, slideContent.length]);

  const handlePrev = () => {
    if (slideContent.length <= 1) return;
    setActiveSlide((current) =>
      current === 0 ? slideContent.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    if (slideContent.length <= 1) return;
    setActiveSlide((current) => (current + 1) % slideContent.length);
  };

  const goToSlide = (index: number) => {
    if (index < 0 || index >= slideContent.length) return;
    setActiveSlide(index);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchEndX === undefined) {
      touchStartX.current = null;
      return;
    }
    const difference = touchStartX.current - touchEndX;
    if (difference > SWIPE_THRESHOLD) {
      handleNext();
    } else if (difference < -SWIPE_THRESHOLD) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (slideContent.length === 0) return null;

  const prevIndex =
    (activeSlide - 1 + slideContent.length) % slideContent.length;
  const nextIndex = (activeSlide + 1) % slideContent.length;

  return (
    <div className="main bg-linear-to-br from-cyan-950 via-sky-950 to-teal-950">
      <div className="container mx-auto px-4 pt-6 pb-12">
        {/* ------------------------------------------------------------------ */}
        {/* HERO SLIDER WITH SMOOTH ANIMATED TRACK & SIDE PEEKS */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-12 md:mb-16">
          <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background Ambient Glow */}
            <div className="pointer-events-none absolute inset-x-[6%] inset-y-[6%] -z-10 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/20 via-fuchsia-500/10 to-cyan-400/20 blur-3xl" />

            {/* Previous Side Peek Banner Button (Desktop) */}
            {slideContent.length > 1 && (
              <button
                type="button"
                aria-label="Previous slide"
                onClick={handlePrev}
                className="group/peek hidden lg:block absolute left-0 top-1/2 z-0 h-[82%] w-[13%] -translate-y-1/2 overflow-hidden rounded-2xl opacity-50 shadow-xl shadow-black/50 ring-1 ring-white/10 transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
              >
                <img
                  key={slideContent[prevIndex].id}
                  src={slideContent[prevIndex].image}
                  alt={slideContent[prevIndex].alt}
                  className="h-full w-full object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/40 to-black/70 transition-opacity duration-300 group-hover/peek:opacity-60" />
              </button>
            )}

            {/* Next Side Peek Banner Button (Desktop) */}
            {slideContent.length > 1 && (
              <button
                type="button"
                aria-label="Next slide"
                onClick={handleNext}
                className="group/peek hidden lg:block absolute right-0 top-1/2 z-0 h-[82%] w-[13%] -translate-y-1/2 overflow-hidden rounded-2xl opacity-50 shadow-xl shadow-black/50 ring-1 ring-white/10 transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
              >
                <img
                  key={slideContent[nextIndex].id}
                  src={slideContent[nextIndex].image}
                  alt={slideContent[nextIndex].alt}
                  className="h-full w-full object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-black/70 transition-opacity duration-300 group-hover/peek:opacity-60" />
              </button>
            )}

            {/* Center Card Container */}
            <div className="relative z-10 w-full lg:w-[70%] aspect-video overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-white/10 shadow-2xl shadow-black/50 bg-slate-900 transition-transform duration-500 hover:shadow-emerald-500/20">
              {/* Animated Sliding Track */}
              <div
                className="flex h-full w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slideContent.map((slide) => (
                  <div
                    key={slide.id}
                    className="h-full w-full shrink-0 flex-none"
                  >
                    <a
                      className="group/card relative block h-full w-full overflow-hidden"
                      href={
                        slide.courseId
                          ? `/combo/${slide.courseId}`
                          : slide.link || "#"
                      }
                      onClick={(e) => {
                        if (slide.courseId) {
                          e.preventDefault();
                          onSelectCourse(slide.courseId);
                        }
                      }}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        decoding="async"
                        className="h-full w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300" />
                    </a>
                  </div>
                ))}
              </div>

              {/* Previous Control Button */}
              <button
                type="button"
                aria-label="Previous slide"
                onClick={handlePrev}
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/40 text-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Next Control Button */}
              <button
                type="button"
                aria-label="Next slide"
                onClick={handleNext}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/40 text-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Indicator Dots Bar */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                {slideContent.map((s, idx) => {
                  const isActive = activeSlide === idx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => goToSlide(idx)}
                      className={`relative h-1.5 rounded-full overflow-hidden bg-white/30 transition-all duration-300 ${
                        isActive
                          ? "w-6 sm:w-8 bg-white"
                          : "w-1.5 sm:w-2 hover:bg-white/50"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FEATURE & STATS CARDS */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* ONLINE COURSES CARD */}
          <div className="bg-gradient-to-br from-emerald-900/50 via-teal-900/50 to-cyan-900/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-emerald-500/20 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">
                Online Course
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Online Batches are ongoing!
            </h2>
            <h3 className="text-xl md:text-2xl text-emerald-300 mb-6">
              Book your seat now!
            </h3>

            <div className="grid grid-cols-1 gap-4 mb-6 flex-grow">
              {courses.map((course) => {
                const Icon = course.icon;
                return (
                  <div
                    key={course.id}
                    tabIndex={0}
                    onClick={() => onSelectCourse(course.id)}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-emerald-400/50 transition-all duration-300 group cursor-pointer flex items-start space-x-3"
                  >
                    <div className="text-emerald-400 mb-3 group-hover:text-emerald-300 transition-colors flex-shrink-0">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base md:text-lg mb-1">
                        {course.title}
                      </h4>
                      <p className="text-slate-400 text-sm md:text-base">
                        {course.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onNavigateCourses}
              className="flex items-center text-emerald-400 hover:text-emerald-300 font-medium group transition-colors text-sm md:text-base mt-auto"
            >
              <span>See All Courses</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4" />
            </button>
          </div>

          {/* STATS CARD */}
          <div className="bg-gradient-to-br from-cyan-900/50 via-sky-900/50 to-blue-900/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-cyan-500/20 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium">
                Online Course
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              See the stats!
            </h2>
            <h3 className="text-xl md:text-2xl text-cyan-300 mb-6">
              The trust we are building!
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 flex-grow">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    tabIndex={0}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-slate-600/30 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer flex items-start space-x-3"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base md:text-lg mb-1">
                        {stat.value}
                      </h4>
                      <p className="text-slate-400 text-sm md:text-base">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onNavigateCourses}
              className="flex items-center text-cyan-400 hover:text-cyan-300 font-medium group transition-colors text-sm md:text-base mt-auto"
            >
              <span>See All Courses</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
