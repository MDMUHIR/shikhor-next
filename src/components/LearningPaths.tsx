import {
  GraduationCap,
  BookOpen,
  Calculator,
  Atom,
  Code2,
  Users,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface LearningPathsProps {
  onSelectCategory: (category: string) => void;
}

export default function LearningPaths({
  onSelectCategory,
}: LearningPathsProps) {
  const { t } = useLanguage();
  const paths = [
    {
      id: "academic",
      title: "Academic Courses",
      description: "Comprehensive academic preparation for all levels",
      categoryQuery: "HSC",
      bgColor: "bg-blue-50/70 hover:bg-blue-100/60 border-blue-100",
      iconBg: "bg-blue-600",
      textColor: "text-blue-700",
      icon: GraduationCap,
    },
    {
      id: "admission",
      title: "Admission Courses",
      description: "Specialized courses for university admissions",
      categoryQuery: "Admission",
      bgColor: "bg-emerald-50/70 hover:bg-emerald-100/60 border-emerald-100",
      iconBg: "bg-emerald-600",
      textColor: "text-emerald-700",
      icon: BookOpen,
    },

    {
      id: "community",
      title: "Community",
      description: "Join our supportive learning community",
      categoryQuery: "All",
      bgColor: "bg-pink-50/70 hover:bg-pink-100/60 border-pink-100",
      iconBg: "bg-pink-500",
      textColor: "text-pink-700",
      icon: Users,
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
              {t("chooseLearningPath", "Choose Your Learning Path")}
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t(
              "learningPathDescription",
              "Discover diverse courses across multiple disciplines designed to help you excel in your academic and admission journey.",
            )}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.id}
                onClick={() => onSelectCategory(path.categoryQuery)}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between group ${path.bgColor}`}
              >
                <div>
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 rounded-xl ${path.iconBg} text-white flex items-center justify-center shadow-xs mb-5 transition-transform group-hover:scale-105`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {path.description}
                  </p>
                </div>

                {/* Explore Link */}
                <div
                  className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${path.textColor} group-hover:underline`}
                >
                  <span>{t("explore")}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
