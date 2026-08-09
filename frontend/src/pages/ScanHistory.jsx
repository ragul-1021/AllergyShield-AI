import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Grid,
  List,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Tag,
  Filter,
} from "lucide-react";
import { fetchScanHistory } from "../api/historyApi";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Skeleton from "../components/ui/Skeleton";
import { pageTransition } from "../animations/page";

const PAGE_SIZE = 6;

export default function ScanHistory() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState("timeline");
  const [page, setPage] = useState(1);

  const loadHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await fetchScanHistory();
      const rows = Array.isArray(data) ? data : [];
      setScans([...rows].sort((a, b) => (b.id || 0) - (a.id || 0)));
    } catch (err) {
      setError(err?.response?.data?.detail || "Could not load scan history from backend.");
      setScans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, filter]);

  const filtered = useMemo(() => {
    return scans.filter((scan) => {
      const matchesStatus = filter === "All" || scan.status === filter;
      const text = `${scan.id || ""} ${scan.detected_allergens || ""} ${scan.extracted_text || ""}`.toLowerCase();
      return matchesStatus && text.includes(query.toLowerCase());
    });
  }, [scans, query, filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <motion.div {...pageTransition} className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
      >
        <div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Badge tone="primary">
              <CalendarClock size={13} />
              History & Audit
            </Badge>
          </motion.div>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-charcoal-900 dark:text-white sm:text-4xl">
            Scan History Timeline
          </h1>
          <p className="mt-1 text-sm text-charcoal-600 dark:text-charcoal-400">
            Audit past label scans, compare safety evaluations, and search ingredient logs.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button type="button" variant="secondary" onClick={loadHistory} disabled={loading} icon={RefreshCw}>
            Refresh History
          </Button>
        </motion.div>
      </motion.div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-danger-50 p-4 text-xs font-bold text-danger-700 border border-danger-500/20 dark:bg-danger-500/10 dark:text-danger-400">
          <AlertCircle size={16} className="shrink-0 text-danger-600" />
          <span>{error}</span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 max-w-md">
              <Input
                icon={Search}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by ID, allergen (e.g. Peanut), or text..."
                aria-label="Search scan history"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex rounded-2xl bg-cream-100 p-1 dark:bg-charcoal-950 border border-charcoal-200/60 dark:border-charcoal-800">
                {["All", "Safe", "Unsafe"].map((item) => (
                  <motion.button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      filter === item
                        ? "bg-white text-forest-600 shadow-xs dark:bg-charcoal-900 dark:text-emerald-400"
                        : "text-charcoal-600 hover:text-charcoal-900 dark:text-charcoal-400 dark:hover:text-white"
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              <div className="flex rounded-2xl bg-cream-100 p-1 dark:bg-charcoal-950 border border-charcoal-200/60 dark:border-charcoal-800">
                <motion.button
                  type="button"
                  aria-label="Timeline view"
                  onClick={() => setViewMode("timeline")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "timeline"
                      ? "bg-white text-forest-600 shadow-xs dark:bg-charcoal-900 dark:text-emerald-400"
                      : "text-charcoal-500 hover:text-charcoal-800 dark:text-charcoal-400"
                  }`}
                >
                  <List size={16} />
                  <span className="hidden sm:inline">Timeline</span>
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setViewMode("grid")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-forest-600 shadow-xs dark:bg-charcoal-900 dark:text-emerald-400"
                      : "text-charcoal-500 hover:text-charcoal-800 dark:text-charcoal-400"
                  }`}
                >
                  <Grid size={16} />
                  <span className="hidden sm:inline">Grid</span>
                </motion.button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="p-6 overflow-hidden">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          ) : visible.length ? (
            viewMode === "timeline" ? (
              <div className="relative space-y-6 before:absolute before:left-5 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-charcoal-200 dark:before:bg-charcoal-800">
                {visible.map((scan, idx) => (
                  <div key={scan.id}>
                    <TimelineCard scan={scan} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((scan, idx) => (
                  <div key={scan.id}>
                    <GridCard scan={scan} />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="py-12 text-center text-xs font-semibold text-charcoal-500 dark:text-charcoal-400">
              No scans matching your search or filter parameters.
            </div>
          )}
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-xs font-semibold text-charcoal-500 dark:text-charcoal-400">
          Showing {visible.length} of {filtered.length} total scans
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={ChevronLeft}
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Prev
          </Button>
          <span className="text-xs font-bold px-3 text-charcoal-800 dark:text-cream-100">
            {page} / {pageCount}
          </span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={ChevronRight}
            disabled={page >= pageCount}
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          >
            Next
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineCard({ scan }) {
  const unsafe = scan.status === "Unsafe";

  return (
    <motion.article
      whileHover={{ scale: 1.01, x: 5 }}
      transition={{ duration: 0.2 }}
      className="relative pl-12"
    >
      <motion.span 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="absolute left-1 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white ring-4 ring-cream-50 dark:bg-charcoal-900 dark:ring-charcoal-950 shadow-xs"
      >
        {unsafe ? (
          <ShieldAlert size={18} className="text-danger-600 dark:text-danger-400" />
        ) : (
          <ShieldCheck size={18} className="text-forest-600 dark:text-emerald-400" />
        )}
      </motion.span>

      <motion.div 
        whileHover={{ borderColor: unsafe ? "rgba(220, 38, 38, 0.4)" : "rgba(46, 139, 87, 0.4)" }}
        className="rounded-2xl border border-charcoal-200/70 bg-cream-50/50 p-5 dark:border-charcoal-800 dark:bg-charcoal-950 transition hover:border-forest-600/40"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-display font-extrabold text-base text-charcoal-900 dark:text-white">
                Scan #{scan.id}
              </h3>
              <Badge tone={unsafe ? "danger" : "success"}>{scan.status || "Unknown"}</Badge>
            </div>
            <p className="mt-2 text-xs font-semibold text-charcoal-700 dark:text-charcoal-300">
              Flagged Allergens:{" "}
              <span className={unsafe ? "text-danger-600 font-bold" : "text-emerald-600 font-bold"}>
                {scan.detected_allergens || "None detected"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-charcoal-500 shrink-0">
            <Clock3 size={14} />
            <span>{scan.scanned_at ? new Date(scan.scanned_at).toLocaleDateString() : "Unknown date"}</span>
          </div>
        </div>

        <div className="mt-3 border-t border-charcoal-200/60 pt-3 dark:border-charcoal-800">
          <p className="text-xs text-charcoal-600 dark:text-charcoal-400 line-clamp-2">
            {scan.extracted_text || "No ingredient text available"}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

function GridCard({ scan }) {
  const unsafe = scan.status === "Unsafe";

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card hover className="h-full p-5">
        <div className="flex items-start justify-between mb-3">
          <Badge tone={unsafe ? "danger" : "success"}>{scan.status || "Unknown"}</Badge>
          <span className="text-xs text-charcoal-500">#{scan.id}</span>
        </div>

        <div className="mb-3">
          <p className="text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
            Allergens:
          </p>
          <p className={`text-xs font-bold ${unsafe ? "text-danger-600" : "text-emerald-600"}`}>
            {scan.detected_allergens || "None"}
          </p>
        </div>

        <div className="text-xs text-charcoal-500 dark:text-charcoal-400 line-clamp-3">
          {scan.extracted_text || "No text available"}
        </div>

        <div className="mt-3 pt-3 border-t border-charcoal-200/60 dark:border-charcoal-800 flex items-center gap-1.5 text-xs text-charcoal-500">
          <Clock3 size={12} />
          <span>{scan.scanned_at ? new Date(scan.scanned_at).toLocaleDateString() : "Unknown"}</span>
        </div>
      </Card>
    </motion.div>
  );
}
