import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Plus,
  ScanLine,
  Search,
  ShieldCheck,
  Sun,
  User,
  ShieldPlus,
  Clock3,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import Button from "../ui/Button";

export default function Navbar({ title, onMenuClick, theme, onThemeToggle, isLanding = false }) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const publicNavLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Interactive Demo", href: "#demo" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-charcoal-200/80 bg-cream-50/90 shadow-xs backdrop-blur-md dark:border-charcoal-800 dark:bg-charcoal-900/90"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {!isLanding && (
            <button
              onClick={onMenuClick}
              aria-label="Open navigation menu"
              className="rounded-xl p-2 text-charcoal-600 transition hover:bg-charcoal-100 hover:text-charcoal-900 dark:text-charcoal-300 dark:hover:bg-charcoal-800 lg:hidden"
            >
              <Menu size={22} />
            </button>
          )}

          {/* Logo with hover animation */}
          <Link to="/" className="group flex items-center gap-3">
            <motion.span
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-600 text-white shadow-md shadow-forest-600/25 dark:bg-emerald-500"
            >
              <ShieldCheck size={24} />
            </motion.span>
            <div className="flex flex-col">
              <span className="font-display text-lg font-extrabold tracking-tight text-charcoal-900 dark:text-white group-hover:text-forest-600 dark:group-hover:text-emerald-400 transition-colors">
                AllergyShield <span className="text-forest-600 dark:text-emerald-400 font-extrabold">AI</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400">
                Food Safety Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Center Links for Landing Page */}
        {isLanding && (
          <nav className="hidden md:flex items-center gap-1">
            {publicNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-charcoal-600 hover:text-forest-600 dark:text-charcoal-300 dark:hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Dashboard Title view for authenticated workspace header */}
        {!isLanding && title && (
          <div className="hidden md:block">
            <h1 className="text-xl font-extrabold text-charcoal-900 dark:text-white">{title}</h1>
          </div>
        )}

        {/* Right Section Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick theme toggle */}
          <button
            type="button"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={onThemeToggle}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-charcoal-600 transition hover:bg-charcoal-100 dark:text-charcoal-300 dark:hover:bg-charcoal-800"
          >
            <motion.div whileTap={{ rotate: 45, scale: 0.9 }}>
              {theme === "dark" ? <Sun size={20} className="text-warning-500" /> : <Moon size={20} />}
            </motion.div>
          </button>

          {isLanding ? (
            isAuthenticated ? (
              <Button as={Link} to="/dashboard" variant="primary" size="sm" icon={ShieldCheck}>
                Dashboard
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-charcoal-700 hover:bg-charcoal-100/60 dark:text-charcoal-200 dark:hover:bg-charcoal-800 transition-colors"
                >
                  Log in
                </Link>
                <Button as={Link} to="/register" variant="primary" size="sm">
                  Get Started Free
                </Button>
              </div>
            )
          ) : (
            <>
              <Button
                type="button"
                variant="primary"
                size="sm"
                icon={ScanLine}
                onClick={() => navigate("/scan")}
                className="hidden sm:inline-flex"
              >
                New Scan
              </Button>

              {/* Notification dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  aria-label="View notifications"
                  onClick={() => setNotificationsOpen((prev) => !prev)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl text-charcoal-600 transition hover:bg-charcoal-100 dark:text-charcoal-300 dark:hover:bg-charcoal-800"
                >
                  <Bell size={20} />
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-forest-600 ring-2 ring-cream-50 dark:ring-charcoal-900" />
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-charcoal-200 bg-cream-50 p-4 shadow-xl dark:border-charcoal-800 dark:bg-charcoal-900"
                    >
                      <div className="flex items-center justify-between border-b border-charcoal-200/60 pb-3 dark:border-charcoal-800">
                        <span className="font-display font-bold text-sm text-charcoal-900 dark:text-white">Notifications</span>
                        <span className="rounded-full bg-forest-50 px-2 py-0.5 text-xs font-bold text-forest-600 dark:bg-forest-600/20 dark:text-emerald-400">
                          1 New
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="rounded-xl bg-white p-3 shadow-2xs dark:bg-charcoal-950">
                          <p className="text-xs font-bold text-charcoal-900 dark:text-white">System Active</p>
                          <p className="mt-1 text-xs text-charcoal-500 dark:text-charcoal-400">
                            Allergy profile scan engine is synchronized and active.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="flex items-center gap-2.5 rounded-2xl border border-charcoal-200/80 bg-white/80 p-1.5 pr-3 transition hover:border-forest-600/40 dark:border-charcoal-800 dark:bg-charcoal-900"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-forest-600 text-xs font-bold text-white shadow-xs dark:bg-emerald-500">
                    {initials}
                  </div>
                  <span className="hidden max-w-32 truncate text-sm font-bold text-charcoal-800 dark:text-cream-100 sm:block">
                    {user?.name || "Account"}
                  </span>
                  <ChevronDown size={16} className="hidden text-charcoal-400 sm:block" />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.16 }}
                      className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-charcoal-200 bg-cream-50 shadow-xl dark:border-charcoal-800 dark:bg-charcoal-900"
                    >
                      <div className="border-b border-charcoal-200/60 p-4 dark:border-charcoal-800">
                        <p className="truncate font-display font-bold text-sm text-charcoal-900 dark:text-white">
                          {user?.name || "User"}
                        </p>
                        <p className="truncate text-xs font-medium text-charcoal-500 dark:text-charcoal-400">{user?.email}</p>
                      </div>

                      <div className="p-2 space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            navigate("/profile");
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-charcoal-700 transition hover:bg-cream-100 dark:text-charcoal-200 dark:hover:bg-charcoal-800"
                        >
                          <User size={17} className="text-forest-600 dark:text-emerald-400" />
                          My Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            navigate("/allergies");
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-charcoal-700 transition hover:bg-cream-100 dark:text-charcoal-200 dark:hover:bg-charcoal-800"
                        >
                          <ShieldPlus size={17} className="text-forest-600 dark:text-emerald-400" />
                          Allergy Watch List
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            navigate("/history");
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-charcoal-700 transition hover:bg-cream-100 dark:text-charcoal-200 dark:hover:bg-charcoal-800"
                        >
                          <Clock3 size={17} className="text-forest-600 dark:text-emerald-400" />
                          Scan Timeline
                        </button>
                      </div>

                      <div className="border-t border-charcoal-200/60 p-2 dark:border-charcoal-800">
                        <button
                          type="button"
                          onClick={logout}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-danger-600 transition hover:bg-danger-50 dark:hover:bg-danger-500/10"
                        >
                          <LogOut size={17} />
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
