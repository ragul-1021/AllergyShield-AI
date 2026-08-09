export default function Input({ icon: Icon, className = "", error, label, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-charcoal-600 dark:text-charcoal-300">
          {label}
        </label>
      )}
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-cream-50/90 px-4 py-3 shadow-xs transition-all duration-200 focus-within:border-forest-600 focus-within:bg-white focus-within:ring-3 focus-within:ring-forest-600/15 dark:bg-charcoal-900/90 dark:focus-within:bg-charcoal-950 dark:focus-within:border-emerald-500 dark:focus-within:ring-emerald-500/20 ${
          error
            ? "border-danger-500 text-danger-600"
            : "border-charcoal-200 dark:border-charcoal-700"
        } ${className}`}
      >
        {Icon && <Icon size={18} className="shrink-0 text-charcoal-400 dark:text-charcoal-500" aria-hidden="true" />}
        <input
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-charcoal-900 placeholder:text-charcoal-400 outline-none dark:text-cream-50 dark:placeholder:text-charcoal-500"
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-semibold text-danger-600 dark:text-danger-400">{error}</p>}
    </div>
  );
}
