import { useState } from 'react';
import type React from 'react';
import { X, Smartphone, ArrowRight, ShieldCheck, User, Mail, Sparkles, CheckCircle2, Shield, Lock } from 'lucide-react';
import { UserProfile } from '../types';
import Logo from './Logo';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'main' | 'google_select' | 'phone' | 'otp' | 'profile'>('main');
  const [phone, setPhone] = useState('01712345678');
  const [otp, setOtp] = useState('5492');
  const [name, setName] = useState('Saadman Shakib');
  const [email, setEmail] = useState('saadman@gmail.com');
  const [institution, setInstitution] = useState('Notre Dame College');
  const [hscBatch, setHscBatch] = useState('HSC 2026');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [isAuthenticatingGoogle, setIsAuthenticatingGoogle] = useState(false);

  // Google Accounts preset list for rapid authentic sign-in simulation
  const googleAccounts = [
    {
      name: 'Saadman Shakib',
      email: 'saadman.shakib@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'student' as const,
      institution: 'Notre Dame College',
      hscBatch: 'HSC 2026',
    },
    {
      name: 'Dr. Rafid Ahmed (Admin)',
      email: 'admin@shikhor.edu.bd',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'admin' as const,
      institution: 'SHIKHOR Academic Directorate',
      hscBatch: 'Lead Academician',
    },
    {
      name: 'Nuzhat Tabassum',
      email: 'nuzhat.tabassum@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'student' as const,
      institution: 'Viqarunnisa Noon College',
      hscBatch: 'HSC 2027',
    },
  ];

  const handleGoogleAccountSelect = (acc: typeof googleAccounts[0]) => {
    setIsAuthenticatingGoogle(true);
    setTimeout(() => {
      setIsAuthenticatingGoogle(false);
      const loggedUser: UserProfile = {
        id: 'usr_g_' + Date.now(),
        name: acc.name,
        email: acc.email,
        phone: '017' + Math.floor(10000000 + Math.random() * 90000000),
        institution: acc.institution,
        hscBatch: acc.hscBatch,
        avatar: acc.avatar,
        role: acc.role,
        enrolledCourseIds: acc.role === 'admin' 
          ? ['pcmb-1st-paper-combo-hsc28', 'hsc-28-ebi-combo', 'buet-medical-admission-mastery', 'ssc-27-foundation-batch'] 
          : ['pcmb-1st-paper-combo-hsc28', 'hsc-28-ebi-combo'],
        joinedDate: 'Jan 2025',
        bio: acc.role === 'admin' ? 'Platform Administrator & Course Coordinator' : 'Aspiring BUETian | Science & Math Enthusiast',
        paymentHistory: [
          {
            id: 'PAY-8921',
            itemName: 'HSC 28 PCMB 1st Paper Combo',
            itemType: 'course',
            itemId: 'pcmb-1st-paper-combo-hsc28',
            amount: 9990,
            paymentMethod: 'bKash',
            trxId: '9KJH716A2M',
            date: '12 Jan 2025',
            status: 'Completed',
          },
          {
            id: 'PAY-9042',
            itemName: 'Physics 1st Paper Smart Formula Book',
            itemType: 'product',
            itemId: 'prod-physics-formula-sheet',
            amount: 199,
            paymentMethod: 'Nagad',
            trxId: '8BNV391Q4L',
            date: '28 Jan 2025',
            status: 'Completed',
          }
        ],
        examHistory: [
          {
            examId: 'hsc26-frpp-phy-1st-chap2',
            examTitle: 'HSC 26 Physics 1st Paper - Vector Mega MCQ Test',
            date: '20 Feb 2025',
            score: 28,
            totalMarks: 30,
            timeSpent: '18m 45s',
            accuracy: 93.3,
            rank: 14,
          },
          {
            examId: 'buet-eng-math-calculus-live',
            examTitle: 'BUET Engineering Math - Differential Calculus Live Exam',
            date: '14 Feb 2025',
            score: 42,
            totalMarks: 50,
            timeSpent: '41m 10s',
            accuracy: 84.0,
            rank: 8,
          }
        ]
      };
      onLoginSuccess(loggedUser);
    }, 600);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail) return;
    setIsAuthenticatingGoogle(true);
    setTimeout(() => {
      setIsAuthenticatingGoogle(false);
      const isAd = customGoogleEmail.toLowerCase().includes('admin');
      const newUser: UserProfile = {
        id: 'usr_g_' + Date.now(),
        name: customGoogleEmail.split('@')[0].replace('.', ' '),
        email: customGoogleEmail,
        phone: '018' + Math.floor(10000000 + Math.random() * 90000000),
        institution: 'Dhaka College',
        hscBatch: 'HSC 2026',
        role: isAd ? 'admin' : 'student',
        enrolledCourseIds: ['pcmb-1st-paper-combo-hsc28'],
        joinedDate: 'Today',
      };
      onLoginSuccess(newUser);
    }, 500);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 11) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      setStep('profile');
    }
  };

  const handleCompleteProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name || 'Student',
      phone: phone,
      email: email || 'student@redwansmethod.com',
      institution: institution || 'Dhaka College',
      hscBatch: hscBatch || 'HSC 2026',
      role: 'student',
      enrolledCourseIds: ['hsc-28-ebi-combo'],
      joinedDate: 'Today',
    };
    onLoginSuccess(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 text-center">
          <div className="flex justify-center mb-3">
            <Logo />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {step === 'main' && 'Sign in to SHIKHOR'}
            {step === 'google_select' && 'Sign in with Google'}
            {step === 'phone' && 'Mobile Number Sign in'}
            {step === 'otp' && 'Verify Mobile Number'}
            {step === 'profile' && 'Complete Student Profile'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {step === 'main' && 'Access all online courses, live exams & learning portal'}
            {step === 'google_select' && 'Choose a Google account to continue to SHIKHOR'}
            {step === 'phone' && 'Enter your mobile number to get an SMS OTP'}
            {step === 'otp' && `Enter the 4-digit code sent to +88 ${phone}`}
            {step === 'profile' && 'Tell us your academic details for customized dashboard'}
          </p>
        </div>

        {/* STEP: MAIN (Google Sign-In + Phone Option + Quick Admin Demo) */}
        {step === 'main' && (
          <div className="p-6 sm:p-8 pt-2 space-y-4">
            
            {/* Primary Google Sign-in Button */}
            <button
              id="google-signin-btn"
              onClick={() => setStep('google_select')}
              className="w-full py-3 px-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-slate-50/80 text-slate-800 font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 group"
            >
              {/* Google G Multi-color Logo */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.36 7.37 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.27 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-400 font-medium">or continue with mobile</span>
              </div>
            </div>

            {/* Mobile OTP Button */}
            <button
              onClick={() => setStep('phone')}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-slate-500" />
              <span>Use Mobile Phone &amp; SMS OTP</span>
            </button>

            {/* Quick Demo Logins Section */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                Instant Access Testing
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* 1. Student Demo Login */}
                <button
                  onClick={() => handleGoogleAccountSelect(googleAccounts[0])}
                  className="p-2.5 rounded-xl border border-blue-100 bg-blue-50/70 hover:bg-blue-100/80 text-blue-900 text-xs font-bold transition-all text-left flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                    S
                  </div>
                  <div className="truncate">
                    <div className="font-bold truncate">Student Account</div>
                    <div className="text-[10px] text-blue-600 font-normal">Saadman Shakib</div>
                  </div>
                </button>

                {/* 2. Admin Panel Demo Login */}
                <button
                  id="admin-demo-login-btn"
                  onClick={() => handleGoogleAccountSelect(googleAccounts[1])}
                  className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/80 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-all text-left flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="font-bold truncate text-purple-900">Admin Account</div>
                    <div className="text-[10px] text-purple-600 font-normal">Full CRUD Access</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-400 pt-1">
              By continuing, you agree to SHIKHOR's Terms &amp; Privacy Policy.
            </div>

          </div>
        )}

        {/* STEP: GOOGLE ACCOUNT SELECTION POPUP */}
        {step === 'google_select' && (
          <div className="p-6 sm:p-8 pt-0 space-y-3">
            {isAuthenticatingGoogle ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-bold text-slate-800">Signing in with Google...</p>
                <p className="text-xs text-slate-400">Verifying credentials and syncing profile</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {googleAccounts.map((acc, index) => (
                    <button
                      key={index}
                      onClick={() => handleGoogleAccountSelect(acc)}
                      className="w-full p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-left transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={acc.avatar}
                          alt={acc.name}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1.5">
                            <span className="truncate">{acc.name}</span>
                            {acc.role === 'admin' && (
                              <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-[10px] font-bold">
                                Admin
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">{acc.email}</div>
                          <div className="text-[10px] text-slate-400 truncate">{acc.institution}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </button>
                  ))}
                </div>

                {/* Custom Google Email input */}
                <form onSubmit={handleCustomGoogleSubmit} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Use another google email..."
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!customGoogleEmail}
                      className="px-3 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                </form>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setStep('main')}
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                  >
                    ← Back to all sign in options
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP: PHONE NUMBER INPUT */}
        {step === 'phone' && (
          <div className="p-6 sm:p-8 pt-0 space-y-4">
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number (BD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 border-r border-slate-200 pr-2.5">
                    +88
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full pl-16 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-medium text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Send OTP Verification Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setStep('main')}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                ← Back to main options
              </button>
            </div>
          </div>
        )}

        {/* STEP: OTP VERIFICATION */}
        {step === 'otp' && (
          <div className="p-6 sm:p-8 pt-0 space-y-4">
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  4-Digit OTP Code
                </label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="5492"
                  className="w-full text-center tracking-[1em] text-2xl py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-black text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
              >
                Verify &amp; Continue
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setStep('phone')}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Change Phone Number
              </button>
            </div>
          </div>
        )}

        {/* STEP: COMPLETE PROFILE */}
        {step === 'profile' && (
          <div className="p-6 sm:p-8 pt-0 space-y-4">
            <form onSubmit={handleCompleteProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  College / School
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Notre Dame College, Dhaka"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Batch
                </label>
                <select
                  value={hscBatch}
                  onChange={(e) => setHscBatch(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="HSC 2026">HSC 2026</option>
                  <option value="HSC 2027">HSC 2027</option>
                  <option value="HSC 2028">HSC 2028</option>
                  <option value="SSC 2026">SSC 2026</option>
                  <option value="SSC 2027">SSC 2027</option>
                  <option value="Admission">University Admission</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all mt-2"
              >
                Complete Registration
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
