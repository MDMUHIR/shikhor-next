export interface Instructor {
  id: string;
  name: string;
  role: string;
  subject: string;
  experience: string;
  bio: string;
  avatar: string;
  coursesCount: number;
  studentsCount: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: 'HSC' | 'SSC' | 'Admission' | 'Combo' | 'Skill';
  subCategory?: string;
  banner: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  enrolledCount: number;
  rating: number;
  reviewsCount: number;
  instructors: Instructor[];
  shortDescription: string;
  fullDescription: string;
  features: string[];
  syllabus: {
    title: string;
    duration: string;
    lessons: string[];
  }[];
  demoVideos: {
    title: string;
    instructor: string;
    youtubeId?: string;
    thumbnail: string;
    duration: string;
  }[];
  isPopular?: boolean;
  isNew?: boolean;
}

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  code: string;
  banner: string;
  type: 'Public' | 'Private';
  badge: string; // e.g. 'FRPP 26'
  format: 'MCQ' | 'Written';
  startDate: string;
  endDate: string;
  durationMinutes: number;
  totalMarks: number;
  questionsCount: number;
  questions?: ExamQuestion[];
}

export interface LeaderboardEntry {
  rank: number;
  studentName: string;
  roll: string;
  collegeOrSchool: string;
  score: number;
  totalMarks: number;
  timeSpent: string;
  accuracy: number;
}

export interface StudentReview {
  id: string;
  courseId?: string;
  courseTitle?: string;
  name: string;
  role: string;
  college: string;
  avatar: string;
  rating: number;
  reviewText: string;
  date: string;
  isFeatured?: boolean;
  status?: 'approved' | 'pending' | 'rejected';
  likesCount?: number;
}

export interface LectureComment {
  id: string;
  courseId: string;
  lessonId: string;
  studentName: string;
  studentAvatar?: string;
  avatarBgColor?: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replies?: {
    id: string;
    studentName: string;
    studentAvatar?: string;
    text: string;
    timestamp: string;
  }[];
}

export interface ProductItem {
  id: string;
  title: string;
  category: 'E-Book' | 'Hardcopy Book' | 'Lecture Note' | 'Formula Sheet';
  author: string;
  price: number;
  originalPrice?: number;
  pages: number;
  coverImage: string;
  previewUrl?: string;
  description: string;
  downloadCount: number;
}

export interface PaymentRecord {
  id: string;
  itemName: string;
  itemType: 'course' | 'product';
  itemId: string;
  amount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Card' | 'Google Pay';
  trxId: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface UserExamRecord {
  examId: string;
  examTitle: string;
  date: string;
  score: number;
  totalMarks: number;
  timeSpent: string;
  accuracy: number;
  rank?: number;
}

export interface NoticeAnnouncement {
  id: string;
  title: string;
  badge: string;
  date: string;
  linkText?: string;
  courseId?: string;
  priority: 'normal' | 'high' | 'urgent';
  isActive: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  institution: string;
  hscBatch: string;
  avatar?: string;
  role?: 'student' | 'admin' | 'moderator';
  enrolledCourseIds: string[];
  completedExamIds?: string[];
  joinedDate?: string;
  address?: string;
  bloodGroup?: string;
  guardianPhone?: string;
  targetExam?: string;
  bio?: string;
  paymentHistory?: PaymentRecord[];
  examHistory?: UserExamRecord[];
}

