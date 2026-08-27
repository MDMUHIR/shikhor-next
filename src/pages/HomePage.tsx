import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import HomeHero from "../components/HomeHero";
import LearningPaths from "../components/LearningPaths";
import StudentReviews from "../components/StudentReviews";
import CourseCard from "../components/CourseCard";
import {
  ArrowRight,
  Sparkles,
  PhoneCall,
  Award,
  Users,
  BookCheck,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { courses, handleEnrollClick } = useApp();
  const { t } = useLanguage();

  return (
    <div className="rm-page-bg space-y-0">
      {/* Hero with Interactive Carousel & Live Stats */}
      <HomeHero
        onSelectCourse={(courseId) => {
          const c = courses.find((item) => item.id === courseId);
          navigate(`/courses/${c?.slug || courseId}`);
        }}
        onNavigateCourses={() => navigate("/courses")}
      />

      {/* Featured Popular Batches Section */}
      {/* <section className="py-14 sm:py-18  mx-auto px-4 sm:px-6 lg:px-8 relative bg-gradient-to-r from-pink-200/20 to-rose-200/20 z-0">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className=" container mx-auto z-10">
          <div className="mb-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ongoing Admission</span>
              </div>

              <div className="text-center w-full  mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                    Popular Academic &amp; Foundation Combos
                  </span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Discover diverse courses across multiple disciplines designed
                  to help you excel in your academic and admission journey.
                </p>
              </div>
            </div>
            <div className="flex justify-end items-end">
              <button
                onClick={() => navigate("/courses")}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group cursor-pointer"
              >
                <span>View All Batches</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={(id) => {
                  const target = courses.find((c) => c.id === id);
                  navigate(`/courses/${target?.slug || id}`);
                }}
                onEnroll={handleEnrollClick}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* 6 Learning Paths Grid Cards */}
      <LearningPaths
        onSelectCategory={(cat) => {
          navigate(`/courses?category=${encodeURIComponent(cat)}`);
        }}
      />

      {/* Student Reviews & Testimonials */}
      <StudentReviews />

      {/* Need Help Helpline Banner */}
      <section className="py-10 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-white">
              {t("questionsEnrollment")}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t("counselorAvailability")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:09617331133"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs sm:text-sm text-white flex items-center gap-2 shadow-lg transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t("call")} 09617331133</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
