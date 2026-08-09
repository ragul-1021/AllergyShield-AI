import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Brain,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Navbar from "../components/layout/Navbar";
import { useTheme } from "../hooks/useTheme";
import { pageTransition } from "../animations/page";

const features = [
  "OCR Ingredient Detection",
  "AI Allergen Cross-Reference",
  "Personalized Risk Scoring",
  "Scan History Timeline",
  "Secure Cloud Profile",
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailError = useMemo(() => {
    if (!email) return "";
    return /\S+@\S+\.\S+/.test(email) ? "" : "Enter a valid email address.";
  }, [email]);

  const passwordError =
    password && password.length < 6 ? "Password must be at least 6 characters." : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }
    if (emailError) {
      setError(emailError);
      return;
    }
    if (passwordError) {
      setError(passwordError);
      return;
    }
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      await login(email, password);
      setSuccess(true);
      navigate(from, { replace: true });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const status = err?.response?.status;
      if (status === 401) {
        setError(detail || "Invalid email or password. Please check your credentials.");
      } else if (!err?.response) {
        setError("Cannot connect to backend server. Make sure FastAPI backend is running on http://127.0.0.1:8000.");
      } else {
        setError(typeof detail === "string" ? detail : "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div {...pageTransition} className="page-shell min-h-screen flex flex-col">
      <Navbar isLanding theme={theme} onThemeToggle={toggleTheme} />

      <div className="relative flex-1 grid lg:grid-cols-2 items-center mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Left Branding / Features Side */}
        <section className="hidden lg:flex flex-col justify-center pr-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-forest-500/20 bg-forest-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 dark:bg-forest-600/20 dark:text-emerald-400"
          >
            <Sparkles size={15} />
            Healthcare AI Platform
          </motion.div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-charcoal-900 dark:text-white lg:text-5xl leading-tight">
            Food Safety & Allergen Scanning <br />
            <span className="text-forest-600 dark:text-emerald-400">Made Simple.</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-charcoal-600 dark:text-charcoal-300">
            Sign in to access your personal allergy watch list, scan food ingredient labels, and review instant safety evaluations.
          </p>

          <div className="mt-8 space-y-3">
            {features.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * idx, duration: 0.2 }}
                className="flex items-center gap-3 text-sm font-bold text-charcoal-800 dark:text-cream-100"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-600 text-white dark:bg-emerald-500">
                  <CheckCircle2 size={15} />
                </div>
                {item}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Right Glass Card Login Form */}
        <section className="flex justify-center lg:justify-end w-full">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="glass-panel w-full max-w-md rounded-3xl p-8 shadow-2xl"
          >
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-600 text-white shadow-md shadow-forest-600/25 dark:bg-emerald-500">
                <ShieldCheck size={28} />
              </div>
              <h2 className="font-display text-2xl font-extrabold text-charcoal-900 dark:text-white">Welcome Back</h2>
              <p className="mt-1.5 text-xs text-charcoal-500 dark:text-charcoal-400">
                Enter your credentials to continue to AllergyShield AI
              </p>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-danger-50 p-3.5 text-xs font-bold text-danger-700 border border-danger-500/20 dark:bg-danger-500/10 dark:text-danger-400">
                <AlertCircle size={16} className="shrink-0 text-danger-600" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-success-50 p-3.5 text-xs font-bold text-success-700 border border-success-500/20 dark:bg-success-500/10 dark:text-emerald-400">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span>Login successful! Redirecting...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                icon={Mail}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                error={emailError}
              />

              <div className="w-full">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-charcoal-600 dark:text-charcoal-300">
                  Password
                </label>
                <div className="relative">
                  <Input
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    error={passwordError}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3.5 top-3.5 text-charcoal-400 hover:text-charcoal-700 dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 font-semibold text-charcoal-600 dark:text-charcoal-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-charcoal-300 text-forest-600 focus:ring-forest-500"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="font-bold text-forest-600 hover:text-forest-700 dark:text-emerald-400 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" loading={loading} variant="primary" size="lg" className="w-full mt-2">
                Sign In
              </Button>
            </form>

            <div className="mt-6 border-t border-charcoal-200/60 pt-6 text-center text-xs font-medium text-charcoal-500 dark:border-charcoal-800 dark:text-charcoal-400">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-bold text-forest-600 hover:text-forest-700 dark:text-emerald-400 transition-colors">
                Create Account
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}
