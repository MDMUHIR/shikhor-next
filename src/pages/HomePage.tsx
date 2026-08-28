import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import HomeHero from "../components/HomeHero";
import LearningPaths from "../components/LearningPaths";
import StudentReviews from "../components/StudentReviews";
import FeaturedBatchesSection from "../components/FeaturedBatchesSection";
import { PhoneCall } from "lucide-react";
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

      <FeaturedBatchesSection
        courses={courses}
        onViewAll={() => navigate("/courses")}
        onSelectCourse={(courseId) => {
          const target = courses.find((course) => course.id === courseId);
          navigate(`/courses/${target?.slug || courseId}`);
        }}
        onEnrollCourse={handleEnrollClick}
      />

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
