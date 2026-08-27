import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

// Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LearnPage from './pages/LearnPage';
import CourseLearnSpacePage from './pages/CourseLearnSpacePage';
import ExamsPage from './pages/ExamsPage';
import TakeExamPage from './pages/TakeExamPage';
import ExamLeaderboardPage from './pages/ExamLeaderboardPage';
import ExamResultPage from './pages/ExamResultPage';
import StorePage from './pages/StorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import InstructorsPage from './pages/InstructorsPage';
import InstructorDetailPage from './pages/InstructorDetailPage';
import LearningPathsPage from './pages/LearningPathsPage';
import ReviewsPage from './pages/ReviewsPage';
import ResultLookupPage from './pages/ResultLookupPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// Modals
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import LiveClassModal from './components/LiveClassModal';
import StudentProfileModal from './components/StudentProfileModal';

// Scroll Restoration on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Inner App with Layout & Routing
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    setUser,
    isAuthOpen,
    setIsAuthOpen,
    isProfileOpen,
    setIsProfileOpen,
    checkoutItem,
    setCheckoutItem,
    handlePaymentSuccess,
    activeLiveClassCourse,
    setActiveLiveClassCourse,
    handleLogout,
    courses,
  } = useApp();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <ScrollToTop />

      {/* Main Top Navigation Header */}
      {!isAdminRoute && (
        <Navbar
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLoginClick={() => setIsAuthOpen(true)}
          onOpenProfile={() => navigate('/profile')}
          onProfileClick={() => navigate('/profile')}
          onOpenAdmin={() => navigate('/admin')}
          onLogout={() => {
            handleLogout();
            navigate('/');
          }}
        />
      )}

      {/* Dynamic Multi-Page Routes */}
      <main className="flex-1">
        <PageTransition key={location.pathname}>
          <Routes>
          {/* 1. Home Page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          {/* 2. Courses Pages (Dynamic slug / id) */}
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/course/:slug" element={<CourseDetailPage />} />

          {/* 3. Learn & Student Classroom Pages */}
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:courseId" element={<CourseLearnSpacePage />} />
          <Route path="/my-courses" element={<LearnPage />} />

          {/* 4. Exams & Test Simulator Pages */}
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/exams/:examId" element={<TakeExamPage />} />
          <Route path="/exams/:examId/leaderboard" element={<ExamLeaderboardPage />} />
          <Route path="/exams/:examId/result" element={<ExamResultPage />} />
          <Route path="/leaderboard/:examId" element={<ExamLeaderboardPage />} />

          {/* 5. Store & Publications */}
          <Route path="/store" element={<StorePage />} />
          <Route path="/store/:productId" element={<ProductDetailPage />} />
          {/* Legacy product URLs remain supported. */}
          <Route path="/products" element={<StorePage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/ebooks" element={<StorePage />} />

          {/* 6. Instructors & Faculty */}
          <Route path="/instructors" element={<InstructorsPage />} />
          <Route path="/instructors/:instructorId" element={<InstructorDetailPage />} />

          {/* 7. Learning Paths & Roadmaps */}
          <Route path="/learning-paths" element={<LearningPathsPage />} />
          <Route path="/paths" element={<LearningPathsPage />} />

          {/* 8. Student Reviews & Testimonials */}
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/testimonials" element={<ReviewsPage />} />

          {/* 9. Result Verification & Roll Lookup */}
          <Route path="/result" element={<ResultLookupPage />} />
          <Route path="/result-lookup" element={<ResultLookupPage />} />
          <Route path="/results" element={<ResultLookupPage />} />

          {/* 10. Student Profile & Academic Record */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/student-profile" element={<ProfilePage />} />

          {/* 11. Admin CRUD Control Center */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/*" element={<AdminPage />} />

          {/* 12. 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </main>

      {/* Global Footer */}
      {!isAdminRoute && <Footer />}

      {/* --- Global Action Modals --- */}

      {/* 1. Auth / Login Modal */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
            setIsAuthOpen(false);
            if (loggedUser.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/profile');
            }
          }}
        />
      )}

      {/* 2. Student Profile Modal */}
      {isProfileOpen && user && (
        <StudentProfileModal
          user={user}
          enrolledCourses={courses.filter((c) => user.enrolledCourseIds.includes(c.id))}
          onClose={() => setIsProfileOpen(false)}
          onLogout={() => {
            handleLogout();
            navigate('/');
          }}
          onSelectCourse={(id) => {
            setIsProfileOpen(false);
            const found = courses.find((c) => c.id === id);
            navigate(`/courses/${found?.slug || id}`);
          }}
        />
      )}

      {/* 3. Checkout Payment Modal */}
      {checkoutItem && (
        <PaymentModal
          item={checkoutItem.item}
          discountCode={checkoutItem.discountCode}
          onClose={() => setCheckoutItem(null)}
          onPaymentSuccess={(itemId) => {
            handlePaymentSuccess(itemId);
            navigate('/learn');
          }}
        />
      )}

      {/* 4. Live Interactive Classroom Modal */}
      {activeLiveClassCourse && (
        <LiveClassModal
          course={activeLiveClassCourse}
          onClose={() => setActiveLiveClassCourse(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
