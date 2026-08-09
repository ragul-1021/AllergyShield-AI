const styles = {
  success:
    "bg-success-50 text-success-700 border border-success-500/20 dark:bg-success-500/10 dark:text-emerald-400 dark:border-emerald-500/30",
  danger:
    "bg-danger-50 text-danger-700 border border-danger-500/20 dark:bg-danger-500/10 dark:text-danger-400 dark:border-danger-500/30",
  warning:
    "bg-warning-50 text-warning-700 border border-warning-500/20 dark:bg-warning-500/10 dark:text-warning-400 dark:border-warning-500/30",
  primary:
    "bg-primary-50 text-primary-700 border border-primary-500/20 dark:bg-primary-500/10 dark:text-emerald-400 dark:border-emerald-500/30",
  neutral:
    "bg-charcoal-100 text-charcoal-700 border border-charcoal-200 dark:bg-charcoal-800 dark:text-charcoal-300 dark:border-charcoal-700",
};

export default function Badge({ tone = "neutral", children, className = "" }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${styles[tone] || styles.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
