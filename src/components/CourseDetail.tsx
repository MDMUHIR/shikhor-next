import { useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Star,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Video,
  Tag,
  ChevronDown,
  ChevronUp,
  Share2,
  HelpCircle,
  Sparkles,
  MessageSquare,
  Send,
  ThumbsUp,
  ShieldCheck,
  Tv,
  FileText,
  Award,
} from "lucide-react";
import { Course, Instructor, StudentReview } from "../types";
import { useApp } from "../context/AppContext";

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onEnroll: (course: Course, discountCode?: string) => void;
  isEnrolled: boolean;
  onGoToLearn: () => void;
}

export default function CourseDetail({
  course,
  onBack,
  onEnroll,
  isEnrolled,
  onGoToLearn,
}: CourseDetailProps) {
  const navigate = useNavigate();
  const { reviews, handleAddReview, user, setIsAuthOpen } = useApp();

  const [activeTab, setActiveTab] = useState<"overview" | "demo" | "reviews">(
    "overview",
  );
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [selectedDemoVideo, setSelectedDemoVideo] = useState(
    course.demoVideos[0] || null,
  );
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState(user?.name || "");
  const [reviewerCollege, setReviewerCollege] = useState(user?.college || "");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);

  // Filter reviews matching this course or general reviews
  const courseReviews = reviews.filter(
    (r) =>
      r.courseId === course.id || r.courseId === course.slug || !r.courseId,
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponInput.trim().toUpperCase();
    if (code === "REDWAN10" || code === "HSC28" || code === "SPECIAL") {
      setAppliedCoupon({ code, discount: 500 });
    } else if (code === "") {
      setCouponError("Please enter a coupon code");
    } else {
      setCouponError("Invalid coupon code. Try REDWAN10 or HSC28");
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    handleAddReview({
      courseId: course.id,
      courseTitle: course.title,
      name: reviewerName.trim() || user?.name || "Verified Student",
      role: "Verified Student",
      college: reviewerCollege.trim() || user?.college || "HSC Candidate",
      avatar:
        user?.avatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      rating: reviewRating,
      reviewText: reviewComment.trim(),
      isFeatured: true,
      status: "approved",
    });

    setReviewComment("");
    setShowReviewForm(false);
    setReviewSuccessMsg(true);
    setTimeout(() => setReviewSuccessMsg(false), 5000);
  };

  const finalPrice = appliedCoupon
    ? Math.max(0, course.price - appliedCoupon.discount)
    : course.price;

  const introVideo = course.courseIntroVideo || course.demoVideos[0];
  const openDemoTab = (video: (typeof course.demoVideos)[number] | undefined) => {
    if (!video) return;
    setSelectedDemoVideo(video);
    setActiveTab("demo");
    setTimeout(() => {
      document.getElementById("course-content")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/60 font-sans relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Courses</span>
        </button>

        {/* Course Hero with the details video above the fold */}
        <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-[#071e22] text-white shadow-xl shadow-slate-900/10">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative aspect-video overflow-hidden bg-slate-950 lg:aspect-auto lg:min-h-[430px]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${introVideo?.youtubeId || "WO1KcxKmgYk"}?autoplay=0&rel=0`}
                title={introVideo?.title || `${course.title} course details video`}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/65 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
                Course details video
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-blue-200">
                <span className="rounded-full bg-blue-400/15 px-3 py-1.5 ring-1 ring-inset ring-blue-300/20">
                  {course.subCategory || "Premium learning program"}
                </span>
                {course.isPopular && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1.5 text-amber-950">
                    <Sparkles className="h-3.5 w-3.5" />
                    Popular choice
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
                {course.shortDescription}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2 border-y border-white/10 py-4 text-center sm:gap-4">
                <div>
                  <p className="text-lg font-black text-white">{course.enrolledCount.toLocaleString()}+</p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">Students</p>
                </div>
                <div className="border-x border-white/10">
                  <p className="flex items-center justify-center gap-1 text-lg font-black text-white">
                    {course.rating} <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">Rating</p>
                </div>
                <div>
                  <p className="text-lg font-black text-white">{course.demoVideos.length}</p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">Demo classes</p>
                </div>
              </div>
              <button
                onClick={() => openDemoTab(course.demoVideos[0])}
                disabled={!course.demoVideos[0]}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-[#0d2f35] shadow-lg transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                <PlayCircle className="h-4 w-4 fill-blue-600 text-blue-600" />
                Explore demo classes
              </button>
            </div>
          </div>
        </section>

        {/* Main 2-Column Content Layout */}
        <div id="course-content" className="scroll-mt-24 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 xl:gap-8">
          {/* Left Column: Tabs & Content (Overview / Demo Class / Reviews) */}
          <div className="lg:col-span-8 space-y-6">
            {/* White Container Card with Tabs */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/80 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.28)] overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-200/80 bg-white/70">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 cursor-pointer ${
                    activeTab === "overview"
                      ? "border-blue-600 text-blue-700 bg-blue-50/70"
                      : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab("demo")}
                  className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 cursor-pointer ${
                    activeTab === "demo"
                      ? "border-blue-600 text-blue-700 bg-blue-50/70"
                      : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Demo Class</span>
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 cursor-pointer ${
                    activeTab === "reviews"
                      ? "border-blue-600 text-blue-700 bg-blue-50/70"
                      : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <Star className="w-4 h-4" />
                  <span>Reviews ({courseReviews.length})</span>
                </button>
              </div>

              {/* Tab 1: Overview Content */}
              {activeTab === "overview" && (
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Combo Instructors Row */}
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-950 mb-4 tracking-tight">
                      Combo Instructors
                    </h3>
                    <div className="flex items-start gap-4 overflow-x-auto pb-3 scrollbar-none">
                      {course.instructors.map((inst) => (
                        <div
                          key={inst.id}
                          onClick={() => setSelectedInstructor(inst)}
                          className="flex flex-col items-center text-center cursor-pointer group shrink-0 w-24"
                        >
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-blue-500/20 group-hover:ring-blue-600 group-hover:scale-105 transition-all mb-2">
                            <img
                              src={inst.avatar}
                              alt={inst.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            {inst.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Combo Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-950 mb-3 tracking-tight">
                      Combo Description
                    </h3>
                    <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3 font-normal">
                      {showFullDesc ? (
                        course.fullDescription
                      ) : (
                        <div>{course.fullDescription.slice(0, 320)}...</div>
                      )}
                    </div>
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="mt-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{showFullDesc ? "Show less" : "See more"}</span>
                      {showFullDesc ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Key Features Bullet Points */}
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-950 mb-4 tracking-tight">
                      Course Features &amp; Offerings
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-700 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Syllabus Breakdown */}
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-950 mb-4 tracking-tight">
                      Detailed Syllabus Breakdown
                    </h3>
                    <div className="space-y-3">
                      {course.syllabus.map((s, idx) => (
                        <div
                          key={idx}
                          className="border border-slate-200/80 rounded-2xl p-4 bg-white/70 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                              {s.title}
                            </h4>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 w-fit">
                              {s.duration}
                            </span>
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-600 pl-1">
                            {s.lessons.map((lesson, lIdx) => (
                              <li key={lIdx}>{lesson}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Demo Class Content */}
              {activeTab === "demo" && (
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Free Interactive Demo Classes
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600">
                          Watch our sample masterclasses to experience our
                          teaching methodology before enrolling.
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigate(`/watch/${course.slug || course.id}`)
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <Tv className="w-3.5 h-3.5" />
                        <span>Open in Video Player</span>
                      </button>
                    </div>

                    {/* Video Player Box */}
                    {selectedDemoVideo && (
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 shadow-lg border border-slate-800 relative mb-6">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${selectedDemoVideo.youtubeId || "WO1KcxKmgYk"}?autoplay=0`}
                          title={selectedDemoVideo.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {/* Demo Class Playlist */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-900">
                        Available Sample Lectures
                      </h4>
                      {course.demoVideos.map((video) => (
                        <div
                          key={video.title}
                          onClick={() => setSelectedDemoVideo(video)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            selectedDemoVideo?.title === video.title
                              ? "bg-blue-50 border-blue-400"
                              : "bg-white border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                              <Video className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                                {video.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                Instructor: {video.instructor} •{" "}
                                {video.duration}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                            Play
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Reviews & Ratings */}
              {activeTab === "reviews" && (
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Reviews Summary Header */}
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl font-black text-slate-900">
                          {course.rating || 5.0}
                        </div>
                        <div className="flex items-center justify-center gap-0.5 text-amber-400 my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <div className="text-xs text-slate-500 font-semibold">
                          {courseReviews.length} total reviews
                        </div>
                      </div>

                      <div className="h-14 w-px bg-slate-200 hidden sm:block" />

                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <span className="w-12 font-bold">5 Stars</span>
                          <div className="w-28 sm:w-40 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-amber-400 h-full w-[92%]" />
                          </div>
                          <span className="font-semibold text-slate-700">
                            92%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-12 font-bold">4 Stars</span>
                          <div className="w-28 sm:w-40 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-amber-400 h-full w-[8%]" />
                          </div>
                          <span className="font-semibold text-slate-700">
                            8%
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!user) {
                          setIsAuthOpen(true);
                        } else {
                          setShowReviewForm(!showReviewForm);
                        }
                      }}
                      className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>
                        {showReviewForm
                          ? "Cancel Review"
                          : "Write a Student Review"}
                      </span>
                    </button>
                  </div>

                  {/* Success Toast */}
                  {reviewSuccessMsg && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Thank you! Your verified course review has been
                        submitted and posted.
                      </span>
                    </div>
                  )}

                  {/* Review Submission Form */}
                  {showReviewForm && (
                    <form
                      onSubmit={handleSubmitReview}
                      className="bg-white/95 backdrop-blur-xl rounded-2xl border border-blue-200/80 p-5 sm:p-6 shadow-[0_18px_50px_-30px_rgba(37,99,235,0.45)] space-y-4 animate-in zoom-in-95 duration-150"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-slate-900">
                          Submit Your Experience &amp; Feedback
                        </h4>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="p-1 hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= reviewRating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-300"
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs font-bold text-slate-700 ml-1">
                            ({reviewRating} / 5)
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Your Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            placeholder="e.g. Sazzad Hossain"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            College / Institution Name
                          </label>
                          <input
                            type="text"
                            required
                            value={reviewerCollege}
                            onChange={(e) => setReviewerCollege(e.target.value)}
                            placeholder="e.g. Notre Dame College"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Detailed Review &amp; Learning Experience
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="How did Redwan's Method classes help your concept clarity and exam preparation? Share your honest feedback..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs sm:text-sm resize-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Publish Review</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {courseReviews.length === 0 ? (
                      <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                        <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                        <h4 className="text-sm font-bold text-slate-800">
                          No reviews yet for this batch
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Be the first student to review this course!
                        </p>
                      </div>
                    ) : (
                      courseReviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-white/90 backdrop-blur rounded-2xl border border-slate-200/80 p-5 shadow-[0_14px_35px_-28px_rgba(15,23,42,0.5)] space-y-3 hover:border-blue-200/80 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  rev.avatar ||
                                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                                }
                                alt={rev.name}
                                className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                              />
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                                  {rev.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                                  <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                                    <ShieldCheck className="w-3 h-3" />
                                    {rev.role}
                                  </span>
                                  <span>•</span>
                                  <span>{rev.college}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-0.5 text-amber-400">
                              {[...Array(rev.rating || 5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3.5 h-3.5 fill-amber-400"
                                />
                              ))}
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                            {rev.reviewText}
                          </p>

                          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                            <span>{rev.date}</span>
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                              Verified Enrollment
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Checkout Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/80 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] p-5 sm:p-6 overflow-hidden">
              {/* Price Row */}
              <div className="flex items-baseline justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950">
                    ৳{finalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ৳{course.originalPrice.toLocaleString()}
                  </span>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">
                  {course.discountPercentage}% OFF
                </span>
              </div>

              {/* Coupon Code Section */}
              <form onSubmit={handleApplyCoupon} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Have Coupon Code?"
                    className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-xs text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Coupon &apos;{appliedCoupon.code}&apos; applied! ৳
                    {appliedCoupon.discount} discount
                  </p>
                )}
                {couponError && (
                  <p className="text-xs text-red-600 font-medium mt-1">
                    {couponError}
                  </p>
                )}
              </form>

              {/* CTA Button */}
              {isEnrolled ? (
                <button
                  onClick={onGoToLearn}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Go to My Course</span>
                </button>
              ) : (
                <button
                  onClick={() => onEnroll(course, appliedCoupon?.code)}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Login to Enroll</span>
                </button>
              )}

              {/* Student Count & Guarantee */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>Students</span>
                </div>
                <span className="font-bold text-slate-800">
                  {course.enrolledCount}
                </span>
              </div>
            </div>

            {/* Helpline Box */}
            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 text-center text-xs text-slate-600 border border-white/80 shadow-sm">
              <p className="font-semibold text-slate-800 mb-1">
                Need help with admission?
              </p>
              <p>
                Call our helpline at{" "}
                <strong className="text-blue-600">09617331133</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Modal preview if clicked */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedInstructor.avatar}
                alt={selectedInstructor.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  {selectedInstructor.name}
                </h4>
                <p className="text-xs text-blue-600 font-semibold">
                  {selectedInstructor.role}
                </p>
                <p className="text-xs text-slate-500">
                  {selectedInstructor.experience}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              {selectedInstructor.bio}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedInstructor(null)}
                className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
