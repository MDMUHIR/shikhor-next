import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  PlaySquare,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

import { getActiveHeroSlides } from "../data/heroSlides";
import { useLanguage } from "../context/LanguageContext";

interface HomeHeroProps {
  onSelectCourse: (courseId: string) => void;
  onNavigateCourses: () => void;
}

const AUTOPLAY_INTERVAL = 4500;
const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY = 450;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.98,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.98,
  }),
};

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
    label: "students",
    icon: Users,
  },
  {
    value: "66",
    label: "courses",
    icon: PlaySquare,
  },
  {
    value: "28",
    label: "teachers",
    icon: GraduationCap,
  },
  {
    value: "5,062",
    label: "videos",
    icon: Video,
  },
];

export default function HomeHero({
  onSelectCourse,
  onNavigateCourses,
}: HomeHeroProps) {
  const { t } = useLanguage();
  const slideContent = getActiveHeroSlides();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);
  const isDragging = useRef(false);
  const shouldReduceMotion = useReducedMotion();

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
    setSlideDirection(-1);
    setActiveSlide((current) =>
      current === 0 ? slideContent.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    if (slideContent.length <= 1) return;
    setSlideDirection(1);
    setActiveSlide((current) => (current + 1) % slideContent.length);
  };

  const goToSlide = (index: number) => {
    if (index < 0 || index >= slideContent.length) return;
    setSlideDirection(index >= activeSlide ? 1 : -1);
    setActiveSlide(index);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
    const distance = info.offset.x;
    const velocity = info.velocity.x;
    const shouldAdvance = Math.abs(distance) > SWIPE_THRESHOLD || Math.abs(velocity) > SWIPE_VELOCITY;

    if (shouldAdvance && (distance < 0 || velocity < 0)) {
      handleNext();
    } else if (shouldAdvance) {
      handlePrev();
    }

    window.setTimeout(() => {
      isDragging.current = false;
    }, 100);
    setIsPaused(false);
  };

  if (slideContent.length === 0) return null;

  const prevIndex =
    (activeSlide - 1 + slideContent.length) % slideContent.length;
  const nextIndex = (activeSlide + 1) % slideContent.length;
  const activeSlideContent = slideContent[activeSlide];

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
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {/* Background Ambient Glow */}
            <motion.div
              className="pointer-events-none absolute inset-x-[6%] inset-y-[6%] -z-10 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/20 via-fuchsia-500/10 to-cyan-400/20 blur-3xl"
              animate={shouldReduceMotion ? undefined : { opacity: [0.55, 0.8, 0.55], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Previous Side Peek Banner Button (Desktop) */}
            {slideContent.length > 1 && (
              <button
                type="button"
                aria-label={t("previousSlide")}
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
                aria-label={t("nextSlide")}
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
              {/* Pointer-aware slider keeps vertical page scrolling natural on touch devices. */}
              <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                <motion.a
                  key={activeSlideContent.id}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial={shouldReduceMotion ? false : "enter"}
                  animate="center"
                  exit={shouldReduceMotion ? undefined : "exit"}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  drag={shouldReduceMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => {
                    isDragging.current = true;
                    setIsPaused(true);
                  }}
                  onDragEnd={handleDragEnd}
                  className="group/card relative block h-full w-full cursor-grab overflow-hidden touch-pan-y active:cursor-grabbing"
                  style={{ touchAction: "pan-y" }}
                  href={
                    activeSlideContent.courseId
                      ? `/combo/${activeSlideContent.courseId}`
                      : activeSlideContent.link || "#"
                  }
                  onClick={(event) => {
                    if (isDragging.current) {
                      event.preventDefault();
                      return;
                    }
                    if (activeSlideContent.courseId) {
                      event.preventDefault();
                      onSelectCourse(activeSlideContent.courseId);
                    }
                  }}
                >
                  <img
                    src={activeSlideContent.image}
                    alt={activeSlideContent.alt}
                    decoding="async"
                    draggable={false}
                    className="h-full w-full select-none object-contain transition-transform duration-700 group-hover/card:scale-[1.015]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/card:bg-black/10" />
                </motion.a>
              </AnimatePresence>

              {/* Previous Control Button */}
              <button
                type="button"
                aria-label={t("previousSlide")}
                onClick={handlePrev}
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/40 text-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Next Control Button */}
              <button
                type="button"
                aria-label={t("nextSlide")}
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
                      aria-label={`${t("goToSlide")} ${idx + 1}`}
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
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Quick start card */}
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            className="group relative isolate overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 p-5 shadow-xl shadow-black/10 sm:p-6"
          >
            <motion.div
              className="pointer-events-none absolute -right-10 -top-16 -z-10 h-44 w-44 rounded-full border border-emerald-300/10"
              animate={shouldReduceMotion ? undefined : { rotate: 360, scale: [1, 1.08, 1] }}
              transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            />
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                {t("onlineCourse")}
              </span>
              <Sparkles className="h-5 w-5 text-emerald-300/70 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <h2 className="max-w-sm text-xl font-black leading-tight text-white sm:text-2xl">{t("batchesOngoing")}</h2>
            <p className="mt-2 text-sm font-semibold text-emerald-200">{t("bookSeat")}</p>

            <div className="mt-5 grid gap-2">
              {courses.map((course, index) => {
                const Icon = course.icon;
                return (
                  <motion.button
                    type="button"
                    key={course.id}
                    onClick={() => onSelectCourse(course.id)}
                    whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 340, damping: 24 }}
                    className="group/item flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-3 text-left backdrop-blur-sm transition-colors hover:border-emerald-300/40 hover:bg-white/[0.12]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300 transition-colors group-hover/item:bg-emerald-400/25 group-hover/item:text-emerald-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-black text-white">{course.title}</span>
                      <span className="mt-0.5 block truncate text-[11px] font-medium text-slate-400">{course.subtitle}</span>
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-emerald-200 transition-transform group-hover/item:translate-x-0.5">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <button type="button" onClick={onNavigateCourses} className="group/cta mt-5 inline-flex items-center gap-2 text-xs font-black text-emerald-300 transition-colors hover:text-emerald-100 sm:text-sm">
              {t("seeAllCourses")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
            </button>
          </motion.section>

          {/* Community proof card */}
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            className="relative isolate overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950 via-sky-950 to-blue-950 p-5 shadow-xl shadow-black/10 sm:p-6"
          >
            <div className="pointer-events-none absolute -bottom-20 -right-12 -z-10 h-56 w-56 rounded-full bg-blue-400/10 blur-2xl" />
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-cyan-200">
                  <Users className="h-3.5 w-3.5" />
                  {t("trustBuilding")}
                </span>
                <h2 className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">{t("seeStats")}</h2>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {stats.map((stat, statIndex) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.28 + 0.08 * statIndex, duration: 0.35 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.025 }}
                    className="group/stat rounded-2xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur-sm transition-colors hover:border-cyan-300/35 hover:bg-white/[0.12] sm:p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-500 text-white shadow-lg shadow-cyan-950/30 transition-transform group-hover/stat:rotate-6">
                        <Icon className="h-4 w-4" />
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-cyan-200/50 transition-transform group-hover/stat:translate-x-0.5" />
                    </div>
                    <p className="text-lg font-black tracking-tight text-white sm:text-xl">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-slate-400 sm:text-xs">{t(stat.label)}</p>
                  </motion.div>
                );
              })}
            </div>

            <button type="button" onClick={onNavigateCourses} className="group/cta mt-5 inline-flex items-center gap-2 text-xs font-black text-cyan-300 transition-colors hover:text-cyan-100 sm:text-sm">
              {t("seeAllCourses")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
            </button>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
