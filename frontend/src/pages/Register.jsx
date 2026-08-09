import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { useAuth } from "../context/useAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Progress from "../components/ui/Progress";
import Navbar from "../components/layout/Navbar";
import { useTheme } from "../hooks/useTheme";
import { pageTransition } from "../animations/page";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailError = useMemo(() => {
    if (!email) return "";
    return /\S+@\S+\.\S+/.test(email) ? "" : "Enter a valid email address.";
  }, [email]);
  const nameError = name && name.trim().length < 2 ? "Name must be at least 2 characters." : "";
  const passwordError = password && password.length < 6 ? "Password must be at least 6 characters." : "";
  const strength = Math.min(100, password.length * 14 + (/[A-Z]/.test(password) ? 16 : 0) + (/[0-9]/.test(password) ? 16 : 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (nameError) {
      setError(nameError);
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
    setLoading(true);
    try {
      await register(name, email, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      if (!err?.response) {
        setError("Cannot connect to backend server. Make sure FastAPI backend is running on http://127.0.0.1:8000.");
      } else {
        setError(typeof detail === "string" ? detail : "Could not create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div {...pageTransition} className="page-shell min-h-screen flex flex-col">
      <Navbar isLanding theme={theme} onThemeToggle={toggleTheme} />

      <div className="relative flex-1 grid lg:grid-cols-2 items-center mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Left Info Side */}
        <section className="hidden lg:flex flex-col justify-center pr-12">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600 dark:text-emerald-400 mb-2">
            Instant Account Creation
          </span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-charcoal-900 dark:text-white lg:text-5xl leading-tight">
            Build Your Personal <br />
            <span className="text-forest-600 dark:text-emerald-400">Allergy Shield Today.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-charcoal-600 dark:text-charcoal-300">
            Set up your free account to store allergen watch lists, run OCR product scans, and track ingredient safety timelines.
          </p>
        </section>

        {/* Right Glass Card Register Form */}
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
              <h2 className="font-display text-2xl font-extrabold text-charcoal-900 dark:text-white">Create Account</h2>
              <p className="mt-1.5 text-xs text-charcoal-500 dark:text-charcoal-400">
                Start scanning food labels with AI precision
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
                <span>Account created! Redirecting to login...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                icon={User}
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                error={nameError}
              />

              <Input
                label="Email Address"
                icon={Mail}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
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
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
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
                {password && (
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-charcoal-500 mb-1">
                      <span>Password Strength</span>
                      <span>{strength > 75 ? "Strong" : strength > 45 ? "Medium" : "Weak"}</span>
                    </div>
                    <Progress value={strength} tone={strength > 75 ? "success" : strength > 45 ? "warning" : "danger"} />
                  </div>
                )}
              </div>

              <Button type="submit" loading={loading} variant="primary" size="lg" className="w-full mt-2">
                Sign Up
              </Button>
            </form>

            <div className="mt-6 border-t border-charcoal-200/60 pt-6 text-center text-xs font-medium text-charcoal-500 dark:border-charcoal-800 dark:text-charcoal-400">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-forest-600 hover:text-forest-700 dark:text-emerald-400 transition-colors">
                Log In
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}
