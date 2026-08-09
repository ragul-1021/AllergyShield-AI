import { motion } from "framer-motion";

export default function Card({ children, className = "", hover = false, ...props }) {
  return (
    <motion.section
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`rounded-2xl border border-charcoal-200/80 bg-cream-50/90 shadow-[0_4px_20px_-4px_rgba(31,111,80,0.05)] backdrop-blur-md dark:border-charcoal-800 dark:bg-charcoal-900/90 dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  );
}
