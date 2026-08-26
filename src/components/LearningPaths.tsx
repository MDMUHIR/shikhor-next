import { GraduationCap, BookOpen, Calculator, Atom, Code2, Users, ChevronRight } from 'lucide-react';

interface LearningPathsProps {
  onSelectCategory: (category: string) => void;
}

export default function LearningPaths({ onSelectCategory }: LearningPathsProps) {
  const paths = [
    {
      id: 'academic',
      title: 'Academic Courses',
      description: 'Comprehensive academic preparation for all levels',
      categoryQuery: 'HSC',
      bgColor: 'bg-blue-50/70 hover:bg-blue-100/60 border-blue-100',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-700',
      icon: GraduationCap,
    },
    {
      id: 'admission',
      title: 'Admission Courses',
      description: 'Specialized courses for university admissions',
      categoryQuery: 'Admission',
      bgColor: 'bg-emerald-50/70 hover:bg-emerald-100/60 border-emerald-100',
      iconBg: 'bg-emerald-600',
      textColor: 'text-emerald-700',
      icon: BookOpen,
    },
    {
      id: 'mathematics',
      title: 'Mathematics',
      description: 'Advanced math concepts and problem solving',
      categoryQuery: 'Math',
      bgColor: 'bg-purple-50/70 hover:bg-purple-100/60 border-purple-100',
      iconBg: 'bg-purple-600',
      textColor: 'text-purple-700',
      icon: Calculator,
    },
    {
      id: 'science',
      title: 'Science & Physics',
      description: 'Comprehensive science and physics courses',
      categoryQuery: 'Physics',
      bgColor: 'bg-amber-50/70 hover:bg-amber-100/60 border-amber-100',
      iconBg: 'bg-amber-500',
      textColor: 'text-amber-700',
      icon: Atom,
    },
    {
      id: 'technology',
      title: 'Technology',
      description: 'Modern technology and programming courses',
      categoryQuery: 'ICT',
      bgColor: 'bg-indigo-50/70 hover:bg-indigo-100/60 border-indigo-100',
      iconBg: 'bg-indigo-600',
      textColor: 'text-indigo-700',
      icon: Code2,
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Join our supportive learning community',
      categoryQuery: 'All',
      bgColor: 'bg-pink-50/70 hover:bg-pink-100/60 border-pink-100',
      iconBg: 'bg-pink-500',
      textColor: 'text-pink-700',
      icon: Users,
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
              Choose Your Learning Path
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover diverse courses across multiple disciplines designed to help you excel in your academic and admission journey.
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
                  <div className={`w-12 h-12 rounded-xl ${path.iconBg} text-white flex items-center justify-center shadow-xs mb-5 transition-transform group-hover:scale-105`}>
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
                <div className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${path.textColor} group-hover:underline`}>
                  <span>Explore</span>
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
