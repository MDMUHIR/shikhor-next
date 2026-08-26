import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Exam, ProductItem, Instructor, UserProfile, NoticeAnnouncement, ExamQuestion, StudentReview, LectureComment } from '../types';
import { COURSES_DATA, EXAMS_DATA, PRODUCTS, INSTRUCTORS, STUDENT_REVIEWS, INITIAL_LECTURE_COMMENTS } from '../data/coursesData';

interface AppContextType {
  // Data
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  exams: Exam[];
  setExams: React.Dispatch<React.SetStateAction<Exam[]>>;
  products: ProductItem[];
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  instructors: Instructor[];
  setInstructors: React.Dispatch<React.SetStateAction<Instructor[]>>;
  notices: NoticeAnnouncement[];
  setNotices: React.Dispatch<React.SetStateAction<NoticeAnnouncement[]>>;
  usersList: UserProfile[];
  setUsersList: React.Dispatch<React.SetStateAction<UserProfile[]>>;
  reviews: StudentReview[];
  setReviews: React.Dispatch<React.SetStateAction<StudentReview[]>>;
  comments: LectureComment[];
  setComments: React.Dispatch<React.SetStateAction<LectureComment[]>>;
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;

  // Modal / Active Actions
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  checkoutItem: { item: Course | ProductItem; discountCode?: string } | null;
  setCheckoutItem: (item: { item: Course | ProductItem; discountCode?: string } | null) => void;
  activeExam: Exam | null;
  setActiveExam: (exam: Exam | null) => void;
  activeLeaderboard: Exam | null;
  setActiveLeaderboard: (exam: Exam | null) => void;
  activeResult: { exam: Exam; score: number; total: number; timeSpent: string } | null;
  setActiveResult: (res: { exam: Exam; score: number; total: number; timeSpent: string } | null) => void;
  activeLiveClassCourse: Course | null;
  setActiveLiveClassCourse: (course: Course | null) => void;

  // Actions
  handleEnrollClick: (course: Course, discountCode?: string) => void;
  handleBuyProduct: (product: ProductItem) => void;
  handlePaymentSuccess: (itemId: string) => void;
  handleFinishExam: (examId: string, score: number, total: number, timeSpent: string) => void;
  handleUpdateUserProfile: (updatedUser: UserProfile) => void;
  handleLogout: () => void;

  // Review System Handlers
  handleAddReview: (newRev: Omit<StudentReview, 'id' | 'date'>) => void;
  handleUpdateReview: (id: string, updated: Partial<StudentReview>) => void;
  handleDeleteReview: (id: string) => void;
  handleToggleFeatureReview: (id: string) => void;
  handleToggleReviewStatus: (id: string, status: 'approved' | 'pending' | 'rejected') => void;

  // Lecture Comment Handlers
  handleAddComment: (courseId: string, lessonId: string, text: string) => void;
  handleDeleteComment: (commentId: string) => void;
  handleLikeComment: (commentId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [exams, setExams] = useState<Exam[]>(EXAMS_DATA);
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS);
  const [instructors, setInstructors] = useState<Instructor[]>(INSTRUCTORS);
  const [reviews, setReviews] = useState<StudentReview[]>(STUDENT_REVIEWS);
  const [comments, setComments] = useState<LectureComment[]>(INITIAL_LECTURE_COMMENTS);
  const [notices, setNotices] = useState<NoticeAnnouncement[]>([
    {
      id: 'not-1',
      title: 'HSC 28 PCMB Combo Course registration is now open with 50% waiver.',
      badge: 'ADMISSION ALERT',
      date: 'Today',
      priority: 'high',
      isActive: true,
    },
    {
      id: 'not-2',
      title: 'Weekly Grand Speed MCQ Test for Physics 1st Paper starts this Friday at 8 PM.',
      badge: 'LIVE EXAM',
      date: 'Yesterday',
      priority: 'normal',
      isActive: true,
    },
  ]);

  const [usersList, setUsersList] = useState<UserProfile[]>([
    {
      id: 'usr_demo_1',
      name: 'Saadman Shakib',
      phone: '01712345678',
      email: 'saadman@gmail.com',
      institution: 'Notre Dame College',
      hscBatch: 'HSC 2026',
      role: 'student',
      enrolledCourseIds: ['pcmb-1st-paper-combo-hsc28'],
      joinedDate: 'Jan 2025',
      bloodGroup: 'B+',
      targetExam: 'BUET & Engineering',
      paymentHistory: [
        {
          id: 'PAY-8921',
          itemName: 'HSC 28 PCMB 1st Paper Combo',
          itemType: 'course',
          itemId: 'pcmb-1st-paper-combo-hsc28',
          amount: 9990,
          paymentMethod: 'bKash',
          trxId: '9KJH716A2M',
          date: '12 Jan 2025',
          status: 'Completed',
        }
      ],
      examHistory: [
        {
          examId: 'exam-1',
          examTitle: 'রাষ্ট্র, নাগরিকতা ও আইন',
          date: '18 Dec 2025',
          score: 25,
          totalMarks: 25,
          timeSpent: '07m 42s',
          accuracy: 100,
          rank: 1,
        }
      ]
    },
    {
      id: 'usr_admin_1',
      name: 'Dr. Rafid Ahmed (Admin)',
      phone: '01900000000',
      email: 'admin@shikhor.edu.bd',
      institution: 'SHIKHOR Academic Directorate',
      hscBatch: 'Lead Academician',
      role: 'admin',
      enrolledCourseIds: ['pcmb-1st-paper-combo-hsc28', 'hsc-28-ebi-combo', 'ssc-27-foundation-batch', 'buet-medical-admission-mastery'],
      joinedDate: 'Jan 2023',
    }
  ]);

  const [user, setUser] = useState<UserProfile | null>(usersList[0]);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ item: Course | ProductItem; discountCode?: string } | null>(null);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [activeLeaderboard, setActiveLeaderboard] = useState<Exam | null>(null);
  const [activeResult, setActiveResult] = useState<{ exam: Exam; score: number; total: number; timeSpent: string } | null>(null);
  const [activeLiveClassCourse, setActiveLiveClassCourse] = useState<Course | null>(null);

  const handleEnrollClick = (course: Course, discountCode?: string) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setCheckoutItem({ item: course, discountCode });
  };

  const handleBuyProduct = (product: ProductItem) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setCheckoutItem({ item: product });
  };

  const handlePaymentSuccess = (itemId: string) => {
    if (user) {
      const updatedUser: UserProfile = {
        ...user,
        enrolledCourseIds: [...new Set([...user.enrolledCourseIds, itemId])],
        paymentHistory: [
          ...(user.paymentHistory || []),
          {
            id: 'PAY-' + Math.floor(1000 + Math.random() * 9000),
            itemName: checkoutItem?.item.title || 'Course Enrollment',
            itemType: (checkoutItem?.item as any)?.pages ? 'product' : 'course',
            itemId,
            amount: checkoutItem?.item.price || 0,
            paymentMethod: 'bKash',
            trxId: 'TRX' + Math.random().toString(36).substring(2, 9).toUpperCase(),
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: 'Completed',
          }
        ]
      };
      setUser(updatedUser);
      setUsersList(usersList.map(u => u.id === user.id ? updatedUser : u));
    }
    setCheckoutItem(null);
  };

  const handleFinishExam = (examId: string, score: number, total: number, timeSpent: string) => {
    const ex = exams.find((e) => e.id === examId);
    setActiveExam(null);
    if (ex) {
      setActiveResult({ exam: ex, score, total, timeSpent });

      if (user) {
        const updatedUser: UserProfile = {
          ...user,
          examHistory: [
            {
              examId,
              examTitle: ex.title,
              date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              score,
              totalMarks: total,
              timeSpent,
              accuracy: Math.round((score / total) * 100),
              rank: Math.floor(Math.random() * 20) + 1,
            },
            ...(user.examHistory || []),
          ]
        };
        setUser(updatedUser);
        setUsersList(usersList.map(u => u.id === user.id ? updatedUser : u));
      }
    }
  };

  const handleUpdateUserProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    setUsersList(usersList.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
  };

  // Review System Handlers
  const handleAddReview = (newRev: Omit<StudentReview, 'id' | 'date'>) => {
    const created: StudentReview = {
      ...newRev,
      id: 'rev-' + Date.now(),
      date: 'Just now',
      status: newRev.status || 'approved',
      isFeatured: newRev.isFeatured !== undefined ? newRev.isFeatured : true,
      likesCount: 0,
    };
    setReviews(prev => [created, ...prev]);

    // Also update course rating / reviewsCount if matching courseId
    if (newRev.courseId) {
      setCourses(prevCourses => prevCourses.map(c => {
        if (c.id === newRev.courseId || c.slug === newRev.courseId) {
          const newCount = (c.reviewsCount || 0) + 1;
          const currentTotal = (c.rating || 5.0) * (c.reviewsCount || 1);
          const newAvg = Number(((currentTotal + newRev.rating) / (newCount)).toFixed(1));
          return {
            ...c,
            reviewsCount: newCount,
            rating: Math.min(5, Math.max(1, newAvg)),
          };
        }
        return c;
      }));
    }
  };

  const handleUpdateReview = (id: string, updated: Partial<StudentReview>) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const handleToggleFeatureReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isFeatured: !r.isFeatured } : r));
  };

  const handleToggleReviewStatus = (id: string, status: 'approved' | 'pending' | 'rejected') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // Lecture Comment Handlers
  const handleAddComment = (courseId: string, lessonId: string, text: string) => {
    if (!text.trim()) return;

    // Pick avatar / color
    const colors = [
      'bg-purple-600',
      'bg-blue-600',
      'bg-emerald-600',
      'bg-indigo-600',
      'bg-amber-600',
      'bg-rose-600',
      'bg-teal-600',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCom: LectureComment = {
      id: 'com-' + Date.now(),
      courseId,
      lessonId,
      studentName: user?.name || 'Student (You)',
      studentAvatar: user?.avatar,
      avatarBgColor: user?.avatar ? undefined : randomColor,
      text: text.trim(),
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
      replies: [],
    };
    setComments(prev => [newCom, ...prev]);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        const isLiked = !c.isLiked;
        return {
          ...c,
          isLiked,
          likes: isLiked ? c.likes + 1 : Math.max(0, c.likes - 1),
        };
      }
      return c;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        courses,
        setCourses,
        exams,
        setExams,
        products,
        setProducts,
        instructors,
        setInstructors,
        notices,
        setNotices,
        usersList,
        setUsersList,
        reviews,
        setReviews,
        comments,
        setComments,
        user,
        setUser,
        isAuthOpen,
        setIsAuthOpen,
        isProfileOpen,
        setIsProfileOpen,
        checkoutItem,
        setCheckoutItem,
        activeExam,
        setActiveExam,
        activeLeaderboard,
        setActiveLeaderboard,
        activeResult,
        setActiveResult,
        activeLiveClassCourse,
        setActiveLiveClassCourse,
        handleEnrollClick,
        handleBuyProduct,
        handlePaymentSuccess,
        handleFinishExam,
        handleUpdateUserProfile,
        handleLogout,
        handleAddReview,
        handleUpdateReview,
        handleDeleteReview,
        handleToggleFeatureReview,
        handleToggleReviewStatus,
        handleAddComment,
        handleDeleteComment,
        handleLikeComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
