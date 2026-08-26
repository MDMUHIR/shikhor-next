import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, User, BookOpen, GraduationCap, Award, FileText, CheckCircle2, ChevronRight, LogOut, Shield, CreditCard, Settings } from 'lucide-react';
import Logo from './Logo';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView?: string;
  activeTab?: string;
  onNavigate?: (view: string) => void;
  user?: UserProfile | null;
  onOpenAuth?: () => void;
  onOpenProfile?: () => void;
  onOpenAdmin?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export default function Navbar({
  currentView,
  activeTab,
  onNavigate,
  user,
  onOpenAuth,
  onOpenProfile,
  onOpenAdmin,
  onLoginClick,
  onProfileClick,
  onLogout,
}: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Determine active item from URL path
  const getActiveTab = () => {
    if (pathname.startsWith('/courses')) return 'courses';
    if (pathname.startsWith('/learn')) return 'learn';
    if (pathname.startsWith('/instructors')) return 'instructors';
    if (pathname.startsWith('/exams')) return 'exams';
    if (pathname.startsWith('/products')) return 'products';
    if (pathname.startsWith('/ebooks')) return 'ebooks';
    if (pathname.startsWith('/result') || pathname.startsWith('/result-lookup')) return 'result';
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/profile')) return 'profile';
    return 'home';
  };

  const activeCurrentView = currentView || activeTab || getActiveTab();
  const handleOpenAuth = onLoginClick || onOpenAuth || (() => {});
  const handleOpenProfile = onProfileClick || onOpenProfile || (() => navigate('/profile'));
  const handleOpenAdmin = onOpenAdmin || (() => navigate('/admin'));
  const handleLogout = onLogout || (() => {});
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'courses', label: 'Courses', path: '/courses' },
    { id: 'learn', label: 'Learn', path: '/learn', badge: user?.enrolledCourseIds?.length ? `${user.enrolledCourseIds.length}` : undefined },
    { id: 'instructors', label: 'Instructors', path: '/instructors' },
    { id: 'exams', label: 'Exams', path: '/exams' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'ebooks', label: 'E-Books', path: '/products?category=E-Book' },
    { id: 'result', label: 'Result', path: '/result' },
  ];

  const handleNavClick = (viewId: string, path?: string) => {
    if (onNavigate) {
      onNavigate(viewId);
    }
    if (path) {
      navigate(path);
    } else {
      if (viewId === 'home') navigate('/');
      else if (viewId === 'courses') navigate('/courses');
      else if (viewId === 'learn') navigate('/learn');
      else if (viewId === 'instructors') navigate('/instructors');
      else if (viewId === 'exams') navigate('/exams');
      else if (viewId === 'products') navigate('/products');
      else if (viewId === 'ebooks') navigate('/products?category=E-Book');
      else if (viewId === 'result') navigate('/result');
      else if (viewId === 'admin') navigate('/admin');
      else if (viewId === 'profile') navigate('/profile');
      else navigate(`/${viewId}`);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-xs border-b border-slate-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div onClick={() => handleNavClick('home')} className="cursor-pointer">
          <Logo />
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
          {navItems.map((item) => {
            const isActive = activeCurrentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5 ${
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="w-4 h-4 text-[10px] bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}

          {/* Dedicated Admin Panel Link if admin */}
          {user?.role === 'admin' && (
            <button
              onClick={handleOpenAdmin}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-all ${
                activeCurrentView === 'admin'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          )}
        </nav>

        {/* Right: User / Auth action */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                id="navbar-profile-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-100/60 rounded-full transition-all text-slate-800 text-sm font-medium"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500/20"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-1 ring-blue-500/20">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col items-start text-left">
                  <span className="max-w-[110px] truncate text-slate-900 font-bold text-xs leading-none">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {user.role === 'admin' ? 'Admin' : (user.hscBatch || 'Student')}
                  </span>
                </div>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Account</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {user.role === 'admin' ? 'Super Admin' : 'Active Student'}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 truncate mt-1">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email || user.phone}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleOpenProfile();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors"
                    >
                      <User className="w-4 h-4 text-blue-600" />
                      <span>My Profile &amp; Academic Details</span>
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('learn');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>Enrolled Courses ({user.enrolledCourseIds?.length || 0})</span>
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('exams');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors"
                    >
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>Exam Results &amp; Analytics</span>
                    </button>

                    {/* Admin Panel Option */}
                    <button
                      onClick={() => {
                        handleOpenAdmin();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-purple-700 hover:bg-purple-50 flex items-center gap-2.5 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-purple-600" />
                      <span>Admin CRUD Panel</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleOpenAuth}
              className="px-6 py-2 rounded-full text-sm font-semibold bg-indigo-50 text-blue-700 hover:bg-indigo-100 transition-all border border-indigo-100/60 shadow-2xs"
            >
              Login / Sign in
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          {user ? (
            <button
              onClick={handleOpenProfile}
              className="p-1 rounded-full border border-indigo-200"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={handleOpenAuth}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-indigo-50 text-blue-700 border border-indigo-100"
            >
              Login
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="py-2 grid grid-cols-2 gap-1.5 border-b border-slate-100 mb-2">
            {navItems.map((item) => {
              const isActive = activeCurrentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2.5 rounded-lg text-left text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-blue-600 text-white rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-1 flex flex-col gap-2">
            {user ? (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email || user.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      handleOpenProfile();
                      setMobileMenuOpen(false);
                    }}
                    className="py-2 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 text-center"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      handleOpenAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="py-2 px-3 rounded-xl bg-purple-100 text-purple-800 text-xs font-bold text-center"
                  >
                    Admin Panel
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-xs text-red-600 font-medium py-1.5 bg-red-50 rounded-lg text-center"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-center shadow-xs"
              >
                Sign In with Google / Phone
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
