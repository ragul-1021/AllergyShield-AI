import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Home,
  ScanLine,
  ShieldCheck,
  ShieldPlus,
  User,
  X,
  Sparkles,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/scan", label: "Scan Label", icon: ScanLine },
  { to: "/allergies", label: "My Allergies", icon: ShieldPlus },
  { to: "/history", label: "Scan History", icon: Clock3 },
  { to: "/profile", label: "Safety Profile", icon: User },
];

function SidebarContent({ onNavigate, collapsed, onToggle }) {
  return (
    <div className="flex h-full flex-col justify-between py-6">
      <div>
        {/* Sidebar Brand Header */}
        <div className="px-5 mb-8">
          <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest-600 text-white shadow-md shadow-forest-600/20 dark:bg-emerald-500"
              >
                <ShieldCheck size={24} />
              </motion.div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="font-display text-lg font-extrabold tracking-tight text-charcoal-900 dark:text-white">
                    AllergyShield
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-forest-600 dark:text-emerald-400">
                    Healthcare AI
                  </span>
                </div>
              )}
            </div>

            {!collapsed && onToggle && (
              <button
                type="button"
                onClick={onToggle}
                aria-label="Collapse sidebar"
                className="rounded-xl p-1.5 text-charcoal-400 hover:bg-charcoal-100 hover:text-charcoal-800 dark:hover:bg-charcoal-800 dark:hover:text-white transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            )}
          </div>

          {collapsed && onToggle && (
            <button
              type="button"
              onClick={onToggle}
              aria-label="Expand sidebar"
              className="mx-auto mt-4 flex rounded-xl p-1.5 text-charcoal-400 hover:bg-charcoal-100 hover:text-charcoal-800 dark:hover:bg-charcoal-800 dark:hover:text-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5 px-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onNavigate}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `group relative flex items-center gap-3.5 rounded-2xl px-3.5 py-3 text-sm font-bold transition-all duration-200 ${
                  collapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-white text-forest-600 shadow-sm ring-1 ring-charcoal-200/80 dark:bg-charcoal-900 dark:text-emerald-400 dark:ring-charcoal-800"
                    : "text-charcoal-600 hover:bg-cream-100/80 hover:text-charcoal-900 dark:text-charcoal-400 dark:hover:bg-charcoal-800/60 dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebarActivePill"
                      className="absolute inset-y-2 left-1 w-1.5 rounded-full bg-forest-600 dark:bg-emerald-500"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={20}
                    className={`shrink-0 transition-colors ${
                      isActive ? "text-forest-600 dark:text-emerald-400" : "text-charcoal-500 group-hover:text-charcoal-800 dark:text-charcoal-400 dark:group-hover:text-cream-100"
                    }`}
                  />
                  {!collapsed && <span className="truncate">{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Promo Card */}
      {!collapsed && (
        <div className="px-4">
          <div className="rounded-2xl border border-forest-500/20 bg-forest-50/60 p-4 shadow-xs dark:border-emerald-500/20 dark:bg-forest-600/10">
            <div className="flex items-center gap-2 text-forest-700 dark:text-emerald-400">
              <Sparkles size={16} />
              <span className="text-xs font-extrabold uppercase tracking-wider">Nature & Health</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
              Always verify food packaging ingredients for critical allergies.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden shrink-0 border-r border-charcoal-200/80 bg-cream-50/95 backdrop-blur-md transition-all duration-300 dark:border-charcoal-800 dark:bg-charcoal-900/95 lg:block ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggle={() => setCollapsed((value) => !value)}
        />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-charcoal-950/60 backdrop-blur-xs lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-50 w-76 bg-cream-50 shadow-2xl dark:bg-charcoal-900 lg:hidden"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="absolute right-4 top-5 rounded-xl p-2 text-charcoal-400 hover:bg-charcoal-100 hover:text-charcoal-800 dark:hover:bg-charcoal-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
              <SidebarContent onNavigate={onClose} collapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
