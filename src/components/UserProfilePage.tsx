import { useState } from 'react';
import type React from 'react';
import { 
  User, Mail, Phone, School, GraduationCap, Calendar, Shield, Award, 
  BookOpen, CheckCircle2, Clock, Download, Printer, ExternalLink, 
  Edit3, Save, Sparkles, ChevronRight, FileText, BarChart3, 
  CreditCard, ArrowLeft, Heart, Eye, LogOut, Check, AlertCircle, Video
} from 'lucide-react';
import { Course, UserProfile, PaymentRecord, UserExamRecord } from '../types';

interface UserProfilePageProps {
  user: UserProfile;
  enrolledCourses: Course[];
  onUpdateUser: (updated: UserProfile) => void;
  onSelectCourse: (courseId: string) => void;
  onOpenLiveClass: (course: Course) => void;
  onNavigateToCourses: () => void;
  onNavigateToExams: () => void;
  onOpenAdminPanel?: () => void;
  onLogout: () => void;
}

export default function UserProfilePage({
  user,
  enrolledCourses,
  onUpdateUser,
  onSelectCourse,
  onOpenLiveClass,
  onNavigateToCourses,
  onNavigateToExams,
  onOpenAdminPanel,
  onLogout,
}: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'exams' | 'payments' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentRecord | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

  // Editable Form State
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    institution: user.institution,
    hscBatch: user.hscBatch,
    bloodGroup: user.bloodGroup || 'B+',
    guardianPhone: user.guardianPhone || '01912345678',
    targetExam: user.targetExam || 'BUET & Engineering',
    bio: user.bio || 'Passionate student preparing for HSC Board & Top Engineering / Medical admissions with SHIKHOR.',
    avatar: user.avatar || '',
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      institution: formData.institution,
      hscBatch: formData.hscBatch,
      bloodGroup: formData.bloodGroup,
      guardianPhone: formData.guardianPhone,
      targetExam: formData.targetExam,
      bio: formData.bio,
      avatar: formData.avatar,
    };
    onUpdateUser(updated);
    setIsEditing(false);
    setSaveSuccessMessage(true);
    setTimeout(() => setSaveSuccessMessage(false), 3000);
  };

  const handleToggleAdminRole = () => {
    const newRole = user.role === 'admin' ? 'student' : 'admin';
    onUpdateUser({
      ...user,
      role: newRole,
    });
  };

  const payments = user.paymentHistory || [
    {
      id: 'PAY-8921',
      itemName: 'HSC 28 PCMB 1st Paper Combo',
      itemType: 'course' as const,
      itemId: 'pcmb-1st-paper-combo-hsc28',
      amount: 9990,
      paymentMethod: 'bKash' as const,
      trxId: '9KJH716A2M',
      date: '12 Jan 2025',
      status: 'Completed' as const,
    },
    {
      id: 'PAY-9042',
      itemName: 'Physics 1st Paper Smart Formula Book',
      itemType: 'product' as const,
      itemId: 'prod-physics-formula-sheet',
      amount: 199,
      paymentMethod: 'Nagad' as const,
      trxId: '8BNV391Q4L',
      date: '28 Jan 2025',
      status: 'Completed' as const,
    },
  ];

  const exams = user.examHistory || [
    {
      examId: 'hsc26-frpp-phy-1st-chap2',
      examTitle: 'HSC 26 Physics 1st Paper - Vector Mega MCQ Test',
      date: '20 Feb 2025',
      score: 28,
      totalMarks: 30,
      timeSpent: '18m 45s',
      accuracy: 93.3,
      rank: 14,
    },
    {
      examId: 'buet-eng-math-calculus-live',
      examTitle: 'BUET Engineering Math - Differential Calculus Live Exam',
      date: '14 Feb 2025',
      score: 42,
      totalMarks: 50,
      timeSpent: '41m 10s',
      accuracy: 84.0,
      rank: 8,
    },
    {
      examId: 'medical-biology-genetics-model',
      examTitle: 'Medical Biology - Genetics & Molecular Biology Test',
      date: '02 Feb 2025',
      score: 23,
      totalMarks: 25,
      timeSpent: '14m 20s',
      accuracy: 92.0,
      rank: 22,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Notification Bar if save */}
        {saveSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-lg flex items-center justify-between animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-bold">Profile details updated successfully!</span>
            </div>
            <button onClick={() => setSaveSuccessMessage(false)} className="text-xs text-white/80 hover:text-white">
              Dismiss
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PROFILE HEADER CARD */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden">
          {/* Subtle Accent Background Mesh */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/50 via-purple-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left: Avatar & Primary Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar Photo */}
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-md ring-4 ring-blue-500/20">
                    {user.name.charAt(0)}
                  </div>
                )}

                {/* Role Pill Badge */}
                <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 border border-white">
                  {user.role === 'admin' ? (
                    <>
                      <Shield className="w-3 h-3 text-purple-400" />
                      <span>Admin</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      <span>Student</span>
                    </>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {user.name}
                  </h1>
                  {user.email && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      <span>Verified Google Profile</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-600 font-medium pt-1">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <School className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{user.institution || 'Notre Dame College'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{user.hscBatch || 'HSC 2026'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 max-w-xl pt-1">
                  {user.bio || 'Redwan\'s Method online student portal member.'}
                </p>
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
              
              {/* Admin Panel Quick Link (If admin) */}
              {user.role === 'admin' && onOpenAdminPanel && (
                <button
                  onClick={onOpenAdminPanel}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-purple-500/20 transition-all flex items-center gap-1.5"
                >
                  <Shield className="w-4 h-4" />
                  <span>Open Admin CRUD Panel</span>
                </button>
              )}

              {/* Edit Profile Button */}
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsEditing(true);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              {/* Role Switcher Button (Student <-> Admin for easy testing) */}
              <button
                onClick={handleToggleAdminRole}
                className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors"
                title="Toggle student / admin test role"
              >
                Role: <span className="font-bold text-slate-900">{user.role || 'student'}</span> (Switch)
              </button>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="text-xs text-blue-700 font-semibold">Enrolled Batches</div>
              <div className="text-xl sm:text-2xl font-black text-blue-950 mt-0.5">
                {enrolledCourses.length}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
              <div className="text-xs text-indigo-700 font-semibold">Exams Taken</div>
              <div className="text-xl sm:text-2xl font-black text-indigo-950 mt-0.5">
                {exams.length}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <div className="text-xs text-emerald-700 font-semibold">Average Accuracy</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-0.5">
                89.7%
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
              <div className="text-xs text-amber-800 font-semibold">Target Goal</div>
              <div className="text-xs sm:text-sm font-bold text-amber-950 mt-1 truncate">
                {user.targetExam || 'BUET / Medical 2026'}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NAVIGATION TABS */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>My Courses ({enrolledCourses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('exams')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'exams'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Exam Results &amp; Rank</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'payments'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payment History &amp; Invoices</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Academic Details &amp; Settings</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Recent Activity & Active Batches */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Active Enrolled Batches */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Enrolled Batches</h2>
                    <p className="text-xs text-slate-500">Your active academic syllabus and routine</p>
                  </div>
                  <button
                    onClick={onNavigateToCourses}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Browse All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl">
                    <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <h3 className="text-sm font-bold text-slate-700">No batches enrolled yet</h3>
                    <p className="text-xs text-slate-400 mt-1 mb-4">Enroll in HSC 28 PCMB or EBI batches to start learning.</p>
                    <button
                      onClick={onNavigateToCourses}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                    >
                      Explore Courses
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledCourses.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={c.banner}
                            alt={c.title}
                            className="w-16 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                          />
                          <div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                              {c.category}
                            </span>
                            <h3 className="text-sm font-bold text-slate-900 mt-0.5">{c.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                              <span>34/120 Lessons</span>
                              <span>•</span>
                              <span className="text-emerald-600 font-semibold">28% Completed</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => onOpenLiveClass(c)}
                            className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Live Class</span>
                          </button>
                          <button
                            onClick={() => onSelectCourse(c.id)}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5"
                          >
                            <span>Open</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Exam Test Performances */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Recent Exam Results</h2>
                    <p className="text-xs text-slate-500">Performance and rank standing</p>
                  </div>
                  <button
                    onClick={onNavigateToExams}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>All Tests</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {exams.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{ex.examTitle}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span>{ex.date}</span>
                          <span>•</span>
                          <span>Time: {ex.timeSpent}</span>
                          <span>•</span>
                          <span className="font-semibold text-blue-600">Rank: #{ex.rank || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-sm font-black text-slate-900">
                            {ex.score} / {ex.totalMarks}
                          </div>
                          <div className="text-[11px] font-bold text-emerald-600">
                            {ex.accuracy}% Accuracy
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 1 Col: Student Identity Card & Important Notice */}
            <div className="space-y-6">
              
              {/* Student Identity Card */}
              <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 text-white border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -z-0" />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="text-xs font-mono text-cyan-300">SHIKHOR STUDENT ID</div>
                    <div className="text-[10px] px-2 py-0.5 rounded bg-white/10 font-mono text-white/80">
                      {user.id}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xl font-black text-white">{user.name}</div>
                    <div className="text-xs text-slate-300 font-medium">{user.institution}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">Batch</div>
                      <div className="font-bold text-white mt-0.5">{user.hscBatch}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">Blood Group</div>
                      <div className="font-bold text-white mt-0.5">{user.bloodGroup || 'B+'}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">Phone</div>
                      <div className="font-mono text-slate-200 mt-0.5">{user.phone}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">Joined</div>
                      <div className="text-slate-200 mt-0.5">{user.joinedDate || 'Jan 2025'}</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-[11px] text-cyan-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
                      <span>Authorized student with active online batch privileges.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Academic Notice Board */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Important Batch Notices</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/70 text-xs">
                    <div className="font-bold text-amber-900">Physics 1st Paper Vector Routine</div>
                    <p className="text-amber-800/80 text-[11px] mt-0.5">
                      Live doubt solving session with Redwan sir on Friday at 8:30 PM.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/70 text-xs">
                    <div className="font-bold text-blue-900">Monthly Model Test 04 Available</div>
                    <p className="text-blue-800/80 text-[11px] mt-0.5">
                      Chemistry Periodic Properties test is now active in the exam section.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MY COURSES */}
        {/* ========================================================================= */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">My Enrolled Courses &amp; Combos</h2>
                <p className="text-xs text-slate-500">Access class recordings, notes, formulas and doubt solving</p>
              </div>
              <button
                onClick={onNavigateToCourses}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5 self-start"
              >
                <span>Browse More Batches</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 shadow-2xs transition-all space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={c.banner}
                      alt={c.title}
                      className="w-24 h-20 rounded-2xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                        {c.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 truncate mt-1">{c.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{c.shortDescription}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span>Syllabus Progress</span>
                      <span className="text-blue-600">32%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full w-[32%]" />
                    </div>
                  </div>

                  {/* Features / Chapters */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>240+ HD Lectures</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Smart Lecture Notes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Daily Chapter MCQs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>24/7 Doubt Group</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onOpenLiveClass(c)}
                      className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Live Class</span>
                    </button>
                    <button
                      onClick={() => onSelectCourse(c.id)}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Continue Learning</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: EXAMS & RESULTS */}
        {/* ========================================================================= */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Exam Test Reports &amp; Merit History</h2>
              <p className="text-xs text-slate-500">Review your past test scores, answer keys and rankings</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Exam Title</th>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Score</th>
                      <th className="px-6 py-3.5">Accuracy</th>
                      <th className="px-6 py-3.5">Merit Rank</th>
                      <th className="px-6 py-3.5">Time Spent</th>
                      <th className="px-6 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {exams.map((ex, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 max-w-xs truncate">
                          {ex.examTitle}
                        </td>
                        <td className="px-6 py-4 text-slate-500">{ex.date}</td>
                        <td className="px-6 py-4">
                          <span className="font-mono font-black text-slate-900 text-sm">
                            {ex.score}
                          </span>
                          <span className="text-slate-400"> / {ex.totalMarks}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-emerald-600">
                          {ex.accuracy}%
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold font-mono">
                            #{ex.rank || idx + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-500">{ex.timeSpent}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={onNavigateToExams}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 font-bold transition-all text-slate-700"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: PAYMENTS & INVOICES */}
        {/* ========================================================================= */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Payment History &amp; Official Receipts</h2>
                <p className="text-xs text-slate-500">Track and download payment statements for course enrollments</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Invoice ID</th>
                      <th className="px-6 py-3.5">Item Description</th>
                      <th className="px-6 py-3.5">Method</th>
                      <th className="px-6 py-3.5">Trx ID</th>
                      <th className="px-6 py-3.5">Amount (BDT)</th>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-700">{p.id}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">{p.itemName}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-pink-50 text-pink-700 border border-pink-100">
                            {p.paymentMethod}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-500">{p.trxId}</td>
                        <td className="px-6 py-4 font-mono font-black text-slate-900 text-sm">
                          ৳ {p.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-slate-500">{p.date}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{p.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setSelectedInvoice(p)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors inline-flex items-center gap-1"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: ACADEMIC DETAILS & SETTINGS FORM */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs max-w-4xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Student Profile &amp; Academic Settings</h2>
                <p className="text-xs text-slate-500">Update your academic information for customized batch recommendations</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Guardian Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Guardian's Mobile (For SMS report)
                  </label>
                  <input
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono text-slate-900"
                  />
                </div>
              </div>

              {/* Row 3: College/School & HSC Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College / School Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Notre Dame College, Dhaka"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    HSC / SSC Batch
                  </label>
                  <select
                    value={formData.hscBatch}
                    onChange={(e) => setFormData({ ...formData, hscBatch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-900"
                  >
                    <option value="HSC 2026">HSC 2026</option>
                    <option value="HSC 2027">HSC 2027</option>
                    <option value="HSC 2028">HSC 2028</option>
                    <option value="SSC 2026">SSC 2026</option>
                    <option value="SSC 2027">SSC 2027</option>
                    <option value="Admission 2025-26">Admission 2025-26</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Blood Group & Target Exam Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Blood Group
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-900"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Target Exam
                  </label>
                  <input
                    type="text"
                    value={formData.targetExam}
                    onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                    placeholder="e.g. BUET / Medical / Dhaka University Ka"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Avatar URL / Photo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-900"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Student Bio / Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-900"
                />
              </div>

              {/* Save Button */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md hover:shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Changes</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* INVOICE PREVIEW MODAL */}
      {/* ========================================================================= */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 relative">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Official Payment Receipt</div>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">SHIKHOR Learning Platform</h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Invoice Number:</span>
                <span className="font-mono font-bold text-slate-900">{selectedInvoice.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-900">{user.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Item Name:</span>
                <span className="font-bold text-slate-900">{selectedInvoice.itemName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Gateway:</span>
                <span className="font-bold text-pink-600">{selectedInvoice.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Transaction ID (TrxID):</span>
                <span className="font-mono font-bold text-slate-900">{selectedInvoice.trxId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Date:</span>
                <span className="text-slate-700">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-black text-slate-900 bg-slate-50 px-3 rounded-xl">
                <span>Total Paid:</span>
                <span className="text-blue-600">৳ {selectedInvoice.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
