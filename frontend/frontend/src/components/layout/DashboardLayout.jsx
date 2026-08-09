import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "../../hooks/useTheme";
import { pageTransition } from "../../animations/page";

const TITLES = {
  "/dashboard": "Dashboard Overview",
  "/scan": "Scan Food Label",
  "/allergies": "My Allergy Watch List",
  "/history": "Scan History Timeline",
  "/profile": "Safety & Account Profile",
  "/settings": "Safety & Account Profile",
};

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const title = TITLES[location.pathname] || "AllergyShield AI";

  return (
    <div className="page-shell flex h-screen overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          title={title}
          theme={theme}
          onThemeToggle={toggleTheme}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <motion.div key={location.pathname} {...pageTransition} className="mx-auto max-w-7xl">
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
