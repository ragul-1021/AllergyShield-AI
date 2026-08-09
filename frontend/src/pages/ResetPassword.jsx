import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { resetPasswordRequest } from "../api/authApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Progress from "../components/ui/Progress";
import Navbar from "../components/layout/Navbar";
import { useTheme } from "../hooks/useTheme";
import { pageTransition } from "../animations/page";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
    }
  }, [token]);

  const passwordError = password && password.length < 6 ? "Password must be at least 6 characters." : "";
  const confirmError = confirmPassword && password !== confirmPassword ? "Passwords do not match." : "";
  const strength = useMemo(
    () => Math.min(100, password.length * 14 + (/[A-Z]/.test(password) ? 16 : 0) + (/[0-9]/.test(password) ? 16 : 0)),
    [password]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (passwordError || confirmError || !password || !confirmPassword) return;

    setLoading(true);

    try {
      const { data } = await resetPasswordRequest(token, password);
      setMessage(data.message || "Password reset successful.");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div {...pageTransition} className="page-shell min-h-screen flex flex-col">
      <Navbar isLanding theme={theme} onThemeToggle={toggleTheme} />

      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6">
        <Card className="glass-panel w-full max-w-md rounded-3xl p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-600 text-white shadow-md shadow-forest-600/25 dark:bg-emerald-500">
              <ShieldCheck size={28} />
            </div>
            <h1 className="font-display text-2xl font-extrabold text-charcoal-900 dark:text-white">Create New Password</h1>
            <p className="mt-1.5 text-xs text-charcoal-500 dark:text-charcoal-400">
              Choose a strong password for your AllergyShield AI account
            </p>
          </div>

          {message && (
            <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-success-50 p-3.5 text-xs font-bold text-success-700 border border-success-500/20 dark:bg-success-500/10 dark:text-emerald-400">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              <span>{message} Redirecting to login...</span>
            </div>
          )}

          {error && (
            <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-danger-50 p-3.5 text-xs font-bold text-danger-700 border border-danger-500/20 dark:bg-danger-500/10 dark:text-danger-400">
              <AlertCircle size={16} className="shrink-0 text-danger-600" />
              <span>{error}</span>
            </div>
          )}

          {token ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-charcoal-600 dark:text-charcoal-300">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
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
                  <div className="mt-2">
                    <Progress value={strength} tone={strength > 75 ? "success" : strength > 45 ? "warning" : "danger"} />
                  </div>
                )}
              </div>

              <Input
                label="Confirm Password"
                icon={Lock}
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                error={confirmError}
              />

              <Button type="submit" loading={loading} variant="primary" size="lg" className="w-full">
                Reset Password
              </Button>
            </form>
          ) : (
            <Button as={Link} to="/forgot-password" variant="primary" className="w-full">
              Request New Reset Link
            </Button>
          )}

          <p className="mt-6 text-center text-xs text-charcoal-500 dark:text-charcoal-400">
            Remember your password?{" "}
            <Link to="/login" className="font-bold text-forest-600 hover:text-forest-700 dark:text-emerald-400 transition-colors">
              Back to Sign In
            </Link>
          </p>
        </Card>
      </div>
    </motion.div>
  );
}
