import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import UserProfilePage from '../components/UserProfilePage';
import { User, LogIn } from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, courses, handleUpdateUserProfile, setActiveLiveClassCourse, setIsAuthOpen, handleLogout } = useApp();

  const enrolledCourses = courses.filter((c) =>
    user?.enrolledCourseIds.includes(c.id)
  );

  if (!user) {
    return (
      <div className="min-h-[70vh] rm-page-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Student Profile Sign In</h2>
          <p className="text-xs text-slate-500">
            Please log in or sign in with your student account to view your enrolled courses, invoices, and exam results.
          </p>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Login to Continue</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <UserProfilePage
      user={user}
      enrolledCourses={enrolledCourses}
      onUpdateUser={handleUpdateUserProfile}
      onSelectCourse={(courseId) => {
        const c = courses.find((item) => item.id === courseId);
        navigate(`/courses/${c?.slug || courseId}`);
      }}
      onOpenLiveClass={(course) => setActiveLiveClassCourse(course)}
      onNavigateToCourses={() => navigate('/courses')}
      onNavigateToExams={() => navigate('/exams')}
      onOpenAdminPanel={() => navigate('/admin')}
      onLogout={() => {
        handleLogout();
        navigate('/');
      }}
    />
  );
}
