import { motion } from "framer-motion";

const tones = {
  primary: "bg-forest-600 dark:bg-emerald-500",
  emerald: "bg-emerald-500",
  success: "bg-emerald-500",
  warning: "bg-warning-500",
  danger: "bg-danger-500",
};

export default function Progress({ value = 0, tone = "primary", className = "" }) {
  const bounded = Math.max(0, Math.min(100, value));

  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-charcoal-200/80 dark:bg-charcoal-800 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${bounded}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`h-full rounded-full ${tones[tone] || tones.primary}`}
      />
    </div>
  );
}
