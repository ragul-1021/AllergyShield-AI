import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  ArrowRight,
  Brain,
  Clock,
  Database,
  FileScan,
  History,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { pageTransition } from "../animations/page";

const features = [
  { icon: FileScan, title: "OCR Detection", text: "Read ingredient labels from product photos in seconds." },
  { icon: Brain, title: "AI Analysis", text: "Extracts ingredient signals and highlights hidden allergy risks." },
  { icon: ShieldAlert, title: "Allergen Detection", text: "Compares scans with your personal allergy watch list." },
  { icon: History, title: "Scan History", text: "Review prior checks and spot recurring ingredient patterns." },
  { icon: Clock, title: "Fast Results", text: "Designed for quick decisions while shopping or eating out." },
  { icon: Sparkles, title: "Trusted AI", text: "A focused workflow built for careful, healthcare-adjacent use." },
];

const stats = [
  ["1000+", "Ingredients"],
  ["40+", "Allergens"],
  ["99%", "Accuracy"],
];

export default function Landing() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const featureCardsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section entrance animations
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Text reveal animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
      );

      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: "power2.out" }
      );

      // Feature cards stagger animation
      if (featureCardsRef.current) {
        gsap.fromTo(featureCardsRef.current.children,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.1, 
            delay: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featureCardsRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);
  return (
    <motion.div {...pageTransition} className="page-shell min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/25">
            <ShieldCheck size={21} />
          </span>
          <span className="text-base font-extrabold text-ink-900 dark:text-white">AllergyShield AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-semibold text-ink-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-900">
            Log in
          </Link>
          <Button as={Link} to="/register" size="sm">
            Sign up
          </Button>
        </div>
      </header>

      <main>
        <section ref={heroRef} className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24 overflow-hidden">
          {/* Floating ambient background */}
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 overflow-hidden w-full max-w-7xl h-full">
            <div className="animate-slow-float absolute -top-10 left-10 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="animate-slow-float-reverse absolute top-40 right-10 h-80 w-80 rounded-full bg-primary-400/10 blur-3xl" />
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-600 shadow-sm dark:border-primary-500/20 dark:bg-slate-900 dark:text-primary-500"
            >
              <ScanLine size={14} />
              AI label intelligence
            </motion.div>
            <h1 ref={titleRef} className="max-w-4xl text-5xl font-extrabold leading-[1.04] tracking-tight text-ink-900 dark:text-white sm:text-6xl">
              Scan Food Labels Instantly with AI
            </h1>
            <p ref={subtitleRef} className="mt-6 max-w-2xl text-lg leading-8 text-ink-500 dark:text-slate-400">
              Detect allergens fast and accurately from food label images, then get clear safety
              guidance based on your saved allergy profile.
            </p>
            <div ref={ctaRef} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button as={Link} to="/scan" size="lg" icon={ScanLine}>
                Scan Now
              </Button>
              <Button as="a" href="#features" variant="secondary" size="lg" icon={ArrowRight}>
                Learn More
              </Button>
            </div>
          </div>

          <Card className="relative overflow-hidden p-5">
            <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-300">
                    Live analysis
                  </p>
                  <h2 className="mt-2 text-xl font-bold">Chocolate cereal label</h2>
                </div>
                <Database className="text-primary-300" size={24} />
              </div>
              <div className="space-y-3 py-5">
                {["Wheat flour", "Milk solids", "Peanut trace warning"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 * index, duration: 0.22 }}
                    className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        index === 2 ? "bg-danger-500/20 text-danger-500" : "bg-success-500/20 text-success-500"
                      }`}
                    >
                      {index === 2 ? "Risk" : "Safe"}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-2xl bg-primary-500 p-4">
                <p className="text-sm font-bold">Recommendation</p>
                <p className="mt-1 text-sm text-primary-50">
                  Avoid if peanut allergic. Verify packaging warnings before consuming.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">Platform</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink-900 dark:text-white">
              Built for fast, confident food safety checks.
            </h2>
          </div>
          <div ref={featureCardsRef} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <Card key={title} hover className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-500">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-500 dark:text-slate-400">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <Card ref={statsRef} className="grid gap-6 p-8 md:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-extrabold text-ink-900 dark:text-white">{value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-slate-400">
                  {label}
                </p>
              </div>
            ))}
          </Card>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-ink-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 AllergyShield AI. Food safety, made clearer.</p>
        <p>Always verify product packaging and consult medical guidance for severe allergies.</p>
      </footer>
    </motion.div>
  );
}
