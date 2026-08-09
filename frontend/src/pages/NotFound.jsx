import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ShieldCheck } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-4 py-12 text-center">
      <Card className="glass-panel max-w-md w-full p-8 rounded-3xl shadow-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-400">
          <AlertTriangle size={32} />
        </div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-forest-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-forest-700 dark:bg-forest-600/20 dark:text-emerald-400">
          <ShieldCheck size={14} />
          AllergyShield AI
        </div>
        <h1 className="font-display text-2xl font-extrabold text-charcoal-900 dark:text-white">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-charcoal-600 dark:text-charcoal-400">
          The requested page does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Button as={Link} to="/dashboard" variant="primary" icon={ArrowLeft} className="w-full">
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}
