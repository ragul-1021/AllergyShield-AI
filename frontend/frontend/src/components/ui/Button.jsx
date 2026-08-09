import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-forest-600 text-white shadow-md shadow-forest-600/20 hover:bg-[#1A5C43] active:bg-[#154B36] border border-transparent",
  emerald:
    "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-[#257347] active:bg-[#1E5D39] border border-transparent",
  secondary:
    "border border-charcoal-200 bg-cream-50 text-charcoal-800 shadow-xs hover:border-forest-600/40 hover:bg-cream-100 dark:border-charcoal-700 dark:bg-charcoal-900 dark:text-cream-100 dark:hover:bg-charcoal-800 dark:hover:border-forest-500/50",
  ghost:
    "text-charcoal-700 hover:bg-charcoal-100/70 hover:text-charcoal-900 dark:text-charcoal-300 dark:hover:bg-charcoal-800 dark:hover:text-white",
  danger:
    "bg-danger-600 text-white shadow-sm shadow-danger-600/20 hover:bg-danger-700 border border-transparent",
  outline:
    "border-2 border-forest-600 text-forest-600 bg-transparent hover:bg-forest-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-500/10",
};

const sizes = {
  sm: "h-9 px-3.5 text-xs font-semibold rounded-xl",
  md: "h-11 px-5 text-sm font-semibold rounded-2xl",
  lg: "h-13 px-6 text-base font-bold rounded-2xl",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      whileHover={{ y: -1, scale: 1.005 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 tracking-tight transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
      ) : Icon ? (
        <Icon size={18} className="shrink-0" aria-hidden="true" />
      ) : null}
      <span>{children}</span>
    </MotionComponent>
  );
}
