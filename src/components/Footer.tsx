import { Youtube, Facebook, Mail, Phone, MapPin, Award, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const navigate = useNavigate();

  const handleLinkClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    if (view === 'home') navigate('/');
    else if (view === 'courses') navigate('/courses');
    else if (view === 'instructors') navigate('/instructors');
    else if (view === 'exams') navigate('/exams');
    else if (view === 'result') navigate('/result');
    else if (view === 'products') navigate('/products');
    else if (view === 'learning-paths') navigate('/learning-paths');
    else if (view === 'reviews') navigate('/reviews');
    else navigate(`/${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const paymentMethods = [
    { name: 'Visa', color: 'text-blue-700 bg-blue-50' },
    { name: 'Mastercard', color: 'text-orange-600 bg-orange-50' },
    { name: 'AMEX', color: 'text-sky-700 bg-sky-50' },
    { name: 'bKash', color: 'text-pink-600 bg-pink-50' },
    { name: 'Nagad', color: 'text-orange-700 bg-orange-50' },
    { name: 'Rocket', color: 'text-purple-700 bg-purple-50' },
    { name: 'Upay', color: 'text-amber-700 bg-amber-50' },
    { name: 'Cellfin', color: 'text-emerald-700 bg-emerald-50' },
    { name: 'Islami Bank', color: 'text-teal-700 bg-teal-50' },
    { name: 'City Bank', color: 'text-red-700 bg-red-50' },
    { name: 'BRAC Bank', color: 'text-blue-800 bg-blue-50' },
    { name: 'EBL', color: 'text-indigo-700 bg-indigo-50' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white inline-block p-2 rounded-xl">
              <Logo />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-0 lg:pr-6">
              SHIKHOR (শিখর) is a premier online learning platform in Bangladesh providing high-yield, concept-first education delivered by top educators and university toppers. Since 2023, SHIKHOR has guided over 500,000 students across the country toward HSC success and dream university admissions in BUET, Medical, and DU.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@shikhor.edu.bd"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-semibold text-base tracking-wide flex items-center gap-2">
              Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('courses')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  All Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('instructors')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  Instructors
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('exams')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  Exams Routine
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('result')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  Board Result
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('products')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  E-Books &amp; Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-semibold text-base tracking-wide">
              Company Details
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200 block">Trade License No:</strong>
                  TRAD/DNCC/044200/2024
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200 block">Office Address:</strong>
                  House 1085, Road 6/A, Avenue 8, Mirpur DOHS, Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-semibold text-base tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:09617331133" className="hover:text-white font-medium">
                  09617331133
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href="mailto:support@shikhor.edu.bd" className="hover:text-white break-all">
                  support@shikhor.edu.bd
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SSLCommerz / Payment Gateways Row */}
        <div className="mt-8 pt-6 pb-6 bg-slate-950/60 rounded-2xl border border-slate-800 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Secure Payments with SSLCommerz Encryption</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {paymentMethods.map((m, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-700/60 ${m.color}`}
                >
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 SHIKHOR (শিখর). All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#terms" className="hover:text-slate-300">Terms & Conditions</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#refund" className="hover:text-slate-300">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
