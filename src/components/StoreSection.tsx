import { useEffect, useState } from 'react';
import { BookOpen, Sparkles, ShoppingBag, Eye, Star, ArrowRight, X } from 'lucide-react';
import { ProductItem } from '../types';

export type ProductCategory = 'All' | 'E-Book' | 'Hardcopy Book' | 'Formula Sheet' | 'Lecture Note';
const PRODUCT_CATEGORIES: ProductCategory[] = ['All', 'Formula Sheet', 'E-Book', 'Lecture Note', 'Hardcopy Book'];

interface StoreSectionProps {
  products: ProductItem[];
  filterCategory?: ProductCategory;
  onSelectProduct: (product: ProductItem) => void;
  onBuyProduct: (product: ProductItem) => void;
}

export default function StoreSection({ products, filterCategory = 'All', onSelectProduct, onBuyProduct }: StoreSectionProps) {
  const initialCategory = PRODUCT_CATEGORIES.includes(filterCategory) ? filterCategory : 'All';
  const [activeTab, setActiveTab] = useState<string>(initialCategory);
  const [previewProduct, setPreviewProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    setActiveTab(PRODUCT_CATEGORIES.includes(filterCategory) ? filterCategory : 'All');
  }, [filterCategory]);

  const filteredProducts = products.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-50/80 py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Storefront Header */}
        <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] bg-[#071e22] px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-indigo-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                The study shelf
              </div>
              <h1 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Better notes for the moments that matter.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Practical formula sheets, visual notes, and focused workbooks made to make revision faster and concepts stick longer.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[350px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{products.length}</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">Resources</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">{products.reduce((total, product) => total + product.pages, 0)}+</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">Pages of help</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-xl font-black sm:text-2xl">4.9</p>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">Avg. rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="relative z-10 mb-8 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">Browse study materials</p>
                <p className="text-xs font-medium text-slate-500">{filteredProducts.length} resources available</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                  activeTab === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">Curated revision tools</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">Pick your next resource</h2>
          </div>
          <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 sm:inline-flex">
            {filteredProducts.length} results
          </span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <BookOpen className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <h3 className="text-base font-black text-slate-800">No resources in this category</h3>
            <p className="mt-1 text-xs text-slate-500">Try another shelf to find the right study material.</p>
            <button
              onClick={() => setActiveTab('All')}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700 cursor-pointer"
            >
              View all resources
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div>
                  {/* Book Cover Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <img
                      src={product.coverImage}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-slate-950/65 px-2.5 py-1 text-[10px] font-black text-white backdrop-blur-sm">
                      {product.category}
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                      {product.pages} Pages
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <p className="mb-1 text-xs font-bold text-blue-600">
                      By {product.author}
                    </p>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="mb-2 line-clamp-2 text-left text-sm font-black leading-snug text-slate-900 transition hover:text-blue-700 sm:text-base cursor-pointer"
                    >
                      {product.title}
                    </button>
                    <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-500">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                      <span className="font-semibold">{product.downloadCount.toLocaleString()} downloads</span>
                      <div className="flex items-center gap-0.5 font-bold text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-5 pt-0">
                  <div className="mb-3 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black tracking-tight text-blue-600">
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
                      className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => onBuyProduct(product)}
                      className="flex items-center justify-center gap-1 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700 cursor-pointer"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Get Now</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
        )}

      </div>

      {/* Preview Modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg animate-in zoom-in-95 rounded-3xl bg-white p-6 shadow-2xl duration-150">
            <div className="mb-4 flex items-start justify-between gap-4">
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
                className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative mb-4 overflow-hidden rounded-2xl bg-slate-100 p-6 text-center">
              <img src={previewProduct.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" />
              <div className="relative">
                <BookOpen className="mx-auto mb-2 h-12 w-12 text-blue-600" />
                <p className="text-xs font-semibold text-slate-700">Digital Watermarked Sample Preview</p>
              </div>
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
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 cursor-pointer"
              >
                Download / Purchase
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
