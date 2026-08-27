import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, BookOpen, Download, ShoppingBag, Star, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products, handleBuyProduct } = useApp();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Publication Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested book or digital notes item is unavailable.</p>
        <button
           onClick={() => navigate('/store')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bookstore</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen rm-page-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <button
          onClick={() => navigate('/store')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Publications</span>
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Cover Art Box */}
          <div className="space-y-4">
            <div className="relative aspect-4/3 bg-slate-900 rounded-2xl overflow-hidden shadow-md">
              <img
                src={product.coverImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold">
                {product.category}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Pages</span>
                <span className="font-bold text-slate-900">{product.pages}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Format</span>
                <span className="font-bold text-slate-900">PDF &amp; Print</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Downloads</span>
                <span className="font-bold text-slate-900">{product.downloadCount}+</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase Box */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                Author: {product.author}
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.9 / 5.0</span>
                </div>
                <span className="text-xs text-slate-400">• Verified Academic Material</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-xs text-slate-900">What&apos;s Included:</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Full Chapterwise Formulas &amp; Summary Charts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Top 200 Repeated Board &amp; Admission MCQ Hacks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>High-resolution printable PDF with watermarked notes</span>
                </li>
              </ul>
            </div>

            {/* Price & Buy Now */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">Special Offer Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    ৳{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      ৳{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleBuyProduct(product)}
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Instant Download</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
