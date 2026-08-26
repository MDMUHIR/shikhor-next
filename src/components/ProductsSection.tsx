import { useState } from 'react';
import { BookOpen, Download, FileText, Sparkles, Check, ShoppingBag, Eye, Star } from 'lucide-react';
import { PRODUCTS } from '../data/coursesData';
import { ProductItem } from '../types';

interface ProductsSectionProps {
  filterCategory?: 'All' | 'E-Book' | 'Hardcopy Book' | 'Formula Sheet';
  onBuyProduct: (product: ProductItem) => void;
}

export default function ProductsSection({ filterCategory = 'All', onBuyProduct }: ProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(filterCategory);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [previewProduct, setPreviewProduct] = useState<ProductItem | null>(null);

  const categories = ['All', 'Formula Sheet', 'E-Book', 'Lecture Note', 'Hardcopy Book'];

  const filteredProducts = PRODUCTS.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const handleDownload = (id: string) => {
    setDownloadedIds((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen py-12 sm:py-16 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Digital &amp; Printed Publications
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3">
            Study Materials, E-Books &amp; Formula Sheets
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Essential formula sheets, chapterwise question banks, and handwritten lecture notes prepared exclusively by Redwan&apos;s Method instructors.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isDownloaded = downloadedIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:border-blue-200"
              >
                <div>
                  {/* Book Cover Image */}
                  <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
                    <img
                      src={product.coverImage}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                      {product.category}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px]">
                      {product.pages} Pages
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <p className="text-xs text-blue-600 font-semibold mb-1">
                      By {product.author}
                    </p>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 mb-2 leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span>{product.downloadCount.toLocaleString()} downloads</span>
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-5 pt-0">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-blue-600">
                        ৳{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ৳{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewProduct(product)}
                      className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => onBuyProduct(product)}
                      className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Get Now</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Preview Modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {previewProduct.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {previewProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewProduct(null)}
                className="p-1 text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6 mb-4 text-center">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">Digital Watermarked Sample Preview</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Author: {previewProduct.author} • {previewProduct.pages} Pages Total
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              {previewProduct.description}
            </p>

            <div className="flex items-center justify-between gap-3">
              <span className="text-xl font-black text-blue-600">৳{previewProduct.price}</span>
              <button
                onClick={() => {
                  const p = previewProduct;
                  setPreviewProduct(null);
                  onBuyProduct(p);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Download / Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
