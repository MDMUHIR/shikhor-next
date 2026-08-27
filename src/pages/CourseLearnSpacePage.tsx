import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  FileText,
  MessageSquare,
  Award,
  Video,
  Download,
  Clock,
  Send,
  Sparkles,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

export default function CourseLearnSpacePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, user, setActiveLiveClassCourse } = useApp();

  const course = courses.find((c) => c.slug === courseId || c.id === courseId);

  const [activeTab, setActiveTab] = useState<'lessons' | 'notes' | 'discussion' | 'exams'>('lessons');
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0]);
  const [comments, setComments] = useState<{ id: string; user: string; text: string; time: string }[]>([
    { id: '1', user: 'Tanvir Hossain', text: 'Sir, vector product cross rule er shortcut টা খুব সুন্দর ছিল!', time: '2h ago' },
    { id: '2', user: 'Nabila Karim', text: 'Practice exam er solution sheet kothay pabo?', time: '45m ago' },
  ]);
  const [newComment, setNewComment] = useState('');

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Classroom Batch Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested learning space is not available.</p>
        <button
          onClick={() => navigate('/learn')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Courses</span>
        </button>
      </div>
    );
  }

  const allLessons = course.syllabus?.flatMap((s, sIdx) =>
    s.lessons.map((lesson, lIdx) => ({
      title: lesson,
      sectionTitle: s.title,
      duration: '45 min',
      index: sIdx * 10 + lIdx,
    }))
  ) || [
    { title: 'Lecture 01: Core Concept & Mathematical Induction', sectionTitle: 'Foundations', duration: '50 min', index: 0 },
    { title: 'Lecture 02: Numerical Problems & Speed Hacks', sectionTitle: 'Foundations', duration: '45 min', index: 1 },
    { title: 'Lecture 03: CQ & Creative Model Solutions', sectionTitle: 'Chapter Mastery', duration: '55 min', index: 2 },
  ];

  const currentLesson = allLessons[currentLessonIdx] || allLessons[0];

  const handleToggleComplete = (idx: number) => {
    if (completedLessons.includes(idx)) {
      setCompletedLessons(completedLessons.filter((i) => i !== idx));
    } else {
      setCompletedLessons([...completedLessons, idx]);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        user: user?.name || 'Student',
        text: newComment.trim(),
        time: 'Just now',
      },
    ]);
    setNewComment('');
  };

  const progressPercentage = Math.round((completedLessons.length / Math.max(allLessons.length, 1)) * 100);

  return (
    <div className="min-h-screen rm-page-bg py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/learn')}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
                {course.category} Online Classroom
              </span>
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 mt-1">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-700">Course Progress</div>
              <div className="text-xs text-blue-600 font-extrabold">{progressPercentage}% Completed</div>
            </div>
            <button
              onClick={() => setActiveLiveClassCourse(course)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Join Live Stream</span>
            </button>
          </div>
        </div>

        {/* Video Player & Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Player & Content Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Video Box */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800">
              <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <img
                  src={course.banner || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200'}
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl mx-auto hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg max-w-md mx-auto">
                    {currentLesson.title}
                  </h3>
                  <p className="text-slate-300 text-xs">
                    Instructor: {course.instructors?.[0]?.name || 'Faculty Team'} • Duration: {currentLesson.duration}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3 text-white text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold">{currentLesson.sectionTitle}</span>
                </div>
                <button
                  onClick={() => handleToggleComplete(currentLessonIdx)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    completedLessons.includes(currentLessonIdx)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completedLessons.includes(currentLessonIdx) ? 'Completed' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              {[
                { id: 'lessons', label: 'Lessons Syllabus', icon: BookOpen },
                { id: 'notes', label: 'Class PDF Notes', icon: FileText },
                { id: 'discussion', label: 'Discussion & Doubt Box', icon: MessageSquare },
                { id: 'exams', label: 'Batch Quizzes', icon: Award },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            {activeTab === 'lessons' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h3 className="font-black text-slate-900 text-base">Comprehensive Topic Syllabus</h3>
                <div className="space-y-2">
                  {allLessons.map((les, idx) => {
                    const isCurrent = currentLessonIdx === idx;
                    const isDone = completedLessons.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => setCurrentLessonIdx(idx)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isCurrent
                            ? 'bg-blue-50/70 border-blue-300'
                            : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isDone
                                ? 'bg-emerald-100 text-emerald-700'
                                : isCurrent
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">{les.title}</p>
                            <p className="text-[11px] text-slate-500">{les.sectionTitle} • {les.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Play className={`w-4 h-4 ${isCurrent ? 'text-blue-600' : 'text-slate-400'}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h3 className="font-black text-slate-900 text-base">Downloadable Lecture Slides &amp; Formula Handouts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.features?.slice(0, 4).map((feat, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-bold text-xs text-slate-900">Lecture Slide #{fIdx + 1}</p>
                          <p className="text-[10px] text-slate-500">PDF • 4.8 MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Downloading Slide #${fIdx + 1} for ${course.title}`)}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )) || (
                    <div className="p-4 text-xs text-slate-500">No lecture notes uploaded yet.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h3 className="font-black text-slate-900 text-base">Student Doubt &amp; Discussion Forum</h3>
                <form onSubmit={handlePostComment} className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ask a question or share feedback on this lesson..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </form>

                <div className="space-y-3 pt-2">
                  {comments.map((c) => (
                    <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold text-slate-900">{c.user}</span>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-slate-700">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'exams' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h3 className="font-black text-slate-900 text-base">Associated Chapter Quizzes</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                        Speed MCQ
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">Weekly Concept Evaluation Test #1</h4>
                      <p className="text-xs text-slate-500">25 Questions • 25 Marks • 20 Minutes</p>
                    </div>
                    <button
                      onClick={() => navigate('/exams')}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Start Test
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Instructors, Course Outline & Help (1 Col) */}
          <div className="space-y-6">
            
            {/* Instructor Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Faculty</h4>
              {course.instructors?.map((inst, iIdx) => (
                <div key={iIdx} className="flex items-center gap-3">
                  <img
                    src={inst.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                    alt={inst.name}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900">{inst.name}</h5>
                    <p className="text-[11px] text-blue-600 font-semibold">{inst.role || inst.subject}</p>
                    <p className="text-[10px] text-slate-500">{inst.experience}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Class Schedule Box */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <Video className="w-4 h-4" />
                <span>Next Live Session</span>
              </div>
              <h4 className="font-extrabold text-base">Friday Speed Solving Masterclass</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Join our faculty live to solve difficult CQ and MCQ problems directly on digital board.
              </p>
              <button
                onClick={() => setActiveLiveClassCourse(course)}
                className="w-full py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Join Classroom Stream
              </button>
            </div>

            {/* Need Help Counselor Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 text-center">
              <HelpCircle className="w-8 h-8 text-blue-600 mx-auto" />
              <h5 className="font-bold text-slate-900 text-sm">Need Academic Support?</h5>
              <p className="text-xs text-slate-500">Contact your batch coordinator for any technical or study assistance.</p>
              <a
                href="tel:09617331133"
                className="inline-block font-bold text-xs text-blue-600 hover:text-blue-800"
              >
                Call Hotline: 09617331133
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
