import { Youtube, Facebook, Mail, Phone, MapPin, Award, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLinkClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    if (view === 'home') navigate('/');
    else if (view === 'courses') navigate('/courses');
    else if (view === 'instructors') navigate('/instructors');
    else if (view === 'exams') navigate('/exams');
    else if (view === 'result') navigate('/result');
    else if (view === 'store') navigate('/store');
    else if (view === 'learning-paths') navigate('/learning-paths');
    else if (view === 'reviews') navigate('/reviews');
    else navigate(`/${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-12 text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-slate-200 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white inline-block p-2 rounded-xl">
              <Logo />
            </div>
            <p className="pr-0 text-sm leading-relaxed text-slate-600 lg:pr-6">
              SHIKHOR (শিখর) is a premier online learning platform in Bangladesh providing high-yield, concept-first education delivered by top educators and university toppers. Since 2023, SHIKHOR has guided over 500,000 students across the country toward HSC success and dream university admissions in BUET, Medical, and DU.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-red-600 hover:text-white"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-blue-600 hover:text-white"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@shikhor.example"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-emerald-600 hover:text-white"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="flex items-center gap-2 text-base font-semibold tracking-wide text-slate-900">
              Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-blue-600"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                   {t('home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('courses')}
                  className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-blue-600"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                   {t('allCourses')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('instructors')}
                  className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-blue-600"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                   {t('instructors')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('exams')}
                  className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-blue-600"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                   {t('examsRoutine')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('result')}
                  className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-blue-600"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                   {t('boardResult')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('store')}
                  className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-blue-600"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  {t('storeNotes')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-semibold tracking-wide text-slate-900">
              Company Details
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="block text-slate-900">Company Name:</strong>
                  SHIKHOR Learning Ltd.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="block text-slate-900">Trade License No:</strong>
                  TRAD/2026/001
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="block text-slate-900">Office Address:</strong>
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-semibold tracking-wide text-slate-900">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+8801700000000" className="font-medium hover:text-blue-600">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href="mailto:hello@shikhor.example" className="break-all hover:text-blue-600">
                  hello@shikhor.example
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SSLCommerz / Payment Gateways Row */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-slate-600 sm:justify-start">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% Secure Payments with SSLCommerz Encryption</span>
          </div>
          <img
            src="/images/footer/payment-banner.png"
            alt="Available payment methods verified by SSLCommerz"
            className="block h-auto w-full rounded-xl"
          />
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 pt-4 text-xs text-slate-600 sm:flex-row">
          <p>© 2026 SHIKHOR (শিখর). All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#terms" className="hover:text-slate-900">Terms & Conditions</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-slate-900">Privacy Policy</a>
            <span>•</span>
            <a href="#refund" className="hover:text-slate-900">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
