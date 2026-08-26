import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, CheckCircle2, ChevronLeft, ChevronRight, Quote, 
  Plus, MessageSquare, Send, X, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StudentReviews() {
  const navigate = useNavigate();
  const { reviews, handleAddReview, user, setIsAuthOpen } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Review submission modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState(user?.name || '');
  const [college, setCollege] = useState(user?.college || '');
  const [reviewText, setReviewText] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  // Filter visible reviews (featured or approved)
  const visibleReviews = reviews.filter((r) => r.status !== 'rejected');

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    handleAddReview({
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
    setIsModalOpen(false);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Student Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
              What Our Students Say
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
              Real feedback from students who transformed their HSC &amp; Admission journey with Redwan&apos;s Method
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Average Rating Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-amber-300 font-bold ml-1">5.0</span>
              <span className="text-slate-400">({visibleReviews.length} reviews)</span>
            </div>

            {/* Write Review Button */}
            <button
              onClick={() => {
                if (!user) {
                  setIsAuthOpen(true);
                } else {
                  setIsModalOpen(true);
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Give a Review</span>
            </button>

            {/* View All Reviews Button */}
            <button
              onClick={() => navigate('/reviews')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {submittedToast && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Thank you for sharing your experience! Your review is now live.</span>
          </div>
        )}

        {/* Carousel Controls */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={scrollLeft}
            className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reviews Cards Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="w-[300px] sm:w-[360px] shrink-0 snap-start bg-slate-900/90 border border-slate-800/80 hover:border-blue-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div>
                {/* Stars and Quote */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700 opacity-60" />
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4 font-normal">
                  {review.reviewText}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/60">
                <img
                  src={review.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-blue-400/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      {review.role}
                    </span>
                    <span className="text-slate-500 text-[10px]">•</span>
                    <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                      {review.college}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Giving Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Write a Student Review</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Share your genuine learning experience with future students.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Your Overall Rating
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
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-2">
                    {rating} Star{rating > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sāz Zād"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    College / School
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Notre Dame College"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Your Feedback &amp; Review
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="How did Redwan's Method classes, notes, and exam papers help your preparation? Write your review in detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
