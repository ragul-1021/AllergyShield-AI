import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { checkEmailExists, forgotPasswordRequest } from "../api/authApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Navbar from "../components/layout/Navbar";
import { useTheme } from "../hooks/useTheme";
import { pageTransition } from "../animations/page";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const emailError = useMemo(() => {
    if (!email) return "";
    return /\S+@\S+\.\S+/.test(email) ? "" : "Enter a valid email address.";
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) return;

    setLoading(true);
    setMessage("");
    setResetLink("");
    setError("");

    try {
      const existsResponse = await checkEmailExists(email);
      if (!existsResponse.data.exists) {
        setError("No account exists with this email address.");
        return;
      }

      const { data } = await forgotPasswordRequest(email);
      setMessage(data.message || "Reset email sent.");
      setResetLink(data.reset_link || "");
    } catch (err) {
      setError(err?.response?.data?.detail || "Could not start password reset. Please try again.");
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
            <h1 className="font-display text-2xl font-extrabold text-charcoal-900 dark:text-white">Reset Password</h1>
            <p className="mt-1.5 text-xs text-charcoal-500 dark:text-charcoal-400">
              Enter your account email to receive a password reset link
            </p>
          </div>

          {message && (
            <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-success-50 p-3.5 text-xs font-bold text-success-700 border border-success-500/20 dark:bg-success-500/10 dark:text-emerald-400">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              <span>{message}</span>
            </div>
          )}

          {resetLink && (
            <div className="mb-4 rounded-2xl border border-forest-500/30 bg-forest-50 p-4 text-xs dark:bg-forest-600/10">
              <p className="font-bold text-charcoal-900 dark:text-white">Development Reset Link:</p>
              <Link className="mt-1.5 block break-all font-semibold text-forest-600 dark:text-emerald-400" to={resetLink.replace(/^https?:\/\/[^/]+/, "")}>
                {resetLink}
              </Link>
            </div>
          )}

          {error && (
            <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-danger-50 p-3.5 text-xs font-bold text-danger-700 border border-danger-500/20 dark:bg-danger-500/10 dark:text-danger-400">
              <AlertCircle size={16} className="shrink-0 text-danger-600" />
              <span>{error}</span>
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
              placeholder="you@gmail.com"
              error={emailError}
            />

            <Button type="submit" loading={loading} variant="primary" size="lg" className="w-full">
              Send Reset Link
            </Button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mx-auto mt-6 flex items-center gap-2 text-xs font-bold text-forest-600 hover:text-forest-700 dark:text-emerald-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </button>
        </Card>
      </div>
    </motion.div>
  );
}
