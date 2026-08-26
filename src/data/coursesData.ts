import { Course, Instructor, Exam, StudentReview, ProductItem, LeaderboardEntry } from '../types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'redwan-hushen',
    name: 'Redwan Hushen',
    role: 'Lead Physics Educator & Founder',
    subject: 'Physics',
    experience: '8+ Years Teaching',
    bio: 'Lead Mentor at SHIKHOR. Renowned for conceptual physics visualization, mathematical precision, and guiding over 100,000+ students towards BUET, Medical & top university success.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    coursesCount: 14,
    studentsCount: 185000,
  },
  {
    id: 'hasan-anam',
    name: 'Hasan Anam',
    role: 'Higher Mathematics Specialist',
    subject: 'Higher Mathematics',
    experience: '7+ Years Teaching',
    bio: 'Pioneer of shortcut logic and conceptual mathematics for HSC & Engineering admissions. Makes complex calculus and coordinate geometry effortless.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    coursesCount: 10,
    studentsCount: 142000,
  },
  {
    id: 'fahad-shovon',
    name: 'Fahad Hossain Shovon',
    role: 'Chemistry Specialist',
    subject: 'Chemistry',
    experience: '6+ Years Teaching',
    bio: 'Organic and Inorganic chemistry made crystal clear with real-life reaction mechanisms and visual memory maps.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    coursesCount: 9,
    studentsCount: 128000,
  },
  {
    id: 'junnurain-khan',
    name: 'Junnurain Khan',
    role: 'Biology Specialist',
    subject: 'Biology',
    experience: '6+ Years Teaching',
    bio: 'Expert medical admission trainer. Simplifies Zoology and Botany using animated 3D diagrams and memorization mnemonics.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    coursesCount: 8,
    studentsCount: 110000,
  },
  {
    id: 'niazmorshed-faysal',
    name: 'Niazmorshed Faysal',
    role: 'ICT & Technology Mentor',
    subject: 'ICT',
    experience: '5+ Years Teaching',
    bio: 'Specialist in HSC ICT Chapter 3, 4, 5 (C Programming, HTML, Number Systems & Logic Gates) with interactive coding breakdowns.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    coursesCount: 7,
    studentsCount: 95000,
  },
  {
    id: 'parvez-ahmed',
    name: 'S M Parvez Ahmed',
    role: 'Bangla & English Mentor',
    subject: 'Bangla & English',
    experience: '6+ Years Teaching',
    bio: 'Master of Bangla 1st & 2nd Paper grammar, creative composition, and English 1st/2nd Paper writing methodologies.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    coursesCount: 6,
    studentsCount: 89000,
  },
  {
    id: 'hamja-sir',
    name: 'Hamja Sir',
    role: 'English First & Second Paper Mentor',
    subject: 'English',
    experience: '7+ Years Teaching',
    bio: 'Specialized in grammar mastery, passage comprehension and HSC board exam target 90%+ score blueprint.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    coursesCount: 5,
    studentsCount: 75000,
  },
  {
    id: 'kawsar-sir',
    name: 'Kawsar Sir',
    role: 'Bangla Sahitto & Byakoron Mentor',
    subject: 'Bangla',
    experience: '8+ Years Teaching',
    bio: 'Expertise in Bangla byakoron rules, creative answer frameworks, and board exam standard question solutions.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    coursesCount: 6,
    studentsCount: 82000,
  },
  {
    id: 'jilani-sir',
    name: 'Jilani Sir',
    role: 'ICT & Web Mentor',
    subject: 'ICT',
    experience: '5+ Years Teaching',
    bio: 'Simplifying database management systems (DBMS), networking and web design for HSC students nationwide.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    coursesCount: 4,
    studentsCount: 68000,
  },
  {
    id: 'tipu-sir',
    name: 'Tipu Sir',
    role: 'Physics Problem Solver',
    subject: 'Physics',
    experience: '6+ Years Teaching',
    bio: 'Dedicated problem solver helping students master challenging mathematical CQ and MCQ techniques in physics.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    coursesCount: 5,
    studentsCount: 62000,
  },
];

export const COURSES: Course[] = [
  {
    id: 'pcmb-1st-paper-combo-hsc28',
    title: 'PCMB 1st Paper Combo Course HSC-28',
    slug: 'pcmb-1st-paper-combo-hsc28',
    category: 'Combo',
    subCategory: 'HSC 2028 Science',
    banner: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    price: 9990,
    originalPrice: 20000,
    discountPercentage: 50,
    enrolledCount: 4516,
    rating: 5.0,
    reviewsCount: 1420,
    instructors: [
      INSTRUCTORS[0], // Redwan Hushen
      INSTRUCTORS[1], // Hasan Anam
      INSTRUCTORS[2], // Fahad Hossain Shovon
      INSTRUCTORS[3], // Junnurain Khan
      INSTRUCTORS[4], // Niazmorshed Faysal
      INSTRUCTORS[5], // S M Parvez Ahmed
    ],
    shortDescription: 'Complete preparation of Physics 1st, Chemistry 1st, Higher Math 1st, and Biology 1st Paper for HSC 2028 batch.',
    fullDescription: `প্রিয় HSC 28 ব্যাচ,\nএসএসসি পরীক্ষা তো শেষ! এখন তোমরা HSC 28। এসএসসিতে তোমরা সিলেবাস শেষ করার জন্য ২ বছরেরও বেশি সময় পেয়েছো, তবে HSC এর ক্ষেত্রে ব্যাপারটা একটু ভিন্ন। HSC এর সিলেবাস SSC এর দ্বিগুণ এর ও বেশি! আর এই সিলেবাস কমপ্লিট করার জন্য সময় থাকে ২ বছরেরও কম !!!\n\nতাই এই অল্প সময়ের মধ্যেই প্রতিটি বিষয়ের বেসিক কনসেপ্ট ক্লিয়ার করে সম্পূর্ণ সিলেবাস শেষ করতে ও বোর্ড পরীক্ষার পাশাপাশি এডমিশন পর্যন্ত ১০০% প্রস্তুতি নিশ্চিত করতে Redwan's Method নিয়ে এসেছে PCMB 1st Paper Combo Course HSC-28।\n\nএই কোর্সে যা যা থাকছে:\n• ৪টি মূল বিষয়ের সম্পূর্ণ প্রথম পত্রের বেসিক টু প্রো লাইভ ও রেকর্ডেড ক্লাস\n• স্পেশাল চ্যাপ্টারওয়াইজ প্র্যাকটিস শিট ও লেকচার নোট PDF\n• রেগুলার ডেইলি ও উইকলি মডেল টেস্ট উইথ ইনস্ট্যান্ট অটোমেটেড রেজাল্ট ও লিডারবোর্ড\n• ২৪/৭ ডেডিকেটেড ডাউট সলভিং টেলিগ্রাম ও ডিসকর্ড গ্রুপ সাপোর্ট\n• বোর্ড স্ট্যান্ডার্ড CQ & MCQ সলভিং সেশন এবং বুয়েট/মেডিকেল ফাউন্ডেশন বিল্ডার।`,
    features: [
      '২৪০+ লাইভ ইন্টারঅ্যাক্টিভ ও এইচডি রেকর্ডেড ক্লাস',
      'প্রিমিয়াম চ্যাপ্টারওয়াইজ লেকচার শিট ও ফর্মুলা বুক',
      '৫০+ রেগুলার অধ্যায়ভিত্তিক ও পেপার ফাইনাল এক্সাম',
      '২৪/৭ ডেডিকেটেড প্রবলেম সলভিং ফোরাম',
      'ইনস্ট্যান্ট লিডারবোর্ড ও সলিউশন ভিডিও অ্যানালাইসিস',
      'ফুল কোর্স ভ্যালিডিটি: HSC 28 বোর্ড পরীক্ষা পর্যন্ত',
    ],
    syllabus: [
      {
        title: 'Physics 1st Paper (Complete 10 Chapters)',
        duration: '60 Live Classes • 15 Exams',
        lessons: [
          'Vector & Dynamics Fundamentals with Real-life Simulations',
          'Newtonian Mechanics, Work Power & Energy',
          'Gravitation & Structural Properties of Matter',
          'Periodic Motion & Waves Physics',
          'Ideal Gas & Kinetic Theory of Gases',
        ],
      },
      {
        title: 'Chemistry 1st Paper (Complete 5 Chapters)',
        duration: '55 Live Classes • 12 Exams',
        lessons: [
          'Safe Use of Laboratory & Quantitative Chemistry Basics',
          'Qualitative Chemistry: Atomic Structure & Separation',
          'Periodic Properties of Elements & Chemical Bonding',
          'Chemical Changes: Equilibrium, pH & Thermochemistry',
          'Work-oriented Chemistry: Food Safety & Industrial Basics',
        ],
      },
      {
        title: 'Higher Mathematics 1st Paper (10 Chapters)',
        duration: '65 Live Classes • 15 Exams',
        lessons: [
          'Matrices and Determinants Complete Mastery',
          'Vectors, Straight Lines & Circles with Shortcuts',
          'Trigonometry Functions & Transformations',
          'Differential Calculus: Limits, Derivatives & Tangents',
          'Integral Calculus: Definite & Indefinite Integration',
        ],
      },
      {
        title: 'Biology 1st Paper (Botany Complete)',
        duration: '50 Live Classes • 10 Exams',
        lessons: [
          'Cell & Its Structure with 3D Microscopic Visuals',
          'Cell Division: Mitosis & Meiosis Detailed Stages',
          'Cell Chemistry, Microorganisms & Algae-Fungi',
          'Bryophyta, Pteridophyta, Gymnosperms & Angiosperms',
          'Tissue & Tissue System, Plant Physiology, Biotechnology',
        ],
      },
    ],
    demoVideos: [
      {
        title: 'Physics Demo: ভেক্টর ও গতিবিদ্যা সুপার ট্রিকস - Redwan Sir',
        instructor: 'Redwan Hushen',
        youtubeId: 'WO1KcxKmgYk',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
        duration: '42:15',
      },
      {
        title: 'Chemistry Demo: গুণগত রসায়ন ও কোয়ান্টাম সংখ্যা - Fahad Sir',
        instructor: 'Fahad Hossain Shovon',
        youtubeId: 'WO1KcxKmgYk',
        thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&auto=format&fit=crop&q=80',
        duration: '38:40',
      },
      {
        title: 'Higher Math Demo: ক্যালকুলাস ও ডিফারেনশিয়েশন বেসিকস - Hasan Anam Sir',
        instructor: 'Hasan Anam',
        youtubeId: 'WO1KcxKmgYk',
        thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
        duration: '45:10',
      },
    ],
    isPopular: true,
  },
  {
    id: 'hsc-28-ebi-combo',
    title: 'HSC 28 English, Bangla, ICT (EBI 2.0) Batch',
    slug: 'hsc-28-ebi-combo',
    category: 'Combo',
    subCategory: 'HSC 2028 All Groups',
    banner: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80',
    price: 3490,
    originalPrice: 7000,
    discountPercentage: 50,
    enrolledCount: 3820,
    rating: 4.9,
    reviewsCount: 980,
    instructors: [
      INSTRUCTORS[6], // Hamja Sir
      INSTRUCTORS[7], // Kawsar Sir
      INSTRUCTORS[4], // Niazmorshed Faysal
      INSTRUCTORS[8], // Jilani Sir
    ],
    shortDescription: 'Comprehensive preparation for English 1st & 2nd, Bangla 1st & 2nd, and ICT for HSC 2028 batch.',
    fullDescription: `এইচএসসি পরীক্ষায় জিপিএ ৫ ও গোল্ডেন পাওয়ার জন্য আবশ্যিক বিষয়গুলো (বাংলা, ইংরেজি, আইসিটি) অত্যন্ত গুরুত্বপূর্ণ ভূমিকা পালন করে। সঠিক গাইডলাইনের অভাবে প্রতি বছর অনেক মেধাবী শিক্ষার্থী এই বিষয়গুলোতে এ+ মিস করে।\n\nRedwan's Method এর EBI 2.0 কোর্সে থাকছে বাংলাদেশের সেরা শিক্ষকদের ক্লাসের মাধ্যমে ৩টি বিষয়ের সম্পূর্ণ সিলেবাস টু দ্য পয়েন্ট কভারেজ।`,
    features: [
      '১২০+ লাইভ ও রেকর্ডেড ক্লাস',
      'বাংলা ব্যাকরণ ও নির্মিতি সুপার শিট',
      'ইংরেজি গ্রামার হ্যাকস ও রাইটিং স্পেশাল ফর্মুলা',
      'আইসিটি প্রোগ্রামিং ও এইচটিএমএল প্র্যাকটিক্যাল কোডিং',
      'বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট ও পার্সোনালাইজড ফিডব্যাক',
    ],
    syllabus: [
      {
        title: 'English 1st & 2nd Paper (Complete Board Target)',
        duration: '45 Classes',
        lessons: ['Passage Reading Techniques', 'Grammar 12 Topics Mastery', 'Formal & Informal Writing Hacks'],
      },
      {
        title: 'Bangla 1st & 2nd Paper (Sahitto & Byakoron)',
        duration: '45 Classes',
        lessons: ['Goddho & Poddho Critical Analysis', 'Byakoron 30 Marks 100% Target', 'Nirmiti Creative Skills'],
      },
      {
        title: 'ICT Complete Paper (Chapters 1 to 6)',
        duration: '35 Classes',
        lessons: ['Number Systems & Logic Gates', 'Web Design & HTML Coding', 'C Programming Hands-on', 'DBMS & Networking'],
      },
    ],
    demoVideos: [
      {
        title: 'ICT Demo: সি প্রোগ্রামিং ও লজিক গেট শর্টকাট - Faysal Sir',
        instructor: 'Niazmorshed Faysal',
        youtubeId: 'WO1KcxKmgYk',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
        duration: '35:20',
      },
    ],
    isPopular: true,
    isNew: true,
  },
  {
    id: 'ssc-27-foundation-batch',
    title: 'SSC 27 Science Foundation & Board Preparation',
    slug: 'ssc-27-foundation-batch',
    category: 'SSC',
    subCategory: 'SSC 2027 Science',
    banner: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    price: 4990,
    originalPrice: 10000,
    discountPercentage: 50,
    enrolledCount: 2940,
    rating: 5.0,
    reviewsCount: 710,
    instructors: [
      INSTRUCTORS[0],
      INSTRUCTORS[1],
      INSTRUCTORS[2],
      INSTRUCTORS[3],
    ],
    shortDescription: 'Complete 9th & 10th Grade Science foundation covering Physics, Chemistry, General Math & Higher Math.',
    fullDescription: `নবম ও দশম শ্রেণির শিক্ষার্থীদের জন্য বিজ্ঞান বিভাগের সম্পূর্ণ সিলেবাস সহজ ও আকর্ষণীয়ভাবে আয়ত্ত করার প্রিমিয়াম কোর্স।`,
    features: [
      '১৮০+ এইচডি অ্যানিমেটেড ও ইন্টারেক্টিভ ক্লাস',
      'এসএসসি টেস্ট পেপার সলভিং ও বোর্ড প্রশ্ন এনালাইসিস',
      'সাপ্তাহিক ও মাসিক প্রগ্রেসিভ টেস্ট',
      'অভিভাবকদের জন্য প্রগ্রেস এসএমএস ট্র্যাকিং',
    ],
    syllabus: [
      {
        title: 'Class 9-10 Physics Full Syllabus',
        duration: '45 Classes',
        lessons: ['Motion & Force', 'Work Power Energy', 'Light & Optics', 'Electricity & Magnetism'],
      },
      {
        title: 'Class 9-10 Chemistry Full Syllabus',
        duration: '45 Classes',
        lessons: ['States of Matter', 'Structure of Atom', 'Periodic Table', 'Chemical Reactions'],
      },
    ],
    demoVideos: [
      {
        title: 'Physics Demo: বল ও গতিবিদ্যা বাস্তব উদাহরণ - Redwan Sir',
        instructor: 'Redwan Hushen',
        youtubeId: 'WO1KcxKmgYk',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
        duration: '40:00',
      },
    ],
    isPopular: false,
    isNew: true,
  },
  {
    id: 'buet-medical-admission-mastery',
    title: 'BUET & Medical Admission Engineering Physics & Chem Mastery',
    slug: 'buet-medical-admission-mastery',
    category: 'Admission',
    subCategory: 'Engineering & Medical 2026-27',
    banner: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    price: 7490,
    originalPrice: 15000,
    discountPercentage: 50,
    enrolledCount: 5120,
    rating: 5.0,
    reviewsCount: 1890,
    instructors: [
      INSTRUCTORS[0],
      INSTRUCTORS[1],
      INSTRUCTORS[2],
    ],
    shortDescription: 'Advanced problem solving, concept deep-dives, and BUET/CKRUET/Medical standard question bank cracking.',
    fullDescription: `বিশ্ববিদ্যালয় ভর্তি পরীক্ষায় শীর্ষস্থান অর্জনের লক্ষ্যে সাজানো এক্সক্লুসিভ ইঞ্জিনিয়ারিং ও মেডিকেল ফাউন্ডেশন কোর্স।`,
    features: [
      'গত ২০ বছরের বুয়েট ও মেডিকেল প্রশ্ন সমাধান',
      'ক্যালকুলেটর হ্যাকস ও টাইম ম্যানেজমেন্ট স্ট্র্যাটেজি',
      'দৈনিক ৬০ নম্বরের লাইভ র‍্যাঙ্কিং এক্সাম',
      '১-অন-১ বুয়েট ও ডিএমসি মেন্টরশিপ সাপোর্ট',
    ],
    syllabus: [
      {
        title: 'Engineering Physics Concept Mastery',
        duration: '50 Classes',
        lessons: ['Rotational Dynamics & Torque', 'Thermodynamics Advanced', 'Wave Optics & Modern Physics'],
      },
    ],
    demoVideos: [
      {
        title: 'Admission Demo: বুয়েট স্ট্যান্ডার্ড ট্রিকি ফিজিক্স প্রবলেমস - Redwan Sir',
        instructor: 'Redwan Hushen',
        youtubeId: 'WO1KcxKmgYk',
        thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
        duration: '55:15',
      },
    ],
    isPopular: true,
  },
];

export const EXAMS: Exam[] = [
  {
    id: 'exam-1',
    title: 'রাষ্ট্র, নাগরিকতা ও আইন',
    subject: 'Civics & Governance',
    code: 'FRPP 26 - CIV-01',
    banner: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    type: 'Public',
    badge: 'FRPP 26',
    format: 'MCQ',
    startDate: '17 Dec 2025, 06:01 am',
    endDate: '29 Dec 2025, 06:01 pm',
    durationMinutes: 20,
    totalMarks: 25,
    questionsCount: 5,
    questions: [
      {
        id: 1,
        question: 'রাষ্ট্রের সবচেয়ে গুরুত্বপূর্ণ ও অপরিহার্য উপাদান কোনটি?',
        options: ['নির্দিষ্ট ভূখণ্ড', 'জনসমষ্টি', 'সার্বভৌমত্ব', 'সরকার'],
        correctAnswer: 2,
        explanation: 'সার্বভৌমত্ব রাষ্ট্রের চরম, পরম ও সর্বোচ্চ ক্ষমতা যা ব্যতীত রাষ্ট্র গঠিত হতে পারে না।'
      },
      {
        id: 2,
        question: 'আইন সাধারণত কত প্রকার?',
        options: ['২ প্রকার', '৩ প্রকার', '৪ প্রকার', '৫ প্রকার'],
        correctAnswer: 1,
        explanation: 'আইন প্রধানত ৩ প্রকার: সরকারি আইন, বেসরকারি আইন এবং আন্তর্জাতিক আইন।'
      },
      {
        id: 3,
        question: 'নাগরিকতা অর্জনের স্বাভাবিক নিয়ম কোনটি?',
        options: ['জন্মসূত্র', 'অনুমোদন সূত্র', 'বিয়ে সংক্রান্ত সূত্র', 'সম্পত্তি ক্রয় সূত্র'],
        correctAnswer: 0,
        explanation: 'জন্মসূত্রে নাগরিকতা অর্জনই নাগরিকতা অর্জনের প্রধান ও সার্বজনীন নিয়ম।'
      },
      {
        id: 4,
        question: 'গণতান্ত্রিক রাষ্ট্রে সার্বভৌম ক্ষমতার প্রকৃত উৎস কে?',
        options: ['প্রধানমন্ত্রী', 'রাষ্ট্রপতি', 'জনগণ', 'সংসদ'],
        correctAnswer: 2,
        explanation: 'গণতন্ত্রের সংজ্ঞানুযায়ী সকল ক্ষমতার উৎস সাধারণ জনগণ।'
      },
      {
        id: 5,
        question: 'সুশাসনের মূল চাবিকাঠি কোনটি?',
        options: ['জবাবদিহিতা ও স্বচ্ছতা', 'কঠোর আইন', 'আমলাতন্ত্রের আধিপত্য', 'সামরিক শক্তি'],
        correctAnswer: 0,
        explanation: 'স্বচ্ছতা, জবাবদিহিতা ও আইনের শাসন সুশাসনের অপরিহার্য স্তম্ভ।'
      }
    ]
  },
  {
    id: 'exam-2',
    title: 'আলোর প্রতিফলন',
    subject: 'Physics Chapter 8',
    code: 'FRPP 26 - PHY-08',
    banner: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80',
    type: 'Public',
    badge: 'FRPP 26',
    format: 'MCQ',
    startDate: '17 Dec 2025, 06:00 am',
    endDate: '21 Dec 2025, 06:00 pm',
    durationMinutes: 20,
    totalMarks: 25,
    questionsCount: 5,
    questions: [
      {
        id: 1,
        question: 'সমতল দর্পণে সৃষ্ট প্রতিবিম্বের বৈশিষ্ট্য কোনটি?',
        options: ['বাস্তব ও উল্টো', 'অবাস্তব ও সোজা', 'বাস্তব ও সোজা', 'অবাস্তব ও উল্টো'],
        correctAnswer: 1,
        explanation: 'সমতল দর্পণে সবসময় অবাস্তব ও সোজা প্রতিবিম্ব গঠিত হয় এবং লক্ষ্যবস্তুর দূরত্বের সমান দূরত্বে গঠিত হয়।'
      },
      {
        id: 2,
        question: 'দর্পণের বক্রতার ব্যাসার্ধ (R) এবং ফোকাস দূরত্ব (f) এর সম্পর্ক কোনটি?',
        options: ['f = 2R', 'f = R / 2', 'f = R + 2', 'f = R²'],
        correctAnswer: 1,
        explanation: 'গোলীয় দর্পণের ফোকাস দূরত্ব বক্রতার ব্যাসার্ধের অর্ধেক, অর্থাৎ f = R/2।'
      },
      {
        id: 3,
        question: 'গাড়ির পেছনের দৃশ্য দেখার জন্য ড্রাইভারের পাশে কোন দর্পণ ব্যবহার করা হয়?',
        options: ['উত্তল দর্পণ', 'অবতল দর্পণ', 'সমতল দর্পণ', 'অধিবৃত্তীয় দর্পণ'],
        correctAnswer: 0,
        explanation: 'উত্তল দর্পণ বিস্তৃত দৃষ্টিসীমা (Wide Field of View) তৈরি করে এবং সবসময় সোজা ও খর্বিত প্রতিবিম্ব দেয়।'
      },
      {
        id: 4,
        question: 'আপতন কোণ ৩০° হলে প্রতিফলন কোণ কত হবে?',
        options: ['৬০°', '৪৫°', '৩০°', '৯০°'],
        correctAnswer: 2,
        explanation: 'আলোর প্রতিফলনের প্রথম সূত্র অনুযায়ী, আপতন কোণ = প্রতিফলন কোণ (i = r)।'
      },
      {
        id: 5,
        question: 'দাঁতের চিকিৎসকরা রোগীর দাঁত পরীক্ষার জন্য সাধারণত কোন দর্পণ ব্যবহার করেন?',
        options: ['উত্তল দর্পণ', 'অবতল দর্পণ', 'সমতল দর্পণ', 'দ্বি-উত্তল লেন্স'],
        correctAnswer: 1,
        explanation: 'অবতল দর্পণ লক্ষ্যবস্তুকে ফোকাসের মধ্যে রাখলে অত্যন্ত বিবর্ধিত ও সোজা প্রতিবিম্ব প্রদর্শন করে।'
      }
    ]
  },
  {
    id: 'exam-3',
    title: 'পর্যায় সারণি',
    subject: 'Chemistry Chapter 4',
    code: 'FRPP 26 - CHEM-04',
    banner: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
    type: 'Public',
    badge: 'FRPP 26',
    format: 'MCQ',
    startDate: '17 Dec 2025, 06:00 am',
    endDate: '21 Dec 2025, 06:00 pm',
    durationMinutes: 20,
    totalMarks: 25,
    questionsCount: 5,
    questions: [
      {
        id: 1,
        question: 'আধুনিক পর্যায় সারণির মূল ভিত্তি কী?',
        options: ['পারমাণবিক ভর', 'পারমাণবিক সংখ্যা', 'ইলেকট্রন বিন্যাস', 'যোজ্যতা'],
        correctAnswer: 2,
        explanation: 'পর্যায় সারণির মূল ভিত্তি মৌলসমূহের সর্ববহিঃস্থ স্তরের ইলেকট্রন বিন্যাস।'
      },
      {
        id: 2,
        question: 'পর্যায় সারণির গ্রুপ ১ এর মৌলসমূহকে কী বলা হয়?',
        options: ['মৃৎক্ষার ধাতু', 'হ্যালোজেন', 'ক্ষার ধাতু', 'মুদ্রা ধাতু'],
        correctAnswer: 2,
        explanation: 'গ্রুপ ১ এর মৌলগুলো পানির সাথে বিক্রিয়া করে তীব্র ক্ষার ও হাইড্রোজেন গ্যাস উৎপন্ন করে বিধায় এদের ক্ষার ধাতু বলে।'
      },
      {
        id: 3,
        question: 'নিচের কোন মৌলটির তড়িৎ ঋণাত্মকতা সর্বাধিক?',
        options: ['ক্লোরিন (Cl)', 'অক্সিজেন (O)', 'ফ্লোরিন (F)', 'নাইট্রোজেন (N)'],
        correctAnswer: 2,
        explanation: 'পর্যায় সারণিতে ফ্লোরিনের তড়িৎ ঋণাত্মকতার মান সর্বোচ্চ (৪.০)।'
      },
      {
        id: 4,
        question: 'পর্যায় সারণির একই পর্যায়ে বাম থেকে ডানে গেলে পরমাণুর আকার কেমন হয়?',
        options: ['বৃদ্ধি পায়', 'হ্রাস পায়', 'অপরিবর্তিত থাকে', 'প্রথমে কমে পরে বাড়ে'],
        correctAnswer: 1,
        explanation: 'একই পর্যায়ে প্রোটন সংখ্যা বৃদ্ধি পাওয়ায় নিউক্লিয়াসের আকর্ষণ বাড়ে, ফলে পরমাণুর ব্যাসার্ধ হ্রাস পায়।'
      },
      {
        id: 5,
        question: 'গ্রুপ ১৭ এর মৌলসমূহকে কী নামে অভিহিত করা হয়?',
        options: ['চালফোজেন', 'হ্যালোজেন', 'নোবেল গ্যাস', 'সংক্রমণ ধাতু'],
        correctAnswer: 1,
        explanation: 'হ্যালোজেন শব্দের অর্থ লবণ উৎপাদক।'
      }
    ]
  },
  {
    id: 'exam-4',
    title: 'পদার্থের গঠন',
    subject: 'Chemistry Chapter 3',
    code: 'FRPP 26 - CHEM-03',
    banner: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&auto=format&fit=crop&q=80',
    type: 'Public',
    badge: 'FRPP 26',
    format: 'MCQ',
    startDate: '17 Dec 2025, 07:00 am',
    endDate: '21 Dec 2025, 05:59 am',
    durationMinutes: 20,
    totalMarks: 25,
    questionsCount: 5,
    questions: [
      {
        id: 1,
        question: 'আইসোটোপের ক্ষেত্রে কোনটি সমান থাকে?',
        options: ['ভর সংখ্যা', 'নিউট্রন সংখ্যা', 'প্রোটন সংখ্যা', 'পারমাণবিক ভর'],
        correctAnswer: 2,
        explanation: 'আইসোটোপে প্রোটন সংখ্যা সমান থাকে কিন্তু ভর সংখ্যা ও নিউট্রন সংখ্যা ভিন্ন হয়।'
      },
      {
        id: 2,
        question: 'বোর পরমাণু মডেল কত সালে প্রস্তাবিত হয়?',
        options: ['১৯১১', '১৯১৩', '১৯১৬', '১৯২৪'],
        correctAnswer: 1,
        explanation: 'নীলস বোর ১৯১৩ সালে কোয়ান্টাম তত্ত্বের ভিত্তিতে তাঁর পরমাণু মডেল প্রস্তাব করেন।'
      }
    ]
  },
  {
    id: 'exam-5',
    title: 'তরঙ্গ ও শব্দ',
    subject: 'Physics Chapter 7',
    code: 'FRPP 26 - PHY-07',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    type: 'Public',
    badge: 'FRPP 26',
    format: 'MCQ',
    startDate: '18 Oct 2025, 10:00 pm',
    endDate: '19 Oct 2025, 05:59 am',
    durationMinutes: 20,
    totalMarks: 25,
    questionsCount: 5,
    questions: [
      {
        id: 1,
        question: 'শব্দ কোন ধরনের তরঙ্গ?',
        options: ['অনুদৈর্ঘ্য তরঙ্গ', 'অনুপ্রস্থ তরঙ্গ', 'তাড়িতচৌম্বক তরঙ্গ', 'স্থির তরঙ্গ'],
        correctAnswer: 0,
        explanation: 'শব্দ সংকোচন ও প্রসারণের মাধ্যমে মাধ্যমের কণার স্পন্দনের সমান্তরালে সঞ্চালিত হয়, তাই এটি অনুদৈর্ঘ্য তরঙ্গ।'
      },
      {
        id: 2,
        question: 'স্বাভাবিক তাপমাত্রায় বাতাসে শব্দের বেগ কত?',
        options: ['৩৩২ মি./সে.', '৩৪৩ মি./সে.', '৩০০ মি./সে.', '১৫০০ মি./সে.'],
        correctAnswer: 1,
        explanation: '২০° সেলসিয়াসে বাতাসে শব্দের বেগ প্রায় ৩৪৩ মিটার/সেকেন্ড।'
      }
    ]
  },
  {
    id: 'exam-6',
    title: 'উচ্চতর গণিত - ত্রিকোণমিতি স্পেশাল',
    subject: 'Higher Math Chapter 7',
    code: 'FRPP 26 - MATH-07',
    banner: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    type: 'Private',
    badge: 'HSC VIP',
    format: 'MCQ',
    startDate: '20 Jan 2026, 08:00 pm',
    endDate: '25 Jan 2026, 11:59 pm',
    durationMinutes: 30,
    totalMarks: 30,
    questionsCount: 5,
    questions: [
      {
        id: 1,
        question: 'sin²θ + cos²θ এর মান কত?',
        options: ['0', '1', '2', 'tanθ'],
        correctAnswer: 1,
        explanation: 'ত্রিকোণমিতির মৌলিক অভেদ অনুযায়ী sin²θ + cos²θ = 1।'
      }
    ]
  }
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    studentName: 'Tasnim Ahmed Shanto',
    roll: 'HSC28-1092',
    collegeOrSchool: 'Notre Dame College, Dhaka',
    score: 25,
    totalMarks: 25,
    timeSpent: '07m 42s',
    accuracy: 100
  },
  {
    rank: 2,
    studentName: 'Afsana Mim',
    roll: 'HSC28-2041',
    collegeOrSchool: 'Viqarunnisa Noon College',
    score: 25,
    totalMarks: 25,
    timeSpent: '09m 14s',
    accuracy: 100
  },
  {
    rank: 3,
    studentName: 'Shahriar Kabir',
    roll: 'HSC28-0854',
    collegeOrSchool: 'Dhaka City College',
    score: 24,
    totalMarks: 25,
    timeSpent: '08m 50s',
    accuracy: 96
  },
  {
    rank: 4,
    studentName: 'Nusrat Jahan Raisa',
    roll: 'HSC28-3112',
    collegeOrSchool: 'Holy Cross College',
    score: 24,
    totalMarks: 25,
    timeSpent: '10m 05s',
    accuracy: 96
  },
  {
    rank: 5,
    studentName: 'Tanvir Mahmud Sakib',
    roll: 'HSC28-1440',
    collegeOrSchool: 'Rajshahi College',
    score: 23,
    totalMarks: 25,
    timeSpent: '11m 30s',
    accuracy: 92
  },
  {
    rank: 6,
    studentName: 'Muntaha Islam',
    roll: 'HSC28-4008',
    collegeOrSchool: 'Chittagong College',
    score: 23,
    totalMarks: 25,
    timeSpent: '12m 10s',
    accuracy: 92
  },
  {
    rank: 7,
    studentName: 'Mahir Faysal',
    roll: 'HSC28-0019',
    collegeOrSchool: 'Adamjee Cantonment College',
    score: 22,
    totalMarks: 25,
    timeSpent: '12m 45s',
    accuracy: 88
  }
];

export const STUDENT_REVIEWS: StudentReview[] = [
  {
    id: 'rev-1',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    courseTitle: 'PCMB 1st Paper Combo Course HSC-28',
    name: 'Sāz Zād',
    role: 'Verified Student',
    college: 'Notre Dame College',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    reviewText: 'অ্যাপ্রিশিয়েট হচ্ছে যে ৪০+ এর মধ্যে ৩৭+ পাওয়া যায় এরকম ক্যালকুলেশন। রেডওয়ান স্যারের ফিজিক্স লেকচার ১০০ তে ১০০ পাওয়ার উপযুক্ত প্রস্তুতি দেয়। অসাধারণ পড়ানো ভাইয়া!',
    date: '2 days ago',
    isFeatured: true,
    status: 'approved',
    likesCount: 24,
  },
  {
    id: 'rev-2',
    courseId: 'hsc-ict-ch5-programming',
    courseTitle: 'HSC ICT Chapter 5: C Programming Masterclass',
    name: 'Zai Nab',
    role: 'Verified Student',
    college: 'Viqarunnisa Noon College',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    reviewText: 'সি প্রোগ্রামিং নিয়ে আগে অনেক ভয় কাজ করত। লুপ, অ্যারে, পয়েন্টার সব কিছু এত সহজে প্র্যাকটিক্যাল কোড রান করে বোঝানো হয়েছে যে এখন ICT এর সেরা সাবজেক্ট মনে হয়!',
    date: '3 days ago',
    isFeatured: true,
    status: 'approved',
    likesCount: 18,
  },
  {
    id: 'rev-3',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    courseTitle: 'PCMB 1st Paper Combo Course HSC-28',
    name: 'Sumaiya Sumu',
    role: 'Verified Student',
    college: 'Holy Cross College',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    reviewText: 'এতো সুন্দর করে বোঝানো হয় প্রত্যেক টা টপিক একদম ক্লিয়ার হয়ে যায়। প্রতিটি যদি ধৈর্য্য সহকারে ক্লাস গুলো করে নিশ্চিত সে ভালো রেজাল্ট করবে ইনশাআল্লাহ।',
    date: '5 days ago',
    isFeatured: true,
    status: 'approved',
    likesCount: 31,
  },
  {
    id: 'rev-4',
    courseId: 'hsc-28-ebi-combo',
    courseTitle: 'HSC 28 EBI (English, Bangla, ICT) Complete Batch',
    name: 'Fakir Nazma Nasrin',
    role: 'Verified Student',
    college: 'Dhaka Residential Model College',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    reviewText: 'কৃতজ্ঞতা জানিয়ে থাকব FRPB-25 free course টা অসাধারণ! এই কোর্সটা দেখে অনেকেরই সহযোগী অনেক পেয়েছি এবং শিখতে পারছি। জ্ঞান একটি ফ্রি কোর্স এভাবে পেয়ে যারা উপকৃত ছিলাম আমরা ধন্যবাদ রেডওয়ান স্যারকে এত সুন্দর উদ্যোগের জন্য।',
    date: '1 week ago',
    isFeatured: true,
    status: 'approved',
    likesCount: 15,
  },
  {
    id: 'rev-5',
    courseId: 'buet-medical-admission-mastery',
    courseTitle: 'BUET & Medical Admission Engineering Foundation',
    name: 'Arif Chowdhury',
    role: 'Verified Student',
    college: 'Chittagong Govt College',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    reviewText: 'উচ্চতর গণিত ও পদার্থবিজ্ঞানের জন্য এর চেয়ে ভালো অনলাইন প্ল্যাটফর্ম আমি বাংলাদেশে দেখিনি। কনসেপ্ট এত সাবলীল ভাষায় বোঝানো হয় যে কঠিন অঙ্কও সহজ মনে হয়।',
    date: '1 week ago',
    isFeatured: true,
    status: 'approved',
    likesCount: 42,
  },
  {
    id: 'rev-6',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    courseTitle: 'PCMB 1st Paper Combo Course HSC-28',
    name: 'Tanzim Hasan',
    role: 'Verified Student',
    college: 'Rajshahi College',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    reviewText: 'ক্লাসের সাথে সাথে প্রতিটি লেকচারের হ্যান্ডনোট আর পিডিএফ পাওয়ার কারণে পরীক্ষার আগে রিভিশন দেওয়া খুব সহজ হয়েছে। সবাইকে রেকমেন্ড করব!',
    date: '2 weeks ago',
    isFeatured: true,
    status: 'approved',
    likesCount: 19,
  }
];

export const INITIAL_LECTURE_COMMENTS: LectureComment[] = [
  {
    id: 'com-1',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    lessonId: 'lec-03',
    studentName: 'Gazi Gazi',
    avatarBgColor: 'bg-purple-600',
    text: 'Ha',
    timestamp: '5m ago',
    likes: 2,
    isLiked: false,
  },
  {
    id: 'com-2',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    lessonId: 'lec-03',
    studentName: 'Momin Chowdhury',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    text: 'EBI er course start hoye geche',
    timestamp: '12m ago',
    likes: 5,
    isLiked: true,
  },
  {
    id: 'com-3',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    lessonId: 'lec-03',
    studentName: 'RH Rakib',
    avatarBgColor: 'bg-emerald-800',
    text: 'Hey I am SSC 27',
    timestamp: '25m ago',
    likes: 3,
    isLiked: false,
  },
  {
    id: 'com-4',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    lessonId: 'lec-03',
    studentName: 'Aesthetic Girl',
    avatarBgColor: 'bg-amber-100 text-amber-800',
    text: 'Ai class ki Abar YouTube a diban naki',
    timestamp: '40m ago',
    likes: 1,
    isLiked: false,
  },
  {
    id: 'com-5',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    lessonId: 'lec-03',
    studentName: 'Shah Al Saimum',
    avatarBgColor: 'bg-slate-500',
    text: 'Hd na',
    timestamp: '1h ago',
    likes: 0,
    isLiked: false,
  },
  {
    id: 'com-6',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    lessonId: 'lec-03',
    studentName: 'Prince Sarker',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    text: 'nice',
    timestamp: '2h ago',
    likes: 8,
    isLiked: true,
  },
  {
    id: 'com-7',
    courseId: 'pcmb-1st-paper-combo-hsc28',
    lessonId: 'lec-03',
    studentName: 'Abusufiyan Nirob',
    avatarBgColor: 'bg-lime-600',
    text: 'Only 4 day left',
    timestamp: '3h ago',
    likes: 4,
    isLiked: false,
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'HSC Physics 1st Paper Complete Formula & Shortcut Sheet',
    category: 'Formula Sheet',
    author: 'Redwan Hushen',
    price: 190,
    originalPrice: 400,
    pages: 64,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'এইচএসসি ও এডমিশন পদার্থবিজ্ঞান ১ম পত্রের প্রতিটি সূত্রের প্রমাণ, গ্রাফ ও ম্যাথমেটিক্যাল ক্যালকুলেটর শর্টকাটের রঙিন ই-বুক।',
    downloadCount: 14200
  },
  {
    id: 'prod-2',
    title: 'HSC Higher Math Calculus Hackbook (Differential & Integral)',
    category: 'E-Book',
    author: 'Hasan Anam',
    price: 250,
    originalPrice: 500,
    pages: 112,
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=600&auto=format&fit=crop&q=80',
    description: 'লিমিট, ডিফারেনশিয়েশন ও ইন্টিগ্রেশনের ৫০+ বোর্ড ও বুয়েট স্পেশাল শর্টকাট টেকনিক ও প্রশ্নব্যাংক।',
    downloadCount: 9800
  },
  {
    id: 'prod-3',
    title: 'Organic Chemistry Reaction Mechanism Illustrated Map',
    category: 'Lecture Note',
    author: 'Fahad Hossain Shovon',
    price: 220,
    originalPrice: 450,
    pages: 88,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    description: 'জৈব যৌগের রূপান্তর, নামধারী বিক্রিয়া ও বিক্রিয়ার কৌশলের ভিজ্যুয়াল মাইন্ড-ম্যাপ।',
    downloadCount: 11400
  },
  {
    id: 'prod-4',
    title: 'HSC ICT Chapter 3 & 5 Programming & Logic Gate Workbook',
    category: 'Hardcopy Book',
    author: 'Niazmorshed Faysal',
    price: 320,
    originalPrice: 600,
    pages: 140,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    description: 'সি প্রোগ্রামিং কোডিং, লজিক গেট সরলীকরণ ও এইচটিএমএল প্র্যাকটিস নোটবুক।',
    downloadCount: 8100
  }
];

export const COURSES_DATA = COURSES;
export const EXAMS_DATA = EXAMS;

