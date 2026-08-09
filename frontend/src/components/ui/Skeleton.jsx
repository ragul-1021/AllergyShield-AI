import { motion } from "framer-motion";

export default function Skeleton({ className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse" }}
      className={`rounded-xl bg-charcoal-200/70 dark:bg-charcoal-800 ${className}`}
    />
  );
}
