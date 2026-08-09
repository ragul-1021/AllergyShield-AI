import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Moon, ShieldCheck, Sun, User, Bell, Lock, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../hooks/useTheme";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { pageTransition } from "../animations/page";

export default function Profile() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [scanAlerts, setScanAlerts] = useState(true);
  const [savedMessage, setSavedMessage] = useState("");

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedMessage("Profile settings updated locally.");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl space-y-8">
      <div>
        <Badge tone="primary">
          <User size={13} />
          Account & Safety Settings
        </Badge>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-charcoal-900 dark:text-white sm:text-4xl">
          Profile & Preferences
        </h1>
        <p className="mt-1 text-sm text-charcoal-600 dark:text-charcoal-400">
          Manage your account profile, theme preferences, and notification controls.
        </p>
      </div>

      {savedMessage && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-success-50 p-4 text-xs font-bold text-success-700 border border-success-500/20 dark:bg-success-500/10 dark:text-emerald-400">
          <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Header Profile Card */}
      <Card className="overflow-hidden p-0">
        <div className="bg-forest-600 px-8 py-8 text-white dark:bg-forest-800 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-2xl" />
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-extrabold text-white shadow-md ring-2 ring-white/30 backdrop-blur-xs">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
                <ShieldCheck size={16} />
                JWT Authenticated Account
              </div>
              <h2 className="mt-1 font-display text-2xl font-extrabold">{user?.name || "User Account"}</h2>
              <p className="mt-1 text-xs text-cream-100/90">{user?.email || "No email"}</p>
            </div>
          </div>
        </div>

        {/* Profile Information Form */}
        <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
          <div className="border-b border-charcoal-200/60 pb-4 dark:border-charcoal-800">
            <h3 className="font-display font-bold text-base text-charcoal-900 dark:text-white">
              Personal Account Information
            </h3>
            <p className="mt-1 text-xs text-charcoal-500 dark:text-charcoal-400">
              Details returned by `/auth/profile`.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
            />
            <Input
              label="Email Address"
              icon={Mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
            />
          </div>

          {/* Theme Settings */}
          <div className="border-t border-charcoal-200/60 pt-6 dark:border-charcoal-800">
            <h3 className="font-display font-bold text-base text-charcoal-900 dark:text-white mb-3">
              Appearance & Theme Settings
            </h3>

            <div className="flex items-center justify-between rounded-2xl bg-cream-100/70 p-4 dark:bg-charcoal-950 border border-charcoal-200/60 dark:border-charcoal-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-50 text-forest-600 dark:bg-forest-600/20 dark:text-emerald-400">
                  {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal-900 dark:text-white">
                    {theme === "dark" ? "Dark Mode Active" : "Light Mode Active"}
                  </p>
                  <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">
                    Switch between Warm Cream Light mode & Deep Charcoal Dark mode.
                  </p>
                </div>
              </div>

              <Button type="button" variant="secondary" size="sm" onClick={toggleTheme}>
                Toggle Theme
              </Button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="border-t border-charcoal-200/60 pt-6 dark:border-charcoal-800">
            <h3 className="font-display font-bold text-base text-charcoal-900 dark:text-white mb-3">
              Notification Preferences
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-cream-100/70 p-4 dark:bg-charcoal-950 border border-charcoal-200/60 dark:border-charcoal-800">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-forest-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-xs font-bold text-charcoal-900 dark:text-white">Email Scan Summaries</p>
                    <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">Receive weekly safety reports & scan updates</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="h-4 w-4 rounded border-charcoal-300 text-forest-600 focus:ring-forest-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-cream-100/70 p-4 dark:bg-charcoal-950 border border-charcoal-200/60 dark:border-charcoal-800">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-forest-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-xs font-bold text-charcoal-900 dark:text-white">High Allergen Exposure Alerts</p>
                    <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">Instant warnings when severe allergens match your profile</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={scanAlerts}
                  onChange={(e) => setScanAlerts(e.target.checked)}
                  className="h-4 w-4 rounded border-charcoal-300 text-forest-600 focus:ring-forest-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md">
              Save Preferences
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
