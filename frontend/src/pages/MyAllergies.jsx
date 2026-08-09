import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Plus, ShieldPlus, X, Sparkles } from "lucide-react";
import { saveMyAllergies, fetchMyAllergies } from "../api/allergyApi";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { pageTransition } from "../animations/page";

const COMMON_ALLERGENS = [
  "Peanuts",
  "Tree Nuts",
  "Milk / Dairy",
  "Eggs",
  "Wheat / Gluten",
  "Soy",
  "Fish",
  "Shellfish",
  "Sesame",
  "Mustard",
  "Sulfites",
];

export default function MyAllergies() {
  const [allergies, setAllergies] = useState([]);
  const [entry, setEntry] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addAllergy = (valueToAdd) => {
    const value = (valueToAdd || entry).trim();
    if (!value) return;
    setAllergies((current) =>
      current.some((item) => item.toLowerCase() === value.toLowerCase()) ? current : [...current, value]
    );
    if (!valueToAdd) setEntry("");
  };

  useEffect(() => {
    const loadAllergies = async () => {
      try {
        const { data } = await fetchMyAllergies();
        setAllergies(Array.isArray(data.allergies) ? data.allergies : []);
      } catch {
        setAllergies([]);
      }
    };

    loadAllergies();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await saveMyAllergies(allergies);
      setAllergies(Array.isArray(data.allergies) ? data.allergies : allergies);
      setMessage(data.message || "Allergy watch list saved successfully.");
    } catch (err) {
      setError(err?.response?.data?.detail || "Could not save allergy watch list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl space-y-8">
      <div>
        <Badge tone="primary">
          <ShieldPlus size={13} />
          Safety Watch List
        </Badge>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-charcoal-900 dark:text-white sm:text-4xl">
          My Allergy Watch List
        </h1>
        <p className="mt-1 text-sm text-charcoal-600 dark:text-charcoal-400">
          Saved allergens are cross-referenced by AI when you scan food ingredient labels.
        </p>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between border-b border-charcoal-200/60 pb-4 dark:border-charcoal-800">
          <div>
            <h2 className="font-display font-extrabold text-lg text-charcoal-900 dark:text-white">
              Allergen Profile Management
            </h2>
            <p className="mt-1 text-xs text-charcoal-500 dark:text-charcoal-400">
              Add custom ingredients or click common allergen quick-select tags below.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-danger-50 p-4 text-xs font-bold text-danger-700 border border-danger-500/20 dark:bg-danger-500/10 dark:text-danger-400">
            <AlertCircle size={16} className="shrink-0 text-danger-600" />
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-success-50 p-4 text-xs font-bold text-success-700 border border-success-500/20 dark:bg-success-500/10 dark:text-emerald-400">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={save} className="space-y-6">
          {/* Input & Add Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <Input
                type="text"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAllergy();
                  }
                }}
                placeholder="Type custom allergen (e.g., Peanut, Milk, Soy, Hazelnut)..."
              />
            </div>
            <Button type="button" variant="secondary" onClick={() => addAllergy()} icon={Plus}>
              Add Allergen
            </Button>
          </div>

          {/* Quick Select Common Allergens */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400 block mb-2.5">
              Quick Select Common Allergens
            </span>
            <div className="flex flex-wrap gap-2">
              {COMMON_ALLERGENS.map((item) => {
                const isSelected = allergies.some((a) => a.toLowerCase() === item.toLowerCase());
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setAllergies((current) => current.filter((a) => a.toLowerCase() !== item.toLowerCase()));
                      } else {
                        addAllergy(item);
                      }
                    }}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-forest-600 text-white shadow-xs dark:bg-emerald-500"
                        : "bg-cream-100 text-charcoal-700 hover:bg-cream-200 dark:bg-charcoal-800 dark:text-charcoal-300 dark:hover:bg-charcoal-700"
                    }`}
                  >
                    {isSelected ? `✓ ${item}` : `+ ${item}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Saved Watch List */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400 block mb-2.5">
              Your Active Watch List ({allergies.length})
            </span>
            <div className="flex min-h-[100px] flex-wrap items-center gap-2 rounded-2xl bg-cream-100/70 p-4 dark:bg-charcoal-950 border border-charcoal-200/60 dark:border-charcoal-800">
              {allergies.length ? (
                allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-charcoal-800 shadow-xs ring-1 ring-charcoal-200/70 dark:bg-charcoal-900 dark:text-cream-100 dark:ring-charcoal-800"
                  >
                    <span>{allergy}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${allergy}`}
                      onClick={() => setAllergies((current) => current.filter((item) => item !== allergy))}
                      className="text-charcoal-400 hover:text-danger-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-xs font-semibold text-charcoal-500 dark:text-charcoal-400">
                  No allergens added yet. Type above or click quick tags to populate your watch list.
                </p>
              )}
            </div>
          </div>

          <Button type="submit" loading={loading} variant="primary" size="lg" className="w-full">
            {loading ? "Saving Watch List..." : "Save Allergy Watch List"}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
