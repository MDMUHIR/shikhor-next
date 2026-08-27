import { useState, useMemo } from 'react';
import type React from 'react';
import { 
  Shield, Plus, Trash2, Edit3, Check, X, Search, Filter, 
  BookOpen, Award, ShoppingBag, Users, Bell, DollarSign, 
  BarChart3, Layers, Eye, RefreshCw, Sparkles, CheckCircle2,
  Calendar, Clock, AlertTriangle, ArrowRight, ArrowLeft,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Download, Copy, MoreVertical, SlidersHorizontal, ChevronDown,
  FileSpreadsheet, FileCode, CheckSquare, Square, UserCheck,
  GraduationCap, TrendingUp, Activity, HelpCircle, Laptop,
  Menu, ExternalLink, Hash, Bookmark, BookMarked, Star,
  MessageSquare, ThumbsUp, ShieldCheck, Tv, MessageCircle
} from 'lucide-react';
import { Course, Exam, ProductItem, Instructor, UserProfile, NoticeAnnouncement, StudentReview, LectureComment } from '../types';

interface AdminPanelProps {
  courses: Course[];
  exams: Exam[];
  products: ProductItem[];
  instructors: Instructor[];
  notices: NoticeAnnouncement[];
  usersList: UserProfile[];
  reviews?: StudentReview[];
  comments?: LectureComment[];
  onUpdateCourses: (courses: Course[]) => void;
  onUpdateExams: (exams: Exam[]) => void;
  onUpdateProducts: (products: ProductItem[]) => void;
  onUpdateInstructors: (instructors: Instructor[]) => void;
  onUpdateNotices: (notices: NoticeAnnouncement[]) => void;
  onUpdateUsers: (users: UserProfile[]) => void;
  onUpdateReviews?: (reviews: StudentReview[]) => void;
  onUpdateComments?: (comments: LectureComment[]) => void;
  onBackToApp: () => void;
}

type AdminTab = 'dashboard' | 'courses' | 'exams' | 'products' | 'instructors' | 'students' | 'notices' | 'reviews' | 'comments';

export default function AdminPanel({
  courses,
  exams,
  products,
  instructors,
  notices,
  usersList,
  reviews = [],
  comments = [],
  onUpdateCourses,
  onUpdateExams,
  onUpdateProducts,
  onUpdateInstructors,
  onUpdateNotices,
  onUpdateUsers,
  onUpdateReviews,
  onUpdateComments,
  onBackToApp,
}: AdminPanelProps) {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Table Pagination & Sorting State
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal Edit States
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [isCreatingExam, setIsCreatingExam] = useState(false);

  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [isCreatingInstructor, setIsCreatingInstructor] = useState(false);

  const [editingNotice, setEditingNotice] = useState<NoticeAnnouncement | null>(null);
  const [isCreatingNotice, setIsCreatingNotice] = useState(false);

  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  const [editingReview, setEditingReview] = useState<StudentReview | null>(null);
  const [isCreatingReview, setIsCreatingReview] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'alert' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'alert' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Reset pagination & selection when switching tabs
  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedIds([]);
    setSearchQuery('');
    setCategoryFilter('ALL');
    setStatusFilter('ALL');
    setMobileMenuOpen(false);
  };

  // -------------------------------------------------------------
  // CSV & JSON EXPORT UTILITIES
  // -------------------------------------------------------------
  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) {
      showToast('No records available to export', 'alert');
      return;
    }
    const headers = Object.keys(data[0]).filter(k => typeof data[0][k] !== 'object');
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const val = row[header] ?? '';
          const escaped = ('' + val).replace(/"/g, '""');
          return `"${escaped}"`;
        }).join(',')
      )
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${data.length} records to CSV!`);
  };

  const exportToJSON = (data: any[], filename: string) => {
    if (!data.length) {
      showToast('No records available to export', 'alert');
      return;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${data.length} records to JSON!`);
  };

  // -------------------------------------------------------------
  // COURSE CRUD HANDLERS
  // -------------------------------------------------------------
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    if (isCreatingCourse) {
      onUpdateCourses([editingCourse, ...courses]);
      showToast(`Batch "${editingCourse.title}" created successfully!`);
    } else {
      onUpdateCourses(courses.map(c => c.id === editingCourse.id ? editingCourse : c));
      showToast(`Batch "${editingCourse.title}" updated successfully!`);
    }
    setEditingCourse(null);
    setIsCreatingCourse(false);
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course batch?')) {
      onUpdateCourses(courses.filter(c => c.id !== id));
      setSelectedIds(prev => prev.filter(item => item !== id));
      showToast('Course batch deleted.');
    }
  };

  const handleDuplicateCourse = (course: Course) => {
    const duplicated: Course = {
      ...course,
      id: 'course-' + Date.now(),
      title: `${course.title} (Copy)`,
      slug: `${course.slug}-copy`,
      enrolledCount: 0,
      isNew: true,
    };
    onUpdateCourses([duplicated, ...courses]);
    showToast(`Duplicated "${course.title}".`);
  };

  const handleStartCreateCourse = () => {
    const newCourse: Course = {
      id: 'course-' + Date.now(),
      title: 'HSC 28 Physics & Math Special Batch',
      slug: 'hsc-28-physics-math-special',
      category: 'HSC',
      subCategory: 'Concept & Board Mastery',
      banner: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
      price: 4990,
      originalPrice: 10000,
      discountPercentage: 50,
      enrolledCount: 1,
      rating: 5.0,
      reviewsCount: 1,
      instructors: instructors.slice(0, 2),
      shortDescription: 'Comprehensive concept-first preparation with live classes and smart notes.',
      fullDescription: 'Detailed interactive lectures with chapter exams, live doubt clearing, and dedicated mentors.',
      features: [
        '180+ Live Interactive HD Classes',
        'Chapterwise Lecture Notes PDF',
        'Weekly Speed MCQ Exams',
        '24/7 Dedicated Doubt Group'
      ],
      syllabus: [
        {
          title: 'Physics 1st Paper - Mechanics & Vectors',
          duration: '4 Weeks',
          lessons: ['Vectors Basics & Dot/Cross Product', 'Newtonian Mechanics', 'Work, Energy & Power'],
        }
      ],
      demoVideos: [
        {
          title: 'Vectors Masterclass Demo',
          instructor: 'Dr. Rafid Ahmed',
          thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
          duration: '45 mins',
        }
      ],
      isPopular: true,
      isNew: true,
    };
    setEditingCourse(newCourse);
    setIsCreatingCourse(true);
  };

  // -------------------------------------------------------------
  // EXAM CRUD HANDLERS
  // -------------------------------------------------------------
  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExam) return;

    if (isCreatingExam) {
      onUpdateExams([editingExam, ...exams]);
      showToast(`Exam "${editingExam.title}" added successfully!`);
    } else {
      onUpdateExams(exams.map(ex => ex.id === editingExam.id ? editingExam : ex));
      showToast(`Exam "${editingExam.title}" updated successfully!`);
    }
    setEditingExam(null);
    setIsCreatingExam(false);
  };

  const handleDeleteExam = (id: string) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      onUpdateExams(exams.filter(ex => ex.id !== id));
      setSelectedIds(prev => prev.filter(item => item !== id));
      showToast('Exam deleted.');
    }
  };

  const handleStartCreateExam = () => {
    const newEx: Exam = {
      id: 'exam-' + Date.now(),
      title: 'HSC 26 Physics - Thermodynamics Mega Test',
      subject: 'Physics',
      code: 'PHY-TD-01',
      banner: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
      type: 'Public',
      badge: 'MEGA TEST',
      format: 'MCQ',
      startDate: 'Live Now',
      endDate: '31 Dec 2026',
      durationMinutes: 25,
      totalMarks: 25,
      questionsCount: 25,
    };
    setEditingExam(newEx);
    setIsCreatingExam(true);
  };

  // -------------------------------------------------------------
  // STORE / PRODUCT CRUD HANDLERS
  // -------------------------------------------------------------
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isCreatingProduct) {
      onUpdateProducts([editingProduct, ...products]);
      showToast(`Product "${editingProduct.title}" added to store!`);
    } else {
      onUpdateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      showToast(`Product "${editingProduct.title}" updated!`);
    }
    setEditingProduct(null);
    setIsCreatingProduct(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Delete this store product?')) {
      onUpdateProducts(products.filter(p => p.id !== id));
      setSelectedIds(prev => prev.filter(item => item !== id));
      showToast('Store product deleted.');
    }
  };

  const handleStartCreateProduct = () => {
    const newProd: ProductItem = {
      id: 'prod-' + Date.now(),
      title: 'SHIKHOR Organic Chemistry Reaction Hackbook',
      category: 'Formula Sheet',
      author: 'Fahad Shovon',
      price: 249,
      originalPrice: 500,
      pages: 96,
      coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=600&auto=format&fit=crop&q=80',
      description: 'Concise summary charts of all named organic reactions, conversions, and mechanisms for board and varsity entrance.',
      downloadCount: 420,
    };
    setEditingProduct(newProd);
    setIsCreatingProduct(true);
  };

  // -------------------------------------------------------------
  // INSTRUCTOR CRUD HANDLERS
  // -------------------------------------------------------------
  const handleSaveInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInstructor) return;

    if (isCreatingInstructor) {
      onUpdateInstructors([...instructors, editingInstructor]);
      showToast(`Instructor "${editingInstructor.name}" added.`);
    } else {
      onUpdateInstructors(instructors.map(inst => inst.id === editingInstructor.id ? editingInstructor : inst));
      showToast(`Instructor "${editingInstructor.name}" updated.`);
    }
    setEditingInstructor(null);
    setIsCreatingInstructor(false);
  };

  const handleDeleteInstructor = (id: string) => {
    if (window.confirm('Delete this instructor profile?')) {
      onUpdateInstructors(instructors.filter(inst => inst.id !== id));
      setSelectedIds(prev => prev.filter(item => item !== id));
      showToast('Instructor removed.');
    }
  };

  const handleStartCreateInstructor = () => {
    const newInst: Instructor = {
      id: 'inst-' + Date.now(),
      name: 'Tanvir Hossain',
      role: 'Senior Math Mentor',
      subject: 'Higher Mathematics',
      experience: '6+ Years',
      bio: 'BUET EEE graduate, renowned for simplifying complex calculus and conic geometries.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      coursesCount: 3,
      studentsCount: 4200,
    };
    setEditingInstructor(newInst);
    setIsCreatingInstructor(true);
  };

  // -------------------------------------------------------------
  // NOTICE CRUD HANDLERS
  // -------------------------------------------------------------
  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;

    if (isCreatingNotice) {
      onUpdateNotices([editingNotice, ...notices]);
      showToast('Announcement published!');
    } else {
      onUpdateNotices(notices.map(n => n.id === editingNotice.id ? editingNotice : n));
      showToast('Announcement updated!');
    }
    setEditingNotice(null);
    setIsCreatingNotice(false);
  };

  const handleDeleteNotice = (id: string) => {
    onUpdateNotices(notices.filter(n => n.id !== id));
    setSelectedIds(prev => prev.filter(item => item !== id));
    showToast('Announcement removed.');
  };

  const handleStartCreateNotice = () => {
    const newNot: NoticeAnnouncement = {
      id: 'not-' + Date.now(),
      title: 'SHIKHOR HSC 28 PCMB Combo Batch registration is now open with 50% waiver.',
      badge: 'ADMISSION ALERT',
      date: 'Today',
      priority: 'high',
      isActive: true,
    };
    setEditingNotice(newNot);
    setIsCreatingNotice(true);
  };

  // -------------------------------------------------------------
  // STUDENT / USER ROLE HANDLERS
  // -------------------------------------------------------------
  const handleToggleStudentRole = (userId: string) => {
    onUpdateUsers(
      usersList.map(u => {
        if (u.id === userId) {
          const newRole: 'admin' | 'student' = u.role === 'admin' ? 'student' : 'admin';
          showToast(`Changed ${u.name}'s role to ${newRole.toUpperCase()}.`);
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    onUpdateUsers(usersList.map(u => u.id === editingUser.id ? editingUser : u));
    showToast(`Updated user profile for ${editingUser.name}.`);
    setEditingUser(null);
  };

  // -------------------------------------------------------------
  // STUDENT REVIEWS & VIDEO COMMENTS HANDLERS
  // -------------------------------------------------------------
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    if (isCreatingReview) {
      if (onUpdateReviews) {
        onUpdateReviews([editingReview, ...reviews]);
      }
      showToast(`Student review for "${editingReview.name}" added!`);
    } else {
      if (onUpdateReviews) {
        onUpdateReviews(reviews.map(r => r.id === editingReview.id ? editingReview : r));
      }
      showToast(`Review for "${editingReview.name}" updated!`);
    }
    setEditingReview(null);
    setIsCreatingReview(false);
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student review?')) {
      if (onUpdateReviews) {
        onUpdateReviews(reviews.filter(r => r.id !== id));
      }
      setSelectedIds(prev => prev.filter(item => item !== id));
      showToast('Review deleted.');
    }
  };

  const handleToggleReviewStatus = (id: string) => {
    if (!onUpdateReviews) return;
    onUpdateReviews(
      reviews.map(r => {
        if (r.id === id) {
          const nextStatus = r.status === 'approved' ? 'pending' : (r.status === 'pending' ? 'rejected' : 'approved');
          showToast(`Review status updated to ${nextStatus.toUpperCase()}`);
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  const handleToggleReviewFeatured = (id: string) => {
    if (!onUpdateReviews) return;
    onUpdateReviews(
      reviews.map(r => {
        if (r.id === id) {
          const nextFeatured = !r.isFeatured;
          showToast(`Review ${nextFeatured ? 'featured on Homepage' : 'unfeatured from Homepage'}`);
          return { ...r, isFeatured: nextFeatured };
        }
        return r;
      })
    );
  };

  const handleStartCreateReview = () => {
    const newRev: StudentReview = {
      id: 'rev-' + Date.now(),
      courseId: courses[0]?.id || 'hsc-physics-cycle-1',
      courseTitle: courses[0]?.title || 'HSC 26 Physics Cycle 1',
      name: 'Adil Mahmud',
      role: 'Verified Student',
      college: 'Dhaka College',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      reviewText: 'Redwan Sir covers every single mathematical variation with depth. Concepts of Rotational Dynamics became so crystal clear!',
      date: 'Today',
      isFeatured: true,
      status: 'approved',
    };
    setEditingReview(newRev);
    setIsCreatingReview(true);
  };

  const handleDeleteComment = (id: string) => {
    if (window.confirm('Delete this lecture discussion comment?')) {
      if (onUpdateComments) {
        onUpdateComments(comments.filter(c => c.id !== id));
      }
      showToast('Comment deleted.');
    }
  };

  // -------------------------------------------------------------
  // BULK ACTIONS
  // -------------------------------------------------------------
  const handleSelectAll = (filteredIds: string[]) => {
    if (selectedIds.length === filteredIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds([...filteredIds]);
    }
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (!selectedIds.length) return;
    if (window.confirm(`Delete ${selectedIds.length} selected items permanently?`)) {
      if (activeTab === 'courses') {
        onUpdateCourses(courses.filter(c => !selectedIds.includes(c.id)));
      } else if (activeTab === 'exams') {
        onUpdateExams(exams.filter(e => !selectedIds.includes(e.id)));
      } else if (activeTab === 'products') {
        onUpdateProducts(products.filter(p => !selectedIds.includes(p.id)));
      } else if (activeTab === 'instructors') {
        onUpdateInstructors(instructors.filter(i => !selectedIds.includes(i.id)));
      } else if (activeTab === 'notices') {
        onUpdateNotices(notices.filter(n => !selectedIds.includes(n.id)));
      }
      showToast(`Deleted ${selectedIds.length} items.`);
      setSelectedIds([]);
    }
  };

  // -------------------------------------------------------------
  // SORTING & FILTERING COMPUTATION
  // -------------------------------------------------------------
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Courses filtered & sorted
  const processedCourses = useMemo(() => {
    let result = [...courses];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.subCategory?.toLowerCase().includes(q) ||
        c.instructors.some(i => i.name.toLowerCase().includes(q))
      );
    }
    if (categoryFilter !== 'ALL') {
      result = result.filter(c => c.category === categoryFilter);
    }
    result.sort((a, b) => {
      let valA: any = (a as any)[sortColumn] ?? '';
      let valB: any = (b as any)[sortColumn] ?? '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [courses, searchQuery, categoryFilter, sortColumn, sortDirection]);

  // Exams filtered & sorted
  const processedExams = useMemo(() => {
    let result = [...exams];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.code.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'ALL') {
      result = result.filter(e => e.format === categoryFilter);
    }
    result.sort((a, b) => {
      let valA: any = (a as any)[sortColumn] ?? '';
      let valB: any = (b as any)[sortColumn] ?? '';
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [exams, searchQuery, categoryFilter, sortColumn, sortDirection]);

  // Products filtered & sorted
  const processedProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'ALL') {
      result = result.filter(p => p.category === categoryFilter);
    }
    return result;
  }, [products, searchQuery, categoryFilter]);

  // Instructors filtered & sorted
  const processedInstructors = useMemo(() => {
    let result = [...instructors];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(i => 
        i.name.toLowerCase().includes(q) ||
        i.subject.toLowerCase().includes(q) ||
        i.role.toLowerCase().includes(q)
      );
    }
    return result;
  }, [instructors, searchQuery]);

  // Students filtered & sorted
  const processedUsers = useMemo(() => {
    let result = [...usersList];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.institution.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'ALL') {
      result = result.filter(u => u.role === categoryFilter.toLowerCase());
    }
    return result;
  }, [usersList, searchQuery, categoryFilter]);

  // Notices filtered & sorted
  const processedNotices = useMemo(() => {
    let result = [...notices];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(n => n.title.toLowerCase().includes(q) || n.badge.toLowerCase().includes(q));
    }
    return result;
  }, [notices, searchQuery]);

  // Reviews filtered & sorted
  const processedReviews = useMemo(() => {
    let result = [...reviews];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.college.toLowerCase().includes(q) ||
        r.reviewText.toLowerCase().includes(q) ||
        (r.courseTitle && r.courseTitle.toLowerCase().includes(q))
      );
    }
    if (categoryFilter !== 'ALL') {
      result = result.filter(r => (r.status || 'approved') === categoryFilter.toLowerCase());
    }
    return result;
  }, [reviews, searchQuery, categoryFilter]);

  // Video lecture comments filtered & sorted
  const processedComments = useMemo(() => {
    let result = [...comments];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.userName.toLowerCase().includes(q) ||
        c.text.toLowerCase().includes(q) ||
        c.courseId.toLowerCase().includes(q) ||
        c.lessonId.toLowerCase().includes(q)
      );
    }
    return result;
  }, [comments, searchQuery]);

  // Active dataset according to tab
  const currentDataset = useMemo(() => {
    switch (activeTab) {
      case 'courses': return processedCourses;
      case 'exams': return processedExams;
      case 'products': return processedProducts;
      case 'instructors': return processedInstructors;
      case 'students': return processedUsers;
      case 'notices': return processedNotices;
      case 'reviews': return processedReviews;
      case 'comments': return processedComments;
      default: return [];
    }
  }, [activeTab, processedCourses, processedExams, processedProducts, processedInstructors, processedUsers, processedNotices, processedReviews, processedComments]);

  // Paginated records
  const totalPages = Math.max(1, Math.ceil(currentDataset.length / rowsPerPage));
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return currentDataset.slice(startIndex, startIndex + rowsPerPage);
  }, [currentDataset, currentPage, rowsPerPage]);

  const currentIdsOnPage = useMemo(() => paginatedData.map((item: any) => item.id), [paginatedData]);
  const isAllPageSelected = currentIdsOnPage.length > 0 && currentIdsOnPage.every(id => selectedIds.includes(id));

  return (
    <div className="min-h-screen rm-page-bg text-slate-800 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-700 ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Administrative Container */}
      <div className="flex-1 flex flex-row overflow-hidden relative">

        {/* ========================================================================= */}
        {/* 1. PROFESSIONAL COLLAPSIBLE SIDEBAR */}
        {/* ========================================================================= */}
        <aside
          className={`bg-white border-r border-slate-200 shadow-xs flex flex-col justify-between transition-all duration-300 z-30 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          } hidden md:flex shrink-0`}
        >
          {/* Sidebar Top: Logo & System Status */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center gap-2.5 select-none">
                  {/* SHIKHOR Peak Vector */}
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 19.5H7.5L12 11L16.5 19.5H22L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-black tracking-tight text-slate-900">SHIKHOR</span>
                      <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200/60 text-[9px] font-black">
                        শিখর
                      </span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      Admin Console
                    </span>
                  </div>
                </div>
              )}

              {sidebarCollapsed && (
                <div className="w-10 h-10 mx-auto rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <Shield className="w-5 h-5" />
                </div>
              )}

              {/* Sidebar Collapse Toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* System Status Pill */}
            {!sidebarCollapsed && (
              <div className="mt-3.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Production Live</span>
                </div>
                <span className="text-slate-400 font-mono text-[10px]">v2.4.0</span>
              </div>
            )}
          </div>

          {/* Sidebar Nav Items */}
          <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
            <div className={`px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 ${sidebarCollapsed ? 'text-center' : ''}`}>
              {sidebarCollapsed ? '•' : 'Core Management'}
            </div>

            {/* Dashboard Link */}
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title="Dashboard Overview"
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Overview & Stats</span>}
            </button>

            {/* Courses Link */}
            <button
              onClick={() => handleTabChange('courses')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'courses'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title="Course Batches"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>Course Batches</span>}
              </div>
              {!sidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'courses' ? 'bg-blue-700/80 border border-blue-400/40 text-white' : 'bg-slate-100 border border-slate-200 text-slate-600'
                }`}>
                  {courses.length}
                </span>
              )}
            </button>

            {/* Exams Link */}
            <button
              onClick={() => handleTabChange('exams')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'exams'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title="Exams & Tests"
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>Exams & Tests</span>}
              </div>
              {!sidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'exams' ? 'bg-blue-700/80 border border-blue-400/40 text-white' : 'bg-slate-100 border border-slate-200 text-slate-600'
                }`}>
                  {exams.length}
                </span>
              )}
            </button>

            {/* Products Link */}
            <button
              onClick={() => handleTabChange('products')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title="Store & E-Books"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>Store & E-Books</span>}
              </div>
              {!sidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'products' ? 'bg-blue-700/80 border border-blue-400/40 text-white' : 'bg-slate-100 border border-slate-200 text-slate-600'
                }`}>
                  {products.length}
                </span>
              )}
            </button>

            {/* Instructors Link */}
            <button
              onClick={() => handleTabChange('instructors')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'instructors'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title="Instructors & Faculty"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>Instructors</span>}
              </div>
              {!sidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'instructors' ? 'bg-blue-700/80 border border-blue-400/40 text-white' : 'bg-slate-100 border border-slate-200 text-slate-600'
                }`}>
                  {instructors.length}
                </span>
              )}
            </button>

            {/* Students Link */}
            <button
              onClick={() => handleTabChange('students')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'students'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title="Students Directory"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>Students & Roles</span>}
              </div>
              {!sidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'students' ? 'bg-blue-700/80 border border-blue-400/40 text-white' : 'bg-slate-100 border border-slate-200 text-slate-600'
                }`}>
                  {usersList.length}
                </span>
              )}
            </button>

            {/* Notices Link */}
            <button
              onClick={() => handleTabChange('notices')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'notices'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title="Notices & Marquee"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>Notices & Marquee</span>}
              </div>
              {!sidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'notices' ? 'bg-blue-700/80 border border-blue-400/40 text-white' : 'bg-slate-100 border border-slate-200 text-slate-600'
                }`}>
                  {notices.length}
                </span>
              )}
            </button>
          </div>

          {/* Sidebar Bottom: Admin Card & Return Link */}
          <div className="p-3 border-t border-slate-100 space-y-2">
            {!sidebarCollapsed && (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                  RA
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">Dr. Rafid Ahmed</div>
                  <div className="text-[10px] text-purple-700 font-medium truncate">Super Admin</div>
                </div>
              </div>
            )}

            <button
              onClick={onBackToApp}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all border border-slate-200"
              title="Return to Student Portal"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Student Portal</span>}
            </button>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. MAIN CONTENT AREA */}
        {/* ========================================================================= */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50">
          
          {/* Top Bar for Mobile & Quick Actions */}
          <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-900 capitalize flex items-center gap-2">
                  <span>
                    {activeTab === 'dashboard' && 'Executive Dashboard'}
                    {activeTab === 'courses' && 'Course Batches Management'}
                    {activeTab === 'exams' && 'Online Exams & Test Series'}
                    {activeTab === 'products' && 'E-Books & Store Inventory'}
                    {activeTab === 'instructors' && 'Instructors & Mentors'}
                    {activeTab === 'students' && 'Students & Role Permissions'}
                    {activeTab === 'notices' && 'Marquee Notices & Announcements'}
                  </span>
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  SHIKHOR Unified Academic Administration
                </p>
              </div>
            </div>

            {/* Quick Action Buttons on Top Bar */}
            <div className="flex items-center gap-2.5">
              {activeTab === 'courses' && (
                <button
                  onClick={handleStartCreateCourse}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Course</span>
                </button>
              )}
              {activeTab === 'exams' && (
                <button
                  onClick={handleStartCreateExam}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Exam</span>
                </button>
              )}
              {activeTab === 'products' && (
                <button
                  onClick={handleStartCreateProduct}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New E-Book</span>
                </button>
              )}
              {activeTab === 'instructors' && (
                <button
                  onClick={handleStartCreateInstructor}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Mentor</span>
                </button>
              )}
              {activeTab === 'notices' && (
                <button
                  onClick={handleStartCreateNotice}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Notice</span>
                </button>
              )}
            </div>
          </header>

          {/* Mobile Slide-in Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex">
              <div className="w-72 bg-white h-full p-4 flex flex-col justify-between border-r border-slate-200 shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-lg">SHIKHOR ADMIN</span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <nav className="mt-4 space-y-1">
                    <button onClick={() => handleTabChange('dashboard')} className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100">
                      Overview Dashboard
                    </button>
                    <button onClick={() => handleTabChange('courses')} className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100">
                      Course Batches ({courses.length})
                    </button>
                    <button onClick={() => handleTabChange('exams')} className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100">
                      Exams & Tests ({exams.length})
                    </button>
                    <button onClick={() => handleTabChange('products')} className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100">
                      Store & E-Books ({products.length})
                    </button>
                    <button onClick={() => handleTabChange('instructors')} className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100">
                      Instructors ({instructors.length})
                    </button>
                    <button onClick={() => handleTabChange('students')} className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100">
                      Students & Roles ({usersList.length})
                    </button>
                    <button onClick={() => handleTabChange('notices')} className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100">
                      Notices ({notices.length})
                    </button>
                  </nav>
                </div>
                <button
                  onClick={onBackToApp}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200"
                >
                  Back to Portal
                </button>
              </div>
            </div>
          )}

          {/* Page Body Container */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">

            {/* ========================================================================= */}
            {/* VIEW A: EXECUTIVE DASHBOARD */}
            {/* ========================================================================= */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* 6 Key Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-[11px] font-semibold">Active Batches</span>
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900">{courses.length}</div>
                    <div className="text-[10px] text-emerald-600 font-medium mt-1">+2 this month</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-[11px] font-semibold">Total Exams</span>
                      <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900">{exams.length}</div>
                    <div className="text-[10px] text-purple-600 font-medium mt-1">Live test series</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-[11px] font-semibold">Store Items</span>
                      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900">{products.length}</div>
                    <div className="text-[10px] text-amber-600 font-medium mt-1">E-Books & PDFs</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-[11px] font-semibold">Faculty Mentors</span>
                      <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900">{instructors.length}</div>
                    <div className="text-[10px] text-sky-600 font-medium mt-1">Top educators</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-[11px] font-semibold">Registered Users</span>
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-emerald-600">18,450+</div>
                    <div className="text-[10px] text-emerald-600 font-medium mt-1">98.4% active</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-[11px] font-semibold">Total Revenue</span>
                      <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900">৳ 3.42M</div>
                    <div className="text-[10px] text-teal-600 font-medium mt-1">bKash/Nagad</div>
                  </div>
                </div>

                {/* Quick Action Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50/60 to-sky-50 border border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-extrabold text-slate-900">
                        Welcome to SHIKHOR Administrative Portal
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 max-w-xl">
                      Create, update, and manage all academic courses, live test routines, digital store publications, instructor rosters, and student access privileges in real time.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleStartCreateCourse}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm shadow-blue-600/20 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Batch</span>
                    </button>
                    <button
                      onClick={handleStartCreateExam}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 border border-slate-200 shadow-xs transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Exam</span>
                    </button>
                  </div>
                </div>

                {/* Analytics & Quick Overview Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left 2 Cols: Recent Course Batches Table */}
                  <div className="lg:col-span-2 p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Active Course Batches</h4>
                        <p className="text-xs text-slate-500">Latest admission and board foundation batches</p>
                      </div>
                      <button
                        onClick={() => handleTabChange('courses')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <span>View All ({courses.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                            <th className="pb-3 pl-2">Batch</th>
                            <th className="pb-3">Category</th>
                            <th className="pb-3">Price</th>
                            <th className="pb-3">Enrolled</th>
                            <th className="pb-3 text-right pr-2">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {courses.slice(0, 4).map(course => (
                            <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 pl-2">
                                <div className="flex items-center gap-3">
                                  <img src={course.banner} alt={course.title} className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                                  <div>
                                    <div className="font-bold text-slate-900 truncate max-w-xs">{course.title}</div>
                                    <div className="text-[10px] text-slate-500">{course.instructors.map(i => i.name).join(', ')}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3">
                                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                                  {course.category}
                                </span>
                              </td>
                              <td className="py-3 font-mono font-bold text-slate-900">৳ {course.price.toLocaleString()}</td>
                              <td className="py-3 text-slate-600">{course.enrolledCount.toLocaleString()} students</td>
                              <td className="py-3 text-right pr-2">
                                <button
                                  onClick={() => {
                                    setEditingCourse(course);
                                    setIsCreatingCourse(false);
                                    setActiveTab('courses');
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200/60"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right 1 Col: Live Notices & Quick Stats */}
                  <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Live Marquee Notices</h4>
                        <p className="text-xs text-slate-500">Broadcast ticker messages</p>
                      </div>
                      <button
                        onClick={() => handleTabChange('notices')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700"
                      >
                        Manage
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {notices.map(notice => (
                        <div key={notice.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[9px] font-black tracking-wider">
                              {notice.badge}
                            </span>
                            <span className="text-[10px] text-slate-500">{notice.date}</span>
                          </div>
                          <p className="text-xs text-slate-800 font-medium leading-snug">
                            {notice.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW B: DATA TABLES (COURSES, EXAMS, PRODUCTS, INSTRUCTORS, STUDENTS, NOTICES) */}
            {/* ========================================================================= */}
            {activeTab !== 'dashboard' && (
              <div className="space-y-4 animate-in fade-in duration-300">

                {/* Table Control Bar: Search, Filters, Rows Per Page, Export & Bulk Toolbar */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder={`Search ${activeTab}...`}
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Filter Pills & Options */}
                    <div className="flex flex-wrap items-center gap-2">
                      
                      {/* Category Filter for Courses */}
                      {activeTab === 'courses' && (
                        <select
                          value={categoryFilter}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-600 cursor-pointer"
                        >
                          <option value="ALL">All Categories</option>
                          <option value="HSC">HSC Batches</option>
                          <option value="SSC">SSC Batches</option>
                          <option value="Admission">Admission Batches</option>
                        </select>
                      )}

                      {/* Format Filter for Exams */}
                      {activeTab === 'exams' && (
                        <select
                          value={categoryFilter}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-600 cursor-pointer"
                        >
                          <option value="ALL">All Formats</option>
                          <option value="MCQ">MCQ Test</option>
                          <option value="Written">Written Exam</option>
                        </select>
                      )}

                      {/* Role Filter for Students */}
                      {activeTab === 'students' && (
                        <select
                          value={categoryFilter}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-600 cursor-pointer"
                        >
                          <option value="ALL">All Roles</option>
                          <option value="STUDENT">Students Only</option>
                          <option value="ADMIN">Admins Only</option>
                        </select>
                      )}

                      {/* Rows Per Page */}
                      <select
                        value={rowsPerPage}
                        onChange={(e) => {
                          setRowsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-600 cursor-pointer"
                      >
                        <option value={5}>5 / page</option>
                        <option value={10}>10 / page</option>
                        <option value={25}>25 / page</option>
                        <option value={50}>50 / page</option>
                      </select>

                      {/* Export Dropdown Buttons */}
                      <button
                        onClick={() => exportToCSV(currentDataset, `shikhor_${activeTab}`)}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                        title="Export to CSV"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="hidden sm:inline">CSV</span>
                      </button>

                      <button
                        onClick={() => exportToJSON(currentDataset, `shikhor_${activeTab}`)}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                        title="Export to JSON"
                      >
                        <FileCode className="w-3.5 h-3.5 text-sky-600" />
                        <span className="hidden sm:inline">JSON</span>
                      </button>
                    </div>
                  </div>

                  {/* Bulk Actions Floating Bar (When 1+ items are selected) */}
                  {selectedIds.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3 text-xs animate-in fade-in">
                      <div className="flex items-center gap-2 text-blue-900 font-semibold">
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                        <span>{selectedIds.length} item(s) selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleBulkDelete}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Selected</span>
                        </button>
                        <button
                          onClick={() => setSelectedIds([])}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors font-medium shadow-xs"
                        >
                          Deselect All
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* ========================================================================= */}
                {/* PROFESSIONAL DATA TABLE CONTAINER */}
                {/* ========================================================================= */}
                <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      
                      {/* Sticky Header with Sortable Columns */}
                      <thead className="bg-slate-50/90 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200 sticky top-0 z-10 select-none">
                        <tr>
                          {/* Checkbox Column */}
                          <th className="py-3.5 px-4 w-10">
                            <button
                              onClick={() => handleSelectAll(currentIdsOnPage)}
                              className="text-slate-400 hover:text-slate-700"
                            >
                              {isAllPageSelected ? (
                                <CheckSquare className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                          </th>

                          {/* Column Headers depending on active tab */}
                          {activeTab === 'courses' && (
                            <>
                              <th onClick={() => handleSort('title')} className="py-3.5 px-4 cursor-pointer hover:text-slate-900">
                                Course Batch {sortColumn === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                              </th>
                              <th onClick={() => handleSort('category')} className="py-3.5 px-4 cursor-pointer hover:text-slate-900">
                                Category
                              </th>
                              <th onClick={() => handleSort('price')} className="py-3.5 px-4 cursor-pointer hover:text-slate-900">
                                Price (BDT) {sortColumn === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                              </th>
                              <th onClick={() => handleSort('enrolledCount')} className="py-3.5 px-4 cursor-pointer hover:text-slate-900">
                                Enrolled
                              </th>
                              <th className="py-3.5 px-4">Instructors</th>
                              <th className="py-3.5 px-4 text-right">Actions</th>
                            </>
                          )}

                          {activeTab === 'exams' && (
                            <>
                              <th onClick={() => handleSort('title')} className="py-3.5 px-4 cursor-pointer hover:text-slate-900">
                                Exam Title & Code
                              </th>
                              <th className="py-3.5 px-4">Subject</th>
                              <th className="py-3.5 px-4">Format</th>
                              <th className="py-3.5 px-4">Duration & Marks</th>
                              <th className="py-3.5 px-4">Schedule</th>
                              <th className="py-3.5 px-4 text-right">Actions</th>
                            </>
                          )}

                          {activeTab === 'products' && (
                            <>
                              <th className="py-3.5 px-4">Cover & Title</th>
                              <th className="py-3.5 px-4">Category</th>
                              <th className="py-3.5 px-4">Author</th>
                              <th className="py-3.5 px-4">Pages</th>
                              <th className="py-3.5 px-4">Price</th>
                              <th className="py-3.5 px-4 text-right">Actions</th>
                            </>
                          )}

                          {activeTab === 'instructors' && (
                            <>
                              <th className="py-3.5 px-4">Instructor Profile</th>
                              <th className="py-3.5 px-4">Subject</th>
                              <th className="py-3.5 px-4">Experience</th>
                              <th className="py-3.5 px-4">Courses Taught</th>
                              <th className="py-3.5 px-4">Students</th>
                              <th className="py-3.5 px-4 text-right">Actions</th>
                            </>
                          )}

                          {activeTab === 'students' && (
                            <>
                              <th className="py-3.5 px-4">Student Name & Contact</th>
                              <th className="py-3.5 px-4">Institution & Batch</th>
                              <th className="py-3.5 px-4">Role Permission</th>
                              <th className="py-3.5 px-4">Enrolled Batches</th>
                              <th className="py-3.5 px-4">Target Goal</th>
                              <th className="py-3.5 px-4 text-right">Actions</th>
                            </>
                          )}

                          {activeTab === 'notices' && (
                            <>
                              <th className="py-3.5 px-4">Badge / Priority</th>
                              <th className="py-3.5 px-4">Notice Content</th>
                              <th className="py-3.5 px-4">Published Date</th>
                              <th className="py-3.5 px-4">Status</th>
                              <th className="py-3.5 px-4 text-right">Actions</th>
                            </>
                          )}
                        </tr>
                      </thead>

                      {/* Table Body */}
                      <tbody className="divide-y divide-slate-100 font-medium">
                        
                        {/* 1. Courses Rows */}
                        {activeTab === 'courses' && paginatedData.map((course: Course) => {
                          const isSelected = selectedIds.includes(course.id);
                          return (
                            <tr
                              key={course.id}
                              className={`hover:bg-slate-50/80 transition-colors ${
                                isSelected ? 'bg-blue-50/60 border-l-2 border-blue-600' : ''
                              }`}
                            >
                              <td className="py-3.5 px-4">
                                <button onClick={() => handleToggleSelectRow(course.id)} className="text-slate-400 hover:text-slate-700">
                                  {isSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                                </button>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={course.banner}
                                    alt={course.title}
                                    className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <div className="font-bold text-slate-900 truncate max-w-sm">{course.title}</div>
                                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">slug: {course.slug}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[10px] font-bold">
                                  {course.category} {course.subCategory && `• ${course.subCategory}`}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-bold font-mono text-slate-900 text-sm">৳ {course.price.toLocaleString()}</div>
                                <div className="text-[10px] text-slate-400 line-through">৳ {course.originalPrice.toLocaleString()} ({course.discountPercentage}% off)</div>
                              </td>
                              <td className="py-3.5 px-4 text-slate-700">
                                <div className="font-bold text-slate-900">{course.enrolledCount.toLocaleString()}</div>
                                <div className="text-[10px] text-slate-500">★ {course.rating.toFixed(1)} ({course.reviewsCount})</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="text-xs text-slate-600">{course.instructors.map(i => i.name).join(', ')}</div>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleDuplicateCourse(course)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200/60"
                                    title="Duplicate Batch"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingCourse(course);
                                      setIsCreatingCourse(false);
                                    }}
                                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-colors border border-blue-200/60"
                                    title="Edit Course"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCourse(course.id)}
                                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors border border-rose-200/60"
                                    title="Delete Course"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {/* 2. Exams Rows */}
                        {activeTab === 'exams' && paginatedData.map((exam: Exam) => {
                          const isSelected = selectedIds.includes(exam.id);
                          return (
                            <tr key={exam.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-blue-50/60 border-l-2 border-blue-600' : ''}`}>
                              <td className="py-3.5 px-4">
                                <button onClick={() => handleToggleSelectRow(exam.id)} className="text-slate-400 hover:text-slate-700">
                                  {isSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                                </button>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <img src={exam.banner} alt={exam.title} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
                                  <div>
                                    <div className="font-bold text-slate-900 truncate max-w-sm">{exam.title}</div>
                                    <div className="text-[10px] text-purple-700 font-mono">Code: {exam.code}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/80 text-[10px] font-bold">
                                  {exam.subject}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                  exam.format === 'MCQ' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                  {exam.format}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 font-mono text-xs text-slate-700">
                                <div className="font-bold text-slate-900">{exam.durationMinutes} mins • {exam.totalMarks} Marks</div>
                                <div className="text-[10px] text-slate-500">{exam.questionsCount} Questions</div>
                              </td>
                              <td className="py-3.5 px-4 text-xs text-slate-600">
                                <div>Start: {exam.startDate}</div>
                                <div className="text-[10px] text-slate-400">End: {exam.endDate}</div>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingExam(exam);
                                      setIsCreatingExam(false);
                                    }}
                                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-colors border border-blue-200/60"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteExam(exam.id)}
                                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors border border-rose-200/60"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {/* 3. Products Rows */}
                        {activeTab === 'products' && paginatedData.map((prod: ProductItem) => {
                          const isSelected = selectedIds.includes(prod.id);
                          return (
                            <tr key={prod.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-blue-50/60 border-l-2 border-blue-600' : ''}`}>
                              <td className="py-3.5 px-4">
                                <button onClick={() => handleToggleSelectRow(prod.id)} className="text-slate-400 hover:text-slate-700">
                                  {isSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                                </button>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <img src={prod.coverImage} alt={prod.title} className="w-10 h-12 rounded-lg object-cover border border-slate-200 shrink-0 shadow-xs" />
                                  <div>
                                    <div className="font-bold text-slate-900 truncate max-w-sm">{prod.title}</div>
                                    <div className="text-[10px] text-slate-500">{prod.downloadCount} readers downloaded</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-[10px] font-bold">
                                  {prod.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-700 font-medium">{prod.author}</td>
                              <td className="py-3.5 px-4 font-mono text-slate-600">{prod.pages} pages</td>
                              <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 text-sm">৳ {prod.price}</td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingProduct(prod);
                                      setIsCreatingProduct(false);
                                    }}
                                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-colors border border-blue-200/60"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(prod.id)}
                                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors border border-rose-200/60"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {/* 4. Instructors Rows */}
                        {activeTab === 'instructors' && paginatedData.map((inst: Instructor) => {
                          const isSelected = selectedIds.includes(inst.id);
                          return (
                            <tr key={inst.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-blue-50/60 border-l-2 border-blue-600' : ''}`}>
                              <td className="py-3.5 px-4">
                                <button onClick={() => handleToggleSelectRow(inst.id)} className="text-slate-400 hover:text-slate-700">
                                  {isSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                                </button>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <img src={inst.avatar} alt={inst.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" />
                                  <div>
                                    <div className="font-bold text-slate-900">{inst.name}</div>
                                    <div className="text-[10px] text-slate-500">{inst.role}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80 text-[10px] font-bold">
                                  {inst.subject}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600">{inst.experience}</td>
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{inst.coursesCount} Batches</td>
                              <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">{inst.studentsCount.toLocaleString()}+</td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingInstructor(inst);
                                      setIsCreatingInstructor(false);
                                    }}
                                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-colors border border-blue-200/60"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteInstructor(inst.id)}
                                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors border border-rose-200/60"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {/* 5. Students & Role Permissions Rows */}
                        {activeTab === 'students' && paginatedData.map((u: UserProfile) => {
                          const isSelected = selectedIds.includes(u.id);
                          return (
                            <tr key={u.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-blue-50/60 border-l-2 border-blue-600' : ''}`}>
                              <td className="py-3.5 px-4">
                                <button onClick={() => handleToggleSelectRow(u.id)} className="text-slate-400 hover:text-slate-700">
                                  {isSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                                </button>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-slate-900">{u.name}</div>
                                <div className="text-[10px] text-slate-500">{u.email} • {u.phone}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="text-xs text-slate-800 font-medium">{u.institution}</div>
                                <div className="text-[10px] text-slate-500">{u.hscBatch}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <button
                                  onClick={() => handleToggleStudentRole(u.id)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-black border transition-all ${
                                    u.role === 'admin'
                                      ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  }`}
                                  title="Click to toggle Role"
                                >
                                  {u.role === 'admin' ? '🛡️ SUPER ADMIN' : '🎓 STUDENT'}
                                </button>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[10px] font-mono text-blue-700 font-bold">
                                  {u.enrolledCourseIds?.length || 0} Batches Enrolled
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-500 text-xs">
                                {u.targetExam || 'General'}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  onClick={() => setEditingUser(u)}
                                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-colors border border-blue-200/60"
                                  title="Edit User"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}

                        {/* 6. Notices Rows */}
                        {activeTab === 'notices' && paginatedData.map((not: NoticeAnnouncement) => {
                          const isSelected = selectedIds.includes(not.id);
                          return (
                            <tr key={not.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-blue-50/60 border-l-2 border-blue-600' : ''}`}>
                              <td className="py-3.5 px-4">
                                <button onClick={() => handleToggleSelectRow(not.id)} className="text-slate-400 hover:text-slate-700">
                                  {isSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                                </button>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                                  not.priority === 'urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                                  not.priority === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}>
                                  {not.badge}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-md">
                                {not.title}
                              </td>
                              <td className="py-3.5 px-4 text-slate-500 text-xs">{not.date}</td>
                              <td className="py-3.5 px-4">
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  not.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${not.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                  {not.isActive ? 'Active' : 'Draft'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingNotice(not);
                                      setIsCreatingNotice(false);
                                    }}
                                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-colors border border-blue-200/60"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteNotice(not.id)}
                                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors border border-rose-200/60"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                      </tbody>
                    </table>
                  </div>

                  {/* Empty State */}
                  {paginatedData.length === 0 && (
                    <div className="py-16 px-4 text-center space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                        <Search className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-slate-900">No records found</div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        No entries matching your query &ldquo;{searchQuery}&rdquo;. Try clearing filters.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setCategoryFilter('ALL');
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors border border-slate-200"
                      >
                        Reset Search
                      </button>
                    </div>
                  )}

                  {/* Professional Pagination Footer */}
                  <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                    <div>
                      Showing <strong className="text-slate-900">{currentDataset.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}</strong> to{' '}
                      <strong className="text-slate-900">{Math.min(currentPage * rowsPerPage, currentDataset.length)}</strong> of{' '}
                      <strong className="text-slate-900">{currentDataset.length}</strong> entries
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 shadow-xs"
                        title="First Page"
                      >
                        <ChevronsLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 shadow-xs"
                        title="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-bold font-mono text-xs">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 shadow-xs"
                        title="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 shadow-xs"
                        title="Last Page"
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. MODAL EDITORS (COURSES, EXAMS, PRODUCTS, INSTRUCTORS, NOTICES, USERS) */}
      {/* ========================================================================= */}

      {/* Course Modal Editor */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isCreatingCourse ? 'Create New Course Batch' : 'Edit Course Batch'}
                </h3>
                <p className="text-xs text-slate-500">Configure batch pricing, curriculum, and banners</p>
              </div>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Course Batch Title</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Category</label>
                  <select
                    value={editingCourse.category}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 cursor-pointer"
                  >
                    <option value="HSC">HSC</option>
                    <option value="SSC">SSC</option>
                    <option value="Admission">Admission</option>
                    <option value="Combo">Combo</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Slug</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.slug}
                    onChange={(e) => setEditingCourse({ ...editingCourse, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Offer Price (BDT)</label>
                  <input
                    type="number"
                    required
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Original Price</label>
                  <input
                    type="number"
                    required
                    value={editingCourse.originalPrice}
                    onChange={(e) => setEditingCourse({ ...editingCourse, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Discount %</label>
                  <input
                    type="number"
                    value={editingCourse.discountPercentage}
                    onChange={(e) => setEditingCourse({ ...editingCourse, discountPercentage: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Banner Image URL</label>
                <input
                  type="text"
                  required
                  value={editingCourse.banner}
                  onChange={(e) => setEditingCourse({ ...editingCourse, banner: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-[11px] focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Short Description</label>
                <textarea
                  rows={2}
                  value={editingCourse.shortDescription}
                  onChange={(e) => setEditingCourse({ ...editingCourse, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 resize-none focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-colors"
                >
                  {isCreatingCourse ? 'Publish Batch' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exam Modal Editor */}
      {editingExam && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isCreatingExam ? 'Create New Test / Exam' : 'Edit Exam Routine'}
                </h3>
                <p className="text-xs text-slate-500">Configure time limits, subjects, and scoring rules</p>
              </div>
              <button onClick={() => setEditingExam(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExam} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Exam Title</label>
                <input
                  type="text"
                  required
                  value={editingExam.title}
                  onChange={(e) => setEditingExam({ ...editingExam, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Subject</label>
                  <input
                    type="text"
                    required
                    value={editingExam.subject}
                    onChange={(e) => setEditingExam({ ...editingExam, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Exam Code</label>
                  <input
                    type="text"
                    required
                    value={editingExam.code}
                    onChange={(e) => setEditingExam({ ...editingExam, code: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Format</label>
                  <select
                    value={editingExam.format}
                    onChange={(e) => setEditingExam({ ...editingExam, format: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 cursor-pointer"
                  >
                    <option value="MCQ">MCQ Test</option>
                    <option value="Written">Written</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Duration (Min)</label>
                  <input
                    type="number"
                    required
                    value={editingExam.durationMinutes}
                    onChange={(e) => setEditingExam({ ...editingExam, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Total Marks</label>
                  <input
                    type="number"
                    required
                    value={editingExam.totalMarks}
                    onChange={(e) => setEditingExam({ ...editingExam, totalMarks: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingExam(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
                >
                  Save Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product / E-Book Modal Editor */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isCreatingProduct ? 'Add Store E-Book / Note' : 'Edit Product'}
                </h3>
                <p className="text-xs text-slate-500">Configure book pricing and descriptions</p>
              </div>
              <button onClick={() => setEditingProduct(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Book Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 cursor-pointer"
                  >
                    <option value="Formula Sheet">Formula Sheet</option>
                    <option value="E-Book">E-Book</option>
                    <option value="Hardcopy Book">Hardcopy Book</option>
                    <option value="Lecture Note">Lecture Note</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Author</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.author}
                    onChange={(e) => setEditingProduct({ ...editingProduct, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Price (BDT)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Total Pages</label>
                  <input
                    type="number"
                    value={editingProduct.pages}
                    onChange={(e) => setEditingProduct({ ...editingProduct, pages: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Instructor Modal Editor */}
      {editingInstructor && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isCreatingInstructor ? 'Add New Instructor' : 'Edit Instructor Profile'}
                </h3>
                <p className="text-xs text-slate-500">Faculty details and bio</p>
              </div>
              <button onClick={() => setEditingInstructor(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInstructor} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingInstructor.name}
                  onChange={(e) => setEditingInstructor({ ...editingInstructor, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Subject</label>
                  <input
                    type="text"
                    required
                    value={editingInstructor.subject}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Designation / Role</label>
                  <input
                    type="text"
                    required
                    value={editingInstructor.role}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Avatar Image URL</label>
                <input
                  type="text"
                  required
                  value={editingInstructor.avatar}
                  onChange={(e) => setEditingInstructor({ ...editingInstructor, avatar: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-[11px] focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Bio Summary</label>
                <textarea
                  rows={3}
                  value={editingInstructor.bio}
                  onChange={(e) => setEditingInstructor({ ...editingInstructor, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 resize-none focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingInstructor(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Modal Editor */}
      {editingNotice && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isCreatingNotice ? 'Publish Announcement' : 'Edit Marquee Notice'}
                </h3>
                <p className="text-xs text-slate-500">Broadcast updates to top banner ticker</p>
              </div>
              <button onClick={() => setEditingNotice(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Notice Headline</label>
                <textarea
                  rows={3}
                  required
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 resize-none focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Badge Text</label>
                  <input
                    type="text"
                    required
                    value={editingNotice.badge}
                    onChange={(e) => setEditingNotice({ ...editingNotice, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Priority Level</label>
                  <select
                    value={editingNotice.priority}
                    onChange={(e) => setEditingNotice({ ...editingNotice, priority: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 cursor-pointer"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="noticeActiveCheck"
                  checked={editingNotice.isActive}
                  onChange={(e) => setEditingNotice({ ...editingNotice, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 bg-slate-50 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="noticeActiveCheck" className="text-xs text-slate-700 font-semibold cursor-pointer">
                  Display actively on site marquee ticker
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingNotice(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
                >
                  Save Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User / Student Role & Batch Editor */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Student & Role Management</h3>
                <p className="text-xs text-slate-500">Update user permissions and manual batch enrollments</p>
              </div>
              <button onClick={() => setEditingUser(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Student Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Role Permission</label>
                  <select
                    value={editingUser.role || 'student'}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 cursor-pointer"
                  >
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Super Admin</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">HSC Batch</label>
                  <input
                    type="text"
                    value={editingUser.hscBatch}
                    onChange={(e) => setEditingUser({ ...editingUser, hscBatch: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Enrolled Batches Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="font-semibold text-slate-700 block">Enrolled Course Batches</label>
                <div className="max-h-40 overflow-y-auto space-y-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {courses.map(course => {
                    const isEnrolled = editingUser.enrolledCourseIds?.includes(course.id);
                    return (
                      <label
                        key={course.id}
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isEnrolled}
                          onChange={(e) => {
                            const current = editingUser.enrolledCourseIds || [];
                            if (e.target.checked) {
                              setEditingUser({ ...editingUser, enrolledCourseIds: [...current, course.id] });
                            } else {
                              setEditingUser({ ...editingUser, enrolledCourseIds: current.filter(id => id !== course.id) });
                            }
                          }}
                          className="w-4 h-4 rounded text-blue-600 bg-white border-slate-300 focus:ring-blue-500"
                        />
                        <span className="text-xs text-slate-700 font-medium truncate">{course.title}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
