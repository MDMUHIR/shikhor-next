import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Star, Search, Filter, Plus, ShieldCheck, Quote, 
  ThumbsUp, Send, CheckCircle2, MessageSquare, BookOpen, 
  Sparkles, Award 
} from 'lucide-react';
import StudentReviews from '../components/StudentReviews';

export default function ReviewsPage() {
  const navigate = useNavigate();
  const { reviews, courses, handleAddReview, user, setIsAuthOpen } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | 'ALL'>('ALL');
  const [selectedCourse, setSelectedCourse] = useState<string>('ALL');

  // Modal review state
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [name, setName] = useState(user?.name || '');
  const [college, setCollege] = useState(user?.college || '');
  const [reviewText, setReviewText] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (r.status === 'rejected') return false;
    const matchSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.courseTitle && r.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchRating = selectedRating === 'ALL' || r.rating === selectedRating;
    const matchCourse = selectedCourse === 'ALL' || r.courseId === selectedCourse;

    return matchSearch && matchRating && matchCourse;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const matchedCourse = courses.find((c) => c.id === courseId);

    handleAddReview({
      courseId: courseId || undefined,
      courseTitle: matchedCourse?.title || undefined,
      name: name.trim() || user?.name || 'Verified Student',
      role: 'Verified Student',
      college: college.trim() || user?.college || 'HSC Candidate',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating,
      reviewText: reviewText.trim(),
      isFeatured: true,
      status: 'approved',
    });

    setReviewText('');
    setIsWriteOpen(false);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 sm:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Hero Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified Student Experiences</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Student Reviews &amp; Success Stories
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Read authentic feedback from HSC and Admission candidates across Bangladesh who have achieved top scores using Redwan&apos;s Method.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center w-full sm:w-auto">
              <div className="text-3xl font-black text-slate-900 flex items-center justify-center gap-1">
                <span>5.0</span>
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-xs text-amber-800 font-bold mt-0.5">
                Based on {reviews.length} reviews
              </p>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  setIsAuthOpen(true);
                } else {
                  setIsWriteOpen(true);
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {submittedToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thank you! Your verified student review has been published successfully.</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student, college, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-slate-50"
            />
          </div>

          {/* Rating and Course Filter Selectors */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Course:</span>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none"
              >
                <option value="ALL">All Batches</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <span>Rating:</span>
              <select
                value={selectedRating}
                onChange={(e) =>
                  setSelectedRating(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))
                }
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none"
              >
                <option value="ALL">All Ratings</option>
                <option value="5">5 Stars only</option>
                <option value="4">4 Stars &amp; above</option>
                <option value="3">3 Stars &amp; above</option>
              </select>
            </div>
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-800">No reviews found</h3>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or course filter.</p>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={rev.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-50"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {rev.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[170px]">
                          {rev.college}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {rev.courseTitle && (
                    <div className="inline-block mb-2 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold">
                      {rev.courseTitle}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    &ldquo;{rev.reviewText}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{rev.date}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Student
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Write Review Modal */}
      {isWriteOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Write a Course Review</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your review will help fellow students choose the right learning batch.
                </p>
              </div>
              <button
                onClick={() => setIsWriteOpen(false)}
                className="px-3 py-1 rounded-lg text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Course / Batch
                </label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:border-blue-500 outline-none"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {rating} Star{rating > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sāz Zād"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College / School
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Notre Dame College"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Detailed Review
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience regarding conceptual clarity, teacher support, exam practice..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-blue-500 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
