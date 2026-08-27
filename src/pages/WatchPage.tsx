import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Settings,
  Send,
  FileText,
  ExternalLink,
  GraduationCap,
  User,
  Heart,
  MessageCircle,
  Trash2,
  Share2,
  BookOpen,
  ChevronDown,
  CheckCircle2,
  Download,
  X,
  Sparkles,
  ArrowLeft,
  ListVideo
} from 'lucide-react';
import { LectureComment } from '../types';

export default function WatchPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    courses,
    user,
    comments,
    handleAddComment,
    handleDeleteComment,
    handleLikeComment,
    instructors
  } = useApp();

  // Find course or fallback to default
  const course = courses.find((c) => c.slug === courseId || c.id === courseId) || courses[0];

  // Current Lesson / Lecture selection
  const lectureQuery = searchParams.get('lecture') || '3';
  const [currentLectureNum, setCurrentLectureNum] = useState<number>(parseInt(lectureQuery, 10) || 3);

  // Video playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(5); // 00:05
  const [duration, setDuration] = useState(5635); // 1:33:55 (5635 seconds)
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoQuality, setVideoQuality] = useState('1080p Full HD');
  const [showLectureSelector, setShowLectureSelector] = useState(false);

  // Material preview modal
  const [activeMaterial, setActiveMaterial] = useState<{ title: string; type: string; content: string } | null>(null);

  // Comment input state
  const [newCommentText, setNewCommentText] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Video container ref
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Time format helper (00:05 / 1:33:55)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Video timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed]);

  // Lead instructor or default Moheminul Omi / Redwan Hushen
  const leadInstructor = course?.instructors?.[0] || {
    name: 'Moheminul Omi',
    role: 'Course Instructor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  };

  // Filter comments for this course and lesson
  const courseComments = comments.filter(
    (c) => c.courseId === (course?.id || 'pcmb-1st-paper-combo-hsc28')
  );

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    handleAddComment(
      course?.id || 'pcmb-1st-paper-combo-hsc28',
      `lec-0${currentLectureNum}`,
      newCommentText.trim()
    );
    setNewCommentText('');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetVal = Number(e.target.value);
    setCurrentTime(targetVal);
  };

  const chapterTitle = 'অধ্যায় ৫: প্রোগ্রামিং ভাষা';
  const lectureTitleBangla = `লেকচার ০${currentLectureNum}`;

  return (
    <div className="min-h-screen rm-page-bg py-6 sm:py-8 px-3 sm:px-6 lg:px-10 font-sans">
      <div className="max-w-[1580px] mx-auto space-y-6">

        {/* 1. Top Chapter Title Header Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 px-6 py-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 bg-blue-600 rounded-full" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {chapterTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/courses/${course?.slug || course?.id}`)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Course Outline</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowLectureSelector(!showLectureSelector)}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100/80 border border-blue-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <ListVideo className="w-4 h-4" />
                <span>{lectureTitleBangla} (Switch Lecture)</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showLectureSelector && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Chapter 5 Lectures
                  </div>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setCurrentLectureNum(num);
                        setSearchParams({ lecture: num.toString() });
                        setShowLectureSelector(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        currentLectureNum === num ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>লেকচার ০{num}: C Programming Part {num}</span>
                      {currentLectureNum === num && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Main Grid: Left Column (Video Player + Info + Materials) & Right Column (Comments) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Video Player, Lecture Info, Materials (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Video Player Card */}
            <div
              ref={videoContainerRef}
              className="relative w-full aspect-video bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-800 group select-none flex flex-col justify-between"
            >
              {/* Background Video Poster / Graphic */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&auto=format&fit=crop&q=80"
                  alt="HSC ICT Chapter 5"
                  className="w-full h-full object-cover opacity-35 filter blur-xs"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/80" />

                {/* Custom Overlay Thumbnail reproducing exact graphic */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="inline-block px-3 py-1 bg-blue-600/30 border border-blue-400/40 rounded-full text-blue-300 text-xs font-black tracking-widest uppercase mb-3">
                    HSC ICT Masterclass
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight drop-shadow-md">
                    CHAPTER-5
                  </h2>
                  <p className="text-lg sm:text-2xl font-extrabold text-white tracking-wider mt-1 drop-shadow-sm">
                    C PROGRAMMING
                  </p>
                  <span className="text-xs text-blue-200 mt-2 font-medium bg-slate-900/60 px-3 py-1 rounded-full border border-white/10">
                    Basic to Pro Batch • {lectureTitleBangla}
                  </span>
                </div>
              </div>

              {/* Top Watermark / Status */}
              <div className="relative z-10 p-4 flex items-center justify-between text-white text-xs font-semibold bg-gradient-to-b from-slate-950/80 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-200 font-bold">Redwan&apos;s Method Live Stream Server</span>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300">
                  {videoQuality}
                </div>
              </div>

              {/* Big Center Play / Pause Button */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:scale-108 active:scale-95 transition-all duration-200 cursor-pointer ring-4 ring-white/20 backdrop-blur-xs"
                  aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom Video Controls Overlay (Always clean & accessible) */}
              <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-2">
                
                {/* Time Scrubber Bar */}
                <div className="relative w-full flex items-center group/scrub">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleScrub}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2 transition-all"
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Rewind 10s */}
                    <button
                      onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                      className="hover:text-blue-400 transition-colors cursor-pointer p-1"
                      title="Rewind 10s"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Play / Pause Toggle */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-blue-400 transition-colors cursor-pointer p-1"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    {/* Fast Forward 10s */}
                    <button
                      onClick={() => setCurrentTime((t) => Math.min(duration, t + 10))}
                      className="hover:text-blue-400 transition-colors cursor-pointer p-1"
                      title="Forward 10s"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    {/* Volume Toggle & Slider */}
                    <div className="flex items-center gap-1.5 group/vol">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-blue-400 transition-colors cursor-pointer p-1"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-rose-400" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(parseFloat(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-14 sm:w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    {/* Timestamp (00:05 / 1:33:55) */}
                    <span className="font-mono text-[11px] sm:text-xs text-slate-300 font-semibold tracking-wider">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Playback Speed selector */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="hover:text-blue-400 transition-colors cursor-pointer p-1 flex items-center gap-1"
                        title="Settings & Speed"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-[10px] font-bold">{playbackSpeed}x</span>
                      </button>

                      {showSettings && (
                        <div className="absolute right-0 bottom-full mb-2 w-48 bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl text-slate-200 z-50">
                          <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1">Speed</div>
                          <div className="grid grid-cols-4 gap-1 mb-2">
                            {[0.75, 1, 1.25, 1.5].map((spd) => (
                              <button
                                key={spd}
                                onClick={() => {
                                  setPlaybackSpeed(spd);
                                  setShowSettings(false);
                                }}
                                className={`py-1 rounded text-center text-xs font-bold ${
                                  playbackSpeed === spd ? 'bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700'
                                }`}
                              >
                                {spd}x
                              </button>
                            ))}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1">Quality</div>
                          {['1080p Full HD', '720p HD', '480p SD'].map((q) => (
                            <button
                              key={q}
                              onClick={() => {
                                setVideoQuality(q);
                                setShowSettings(false);
                              }}
                              className={`w-full text-left px-2 py-1 text-xs rounded hover:bg-slate-800 flex items-center justify-between ${
                                videoQuality === q ? 'text-blue-400 font-bold' : ''
                              }`}
                            >
                              <span>{q}</span>
                              {videoQuality === q && <CheckCircle2 className="w-3 h-3" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Fullscreen button */}
                    <button
                      onClick={toggleFullscreen}
                      className="hover:text-blue-400 transition-colors cursor-pointer p-1"
                      title="Fullscreen"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Lecture Title below player */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lectureTitleBangla}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                C Programming Syntax, Variables, Data Types &amp; Standard I/O Functions (printf &amp; scanf)
              </p>
            </div>

            {/* Instructor Card (Avatar + User Name + Course Instructor) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={leadInstructor.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                  alt={leadInstructor.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl object-cover ring-2 ring-blue-100 shadow-xs"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px]">
                  ✓
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {leadInstructor.name || 'Moheminul Omi'}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{leadInstructor.role || 'Course Instructor'}</span>
                </div>
              </div>
            </div>

            {/* Course Materials Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Course Materials
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {/* Material Tile 1: Note */}
                <div
                  onClick={() =>
                    setActiveMaterial({
                      title: `Chapter 5 Lecture Note (Lecture 0${currentLectureNum})`,
                      type: 'Lecture Handout & Formula Book',
                      content:
                        'সি প্রোগ্রামিংয়ের মৌলিক কাঠামো, হেডার ফাইল (#include <stdio.h>), মেইন ফাংশন, ভ্যারিয়েবল ডিক্লারেশন রুলস, ফরম্যাট স্পেসিফায়ার (%d, %f, %c, %lf) এবং এস্কেপ সিকোয়েন্সের বিস্তারিত বিশ্লেষণ নোট।',
                    })
                  }
                  className="bg-[#fff9ea] hover:bg-[#fff3d4] border border-amber-200/80 rounded-2xl sm:rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all duration-200 hover:shadow-md group"
                >
                  <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Note</h4>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 mt-1">
                      <ExternalLink className="w-3 h-3" />
                      <span>Open</span>
                    </span>
                  </div>
                </div>

                {/* Material Tile 2: Lecture Slide PDF */}
                <div
                  onClick={() =>
                    setActiveMaterial({
                      title: 'Lecture Slides & Code Snippets PDF',
                      type: 'Interactive Slide Deck',
                      content:
                        'প্রজেক্টরের মাধ্যমে ক্লাসে প্রদর্শিত সমস্ত স্লাইড, ফ্লোচার্ট, অ্যালগরিদম ডায়াগ্রাম এবং এক্সিকিউশন ট্র্যাকিং শিট।',
                    })
                  }
                  className="bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/80 rounded-2xl sm:rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all duration-200 hover:shadow-md group"
                >
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Slides PDF</h4>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 mt-1">
                      <ExternalLink className="w-3 h-3" />
                      <span>Open</span>
                    </span>
                  </div>
                </div>

                {/* Material Tile 3: Practice CQ/MCQ Sheet */}
                <div
                  onClick={() =>
                    setActiveMaterial({
                      title: 'Board CQ & Speed MCQ Sheet',
                      type: 'Practice Question Bank',
                      content:
                        'বিগত ৫ বছরের ঢাকা, চট্টগ্রাম, রাজশাহী ও অন্যান্য বোর্ডের সি প্রোগ্রামিং চ্যাপ্টারের সকল সৃজনশীল প্রশ্ন ও উত্তর সংকলন।',
                    })
                  }
                  className="bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-2xl sm:rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all duration-200 hover:shadow-md group"
                >
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">CQ Sheet</h4>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-1">
                      <ExternalLink className="w-3 h-3" />
                      <span>Open</span>
                    </span>
                  </div>
                </div>

                {/* Material Tile 4: Source Code File */}
                <div
                  onClick={() =>
                    setActiveMaterial({
                      title: 'Lecture 03 C Source Code (.c files)',
                      type: 'Code Repository',
                      content:
                        '#include <stdio.h>\n\nint main() {\n    int a, b, sum;\n    printf("Enter two numbers: ");\n    scanf("%d %d", &a, &b);\n    sum = a + b;\n    printf("Sum = %d\\n", sum);\n    return 0;\n}',
                    })
                  }
                  className="bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200/80 rounded-2xl sm:rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all duration-200 hover:shadow-md group"
                >
                  <div className="w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">C Code</h4>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 mt-1">
                      <ExternalLink className="w-3 h-3" />
                      <span>Open</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Commenting System (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 1. Write a Comment Box */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs space-y-3">
              <form onSubmit={handlePostComment} className="space-y-3">
                <div className="flex gap-3">
                  {/* User Avatar */}
                  <div className="shrink-0">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 text-slate-600 flex items-center justify-center font-bold text-sm">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
                      </div>
                    )}
                  </div>

                  {/* Textarea Input */}
                  <div className="flex-1">
                    <textarea
                      rows={3}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Write a Comments..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 resize-none transition-all"
                    />
                  </div>
                </div>

                {/* Bottom Row with Post Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 2. Comments List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-base font-black text-slate-900">
                  Comments
                </h3>
                <span className="text-xs font-bold text-slate-400">
                  {courseComments.length} questions &amp; notes
                </span>
              </div>

              <div className="space-y-2.5 max-h-[780px] overflow-y-auto pr-1">
                {courseComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:border-slate-300 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {/* Student Avatar or Initial Circle */}
                        {comment.studentAvatar ? (
                          <img
                            src={comment.studentAvatar}
                            alt={comment.studentName}
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                          />
                        ) : (
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-xs shadow-2xs ${
                              comment.avatarBgColor || 'bg-purple-600'
                            }`}
                          >
                            {comment.studentName.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            {comment.studentName}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            {comment.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Admin / Owner Delete */}
                      {(user?.role === 'admin' || user?.name === comment.studentName) && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          title="Delete comment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Comment text */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-12 font-medium">
                      {comment.text}
                    </p>

                    {/* Interactive Like & Reply Bar */}
                    <div className="flex items-center gap-4 pl-12 pt-1 text-[11px] text-slate-500 font-semibold">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className={`flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer ${
                          comment.isLiked ? 'text-blue-600 font-bold' : ''
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            comment.isLiked ? 'fill-blue-600 text-blue-600' : ''
                          }`}
                        />
                        <span>{comment.likes || 0}</span>
                      </button>

                      <button
                        onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </button>
                    </div>

                    {/* Nested Reply Input */}
                    {replyToId === comment.id && (
                      <div className="pl-12 pt-2 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder={`Reply to ${comment.studentName}...`}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                          />
                          <button
                            onClick={() => {
                              if (!replyText.trim()) return;
                              handleAddComment(
                                course?.id || 'pcmb-1st-paper-combo-hsc28',
                                `lec-0${currentLectureNum}`,
                                `@${comment.studentName} ${replyText.trim()}`
                              );
                              setReplyText('');
                              setReplyToId(null);
                            }}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Material Preview Modal */}
      {activeMaterial && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md inline-block mb-1.5">
                  {activeMaterial.type}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {activeMaterial.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMaterial(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-h-72 overflow-y-auto">
              <pre className="text-xs sm:text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
                {activeMaterial.content}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-medium">
                Verified Redwan&apos;s Method Academic Asset
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const blob = new Blob([activeMaterial.content], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${activeMaterial.title.replace(/\s+/g, '_')}.txt`;
                    link.click();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resource</span>
                </button>
                <button
                  onClick={() => setActiveMaterial(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
