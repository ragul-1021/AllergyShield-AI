import Card from "./Card";

export default function StatCard({ icon: Icon, label, value, helper, tone = "primary" }) {
  const tones = {
    primary: "bg-forest-50 text-forest-600 border border-forest-500/20 dark:bg-forest-600/10 dark:text-emerald-400 dark:border-emerald-500/20",
    success: "bg-success-50 text-success-600 border border-success-500/20 dark:bg-success-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    danger: "bg-danger-50 text-danger-600 border border-danger-500/20 dark:bg-danger-500/10 dark:text-danger-400 dark:border-danger-500/20",
    warning: "bg-warning-50 text-warning-600 border border-warning-500/20 dark:bg-warning-500/10 dark:text-warning-400 dark:border-warning-500/20",
    accent: "bg-emerald-50 text-emerald-700 border border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  };

  return (
    <Card hover className="relative overflow-hidden p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">{label}</p>
          <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-charcoal-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tones[tone] || tones.primary}`}>
          <Icon size={22} aria-hidden="true" />
        </div>
      </div>
      {helper && <p className="mt-4 text-xs font-semibold text-charcoal-500 dark:text-charcoal-400">{helper}</p>}
    </Card>
  );
}
