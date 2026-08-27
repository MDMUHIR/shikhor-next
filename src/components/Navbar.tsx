import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  BookOpen,
  Award,
  Shield,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Logo from "./Logo";
import { UserProfile } from "../types";

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

/**
 * Design tokens for this navbar
 * ---------------------------------
 * ink       #0B1220  — primary text
 * navy      #001d5f  — brand / primary actions / active state
 * navy-50   #EEF1F7  — tinted surfaces on navy
 * gold      #C9A227  — achievement accent (results, exams, admin)
 * gold-50   #FBF6E7  — tinted gold surface
 * slate     #64748B  — secondary text
 * line      #E7EAF0  — hairline borders
 */

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

  const getActiveTab = () => {
    if (pathname.startsWith("/courses")) return "courses";
    if (pathname.startsWith("/learn")) return "learn";
    if (pathname.startsWith("/instructors")) return "instructors";
    if (pathname.startsWith("/exams")) return "exams";
    if (pathname.startsWith("/products") || pathname.startsWith("/store")) return "store";
    if (pathname.startsWith("/ebooks")) return "ebooks";
    if (pathname.startsWith("/result") || pathname.startsWith("/result-lookup"))
      return "result";
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/profile")) return "profile";
    return "home";
  };

  const activeCurrentView = currentView || activeTab || getActiveTab();
  const handleOpenAuth = onLoginClick || onOpenAuth || (() => {});
  const handleOpenProfile =
    onProfileClick || onOpenProfile || (() => navigate("/profile"));
  const handleOpenAdmin = onOpenAdmin || (() => navigate("/admin"));
  const handleLogout = onLogout || (() => {});

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "courses", label: "Courses", path: "/courses" },
    {
      id: "learn",
      label: "Learn",
      path: "/learn",
      badge: user?.enrolledCourseIds?.length
        ? `${user.enrolledCourseIds.length}`
        : undefined,
    },
    { id: "instructors", label: "Instructors", path: "/instructors" },
    { id: "exams", label: "Exams", path: "/exams" },
    { id: "store", label: "Store", path: "/store" },
    { id: "result", label: "Result", path: "/result" },
  ];

  const handleNavClick = (viewId: string, path?: string) => {
    if (onNavigate) onNavigate(viewId);
    if (path) {
      navigate(path);
    } else {
      const routes: Record<string, string> = {
        home: "/",
        courses: "/courses",
        learn: "/learn",
        instructors: "/instructors",
        exams: "/exams",
        store: "/store",
        ebooks: "/store?category=E-Book",
        result: "/result",
        admin: "/admin",
        profile: "/profile",
      };
      navigate(routes[viewId] || `/${viewId}`);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-shadow duration-300 border-b ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(20,33,61,0.06),0_8px_24px_-12px_rgba(20,33,61,0.15)] border-[#E7EAF0]"
          : "bg-white border-transparent"
      }`}
    >
      {/* Thin brand rule — the signature detail: navy field with a gold hairline beneath */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#001d5f] via-[#1E3358] to-[#001d5f]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick("home")}
            className="cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
            aria-label="Go to homepage"
          >
            <Logo />
          </button>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navItems.map((item) => {
            const isActive = activeCurrentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 text-[13.5px] tracking-[-0.01em] font-semibold rounded-full flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-1 ${
                  isActive
                    ? "text-white bg-[#001d5f]"
                    : "text-[#3B4256] hover:text-[#001d5f] hover:bg-[#F3F5F9]"
                }`}
              >
                {item.label}
                {item.badge && (
                  <span
                    className={`min-w-[18px] h-[18px] px-1 text-[10px] rounded-full flex items-center justify-center font-bold ${
                      isActive
                        ? "bg-[#C9A227] text-[#001d5f]"
                        : "bg-[#001d5f] text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {user?.role === "admin" && (
            <button
              onClick={handleOpenAdmin}
              className={`ml-1.5 pl-2.5 pr-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all border ${
                activeCurrentView === "admin"
                  ? "bg-[#C9A227] text-[#001d5f] border-[#C9A227]"
                  : "bg-[#FBF6E7] text-[#8A6D10] border-[#EEDFAF] hover:bg-[#F5EAC7]"
              }`}
            >
              <Shield className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Right: User / Auth action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                id="navbar-profile-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 bg-white hover:bg-[#F7F8FA] border border-[#E7EAF0] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#001d5f] text-white flex items-center justify-center text-[11px] font-bold ring-2 ring-white shadow-sm">
                    {initials(user.name)}
                  </div>
                )}
                <div className="flex flex-col items-start text-left leading-tight">
                  <span className="max-w-[110px] truncate text-[#001d5f] font-bold text-xs">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-[#8A93A6] font-semibold uppercase tracking-wide">
                    {user.role === "admin"
                      ? "Administrator"
                      : user.hscBatch || "Student"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#8A93A6] transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_12px_32px_-8px_rgba(20,33,61,0.25)] border border-[#E7EAF0] py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-3 bg-[#F7F8FA] border-b border-[#E7EAF0]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6]">
                        Signed in as
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          user.role === "admin"
                            ? "bg-[#C9A227] text-[#001d5f]"
                            : "bg-[#001d5f] text-white"
                        }`}
                      >
                        {user.role === "admin"
                          ? "Super Admin"
                          : "Active Student"}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#001d5f] truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#8A93A6] truncate">
                      {user.email || user.phone}
                    </p>
                  </div>

                  <div className="py-1.5">
                    <button
                      onClick={() => {
                        handleOpenProfile();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-[#3B4256] hover:bg-[#F7F8FA] flex items-center gap-3 transition-colors"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[#EEF1F7] flex items-center justify-center">
                        <User className="w-4 h-4 text-[#001d5f]" />
                      </span>
                      <span>My Profile &amp; Academic Details</span>
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick("learn");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-[#3B4256] hover:bg-[#F7F8FA] flex items-center gap-3 transition-colors"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[#EEF1F7] flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-[#001d5f]" />
                      </span>
                      <span>
                        Enrolled Courses ({user.enrolledCourseIds?.length || 0})
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick("exams");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-[#3B4256] hover:bg-[#F7F8FA] flex items-center gap-3 transition-colors"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[#FBF6E7] flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#8A6D10]" />
                      </span>
                      <span>Exam Results &amp; Analytics</span>
                    </button>

                    {user.role === "admin" && (
                      <button
                        onClick={() => {
                          handleOpenAdmin();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-[#8A6D10] hover:bg-[#FBF6E7] flex items-center gap-3 transition-colors"
                      >
                        <span className="w-7 h-7 rounded-lg bg-[#FBF6E7] flex items-center justify-center">
                          <Shield className="w-4 h-4 text-[#8A6D10]" />
                        </span>
                        <span>Admin CRUD Panel</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-[#E7EAF0] mt-1 pt-1.5 px-1.5">
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-semibold text-[#B42318] hover:bg-[#FEF3F2] flex items-center gap-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleOpenAuth}
              className="px-6 py-2.5 rounded-full text-[13.5px] font-bold text-white bg-[#001d5f] hover:bg-[#1E3358] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
            >
              Login / Sign in
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          {user ? (
            <button
              onClick={handleOpenProfile}
              className="p-0.5 rounded-full ring-2 ring-[#EEF1F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#001d5f] text-white flex items-center justify-center text-[11px] font-bold">
                  {initials(user.name)}
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={handleOpenAuth}
              className="px-4 py-1.5 text-xs font-bold rounded-full bg-[#001d5f] text-white"
            >
              Login
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#001d5f] hover:bg-[#F3F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7EAF0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-[#E7EAF0]">
            {navItems.map((item) => {
              const isActive = activeCurrentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-[#001d5f] text-white"
                      : "text-[#3B4256] bg-[#F7F8FA] hover:bg-[#F0F2F6]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                        isActive
                          ? "bg-[#C9A227] text-[#001d5f]"
                          : "bg-[#001d5f] text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {user ? (
            <div className="p-3.5 bg-[#F7F8FA] rounded-2xl border border-[#E7EAF0] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#001d5f] text-white flex items-center justify-center font-bold text-sm ring-2 ring-white shadow-sm">
                  {initials(user.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#001d5f] truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-[#8A93A6] truncate">
                    {user.email || user.phone}
                  </p>
                </div>
              </div>

              <div
                className={`grid gap-2 pt-1 ${user.role === "admin" ? "grid-cols-2" : "grid-cols-1"}`}
              >
                <button
                  onClick={() => {
                    handleOpenProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white border border-[#E7EAF0] text-xs font-bold text-[#001d5f] text-center"
                >
                  My Profile
                </button>
                {user.role === "admin" && (
                  <button
                    onClick={() => {
                      handleOpenAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#FBF6E7] text-[#8A6D10] text-xs font-bold text-center"
                  >
                    Admin Panel
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-xs text-[#B42318] font-bold py-2 bg-[#FEF3F2] rounded-lg text-center"
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
              className="w-full py-3 rounded-xl bg-[#001d5f] text-white font-bold text-center shadow-sm"
            >
              Sign In with Google / Phone
            </button>
          )}
        </div>
      )}
    </header>
  );
}
