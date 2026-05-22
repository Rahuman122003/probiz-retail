"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WordReveal, MaskReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";
import { TrendingUp, TrendingDown, Sparkles, ShoppingCart, Camera, Receipt, BarChart3, Package, Users, Bell, Search, AlertTriangle, Activity, Eye } from "lucide-react";

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const dashY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const dashScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    return (
        <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden mesh-bg pt-24 sm:pt-32 pb-8 sm:pb-12">
            <div className="noise" />

            {/* Animated gradient orb */}
            <motion.div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full opacity-30 blur-3xl"
                style={{
                    background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] sm:text-[12px] font-medium text-ink-600 mb-8 sm:mb-10"
                >
                    <Image src="/logo1.png" alt="" width={389} height={340} className="w-4 h-4 object-contain" />
                    Introducing Probiz Retail 3.0
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </motion.div>

                <h1 className="font-display font-semibold tracking-ultra text-[11vw] sm:text-[8.5vw] lg:text-[7.5vw] leading-[0.92] text-ink-950">
                    <span className="block"><WordReveal text="Run your entire Retail" /></span>
                    <span className="block">
                        <WordReveal text="business with" delay={0.3} />{" "}
                        <span className="italic font-light text-gradient-accent">
                            <MaskReveal delay={0.6}>AI.</MaskReveal>
                        </span>
                    </span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl text-ink-400 max-w-2xl mx-auto font-light tracking-tight px-2"
                >
                    GST billing. Inventory. AI Camera. POS. Unified into one breathtakingly simple platform.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                >
                    <Magnetic>
                        <Link href="/pricing" className="group relative w-full sm:w-auto inline-block text-center px-7 py-3.5 rounded-full bg-ink-950 text-white text-[14px] font-medium overflow-hidden">
                            <span className="relative z-10">Start Free</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link href="/pricing" className="w-full sm:w-auto inline-block text-center px-7 py-3.5 rounded-full border border-ink-200 text-[14px] font-medium hover:bg-white transition-colors">
                            Book a Demo →
                        </Link>
                    </Magnetic>
                </motion.div>
            </motion.div>

            {/* ── Dashboard Mockup ── */}
            <motion.div
                style={{ y: dashY, scale: dashScale }}
                className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 mt-14 sm:mt-20"
            >
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-ink-950/20 border border-ink-200/80 bg-white"
                >
                    {/* Browser chrome */}
                    <div className="bg-ink-50 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 border-b border-ink-100">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center gap-2 bg-white border border-ink-100 rounded-lg px-3 py-1 max-w-xs w-full">
                                <Search size={11} className="text-ink-300" />
                                <span className="text-[10px] sm:text-xs text-ink-400">probiz.app/dashboard</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Bell size={13} className="text-ink-400" />
                                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                            </div>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-accent to-purple-600" />
                        </div>
                    </div>

                    <div className="flex">
                        {/* Sidebar — desktop only */}
                        <div className="hidden lg:flex flex-col w-44 border-r border-ink-100 bg-ink-50/50 p-3 gap-0.5">
                            <div className="flex items-center gap-2 mb-4 px-2">
                                <Image src="/logo1.png" alt="" width={389} height={340} className="w-6 h-6 object-contain" />
                                <span className="text-xs font-semibold text-ink-800">Probiz Retail</span>
                            </div>
                            {[
                                { icon: BarChart3, label: "Dashboard", active: true },
                                { icon: Receipt, label: "Invoices", active: false },
                                { icon: Package, label: "Inventory", active: false },
                                { icon: ShoppingCart, label: "POS", active: false },
                                { icon: Camera, label: "AI Camera", active: false },
                                { icon: Users, label: "Customers", active: false },
                            ].map((item, i) => (
                                <div key={i} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors ${item.active ? "bg-ink-950 text-white" : "text-ink-400 hover:text-ink-600 hover:bg-ink-100"}`}>
                                    <item.icon size={14} strokeWidth={1.5} />
                                    {item.label}
                                </div>
                            ))}
                        </div>

                        {/* Main dashboard content */}
                        <div className="flex-1 p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
                            {/* Welcome bar */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm sm:text-base font-semibold text-ink-800">Good evening, Rahul</div>
                                    <div className="text-[10px] sm:text-xs text-ink-400">Thursday, 1 May 2026 • Main Store</div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-medium text-emerald-700">All systems online</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stat cards row */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {HERO_STATS.map((stat, i) => (
                                    <HeroStatCard key={i} stat={stat} index={i} />
                                ))}
                            </div>

                            {/* Charts row */}
                            <div className="grid lg:grid-cols-5 gap-3 sm:gap-4">
                                {/* Main chart */}
                                <HeroSalesChart />

                                {/* AI Camera mini feed + Recent POS */}
                                <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                                    <HeroCameraGrid />
                                    <HeroPOSFeed />
                                </div>
                            </div>

                            {/* Trends mini-row */}
                            <HeroTrends />
                        </div>
                    </div>
                </motion.div>

                {/* Gradient fade at bottom to blend with next section */}
                <div className="h-20 sm:h-32 bg-gradient-to-b from-transparent to-white relative -mt-10 sm:-mt-16 z-20" />
            </motion.div>
        </section>
    );
}

/* ──────── Hero stat cards with count-up + sparkline ehover glow ──────── */
const HERO_STATS = [
    {
        label: "Revenue", icon: TrendingUp, raw: 482300, prefix: "₹", change: "+23.4%", up: true,
        accent: "text-emerald-600", bg: "bg-emerald-50",
        spark: [0.3, 0.45, 0.4, 0.6, 0.5, 0.7, 0.85, 0.95],
        color: "#10b981",
    },
    {
        label: "Invoices", icon: Receipt, raw: 342, prefix: "", change: "+12%", up: true,
        accent: "text-sky-600", bg: "bg-sky-50",
        spark: [0.4, 0.5, 0.45, 0.55, 0.7, 0.65, 0.8, 0.9],
        color: "#0ea5e9",
    },
    {
        label: "AI Alerts", icon: Camera, raw: 7, prefix: "", change: "−3 vs yday", up: false,
        accent: "text-rose-600", bg: "bg-rose-50",
        spark: [0.7, 0.65, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3],
        color: "#f43f5e",
    },
    {
        label: "POS Sales", icon: ShoppingCart, raw: 124500, prefix: "₹", change: "+18%", up: true,
        accent: "text-violet-600", bg: "bg-violet-50",
        spark: [0.2, 0.35, 0.4, 0.55, 0.6, 0.7, 0.8, 0.9],
        color: "#8b5cf6",
    },
];

function HeroStatCard({ stat, index }: { stat: typeof HERO_STATS[number]; index: number }) {
    const Icon = stat.icon;
    const display = useCountUp(stat.raw, 1500, 1800 + index * 100);
    const formatted = stat.prefix === "₹"
        ? `₹${display.toLocaleString("en-IN")}`
        : display.toLocaleString("en-IN");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
            whileHover={{ y: -2 }}
            className="group relative p-3 sm:p-4 rounded-xl border border-ink-100 bg-white hover:shadow-lg hover:shadow-ink-950/5 transition-shadow overflow-hidden"
        >
            {/* Hover glow */}
            <div
                aria-hidden
                className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                style={{ background: stat.color }}
            />
            <div className="relative">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-400">{stat.label}</span>
                    <div className={`w-5 h-5 rounded-md ${stat.bg} flex items-center justify-center`}>
                        <Icon size={11} className={stat.accent} strokeWidth={1.8} />
                    </div>
                </div>
                <div className="text-base sm:text-xl font-semibold tracking-tight text-ink-900 tabular-nums">{formatted}</div>
                <div className={`flex items-center gap-0.5 text-[10px] sm:text-[11px] font-medium mt-0.5 ${stat.up ? "text-emerald-600" : "text-rose-600"}`}>
                    {stat.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {stat.change}
                </div>
                <HeroSparkline points={stat.spark} color={stat.color} delay={2 + index * 0.1} />
            </div>
        </motion.div>
    );
}

function HeroSparkline({ points, color, delay = 0 }: { points: number[]; color: string; delay?: number }) {
    const w = 100, h = 18;
    const xStep = w / (points.length - 1);
    const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${(i * xStep).toFixed(1)},${(h - p * h).toFixed(1)}`).join(" ");
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-4 mt-1.5" preserveAspectRatio="none">
            <motion.path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
            />
        </svg>
    );
}

/* ──────── Hero sales chart with traveling cursor + tooltip ──────── */
function HeroSalesChart() {
    const series = useRef<number[]>(
        Array.from({ length: 32 }, (_, i) => 80 - (Math.sin(i * 0.5) * 16 + Math.cos(i * 0.3) * 10 + i * 1.6))
    ).current;
    const w = 600, h = 120, pad = 8;
    const min = Math.min(...series), max = Math.max(...series);
    const xStep = (w - pad * 2) / (series.length - 1);
    const pts = series.map((v, i) => ({
        x: pad + i * xStep,
        y: pad + ((v - min) / (max - min || 1)) * (h - pad * 2),
    }));
    const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const areaPath = `${linePath} L${pts[pts.length - 1].x},${h} L${pts[0].x},${h} Z`;

    const [cursor, setCursor] = useState(pts.length - 1);
    useEffect(() => {
        const id = setInterval(() => setCursor((c) => (c + 1) % pts.length), 600);
        return () => clearInterval(id);
    }, [pts.length]);

    const cur = pts[cursor];
    const value = Math.round((1 - (cur.y - pad) / (h - pad * 2)) * 60000 + 12000).toLocaleString("en-IN");

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="lg:col-span-3 p-4 sm:p-5 rounded-xl border border-ink-100 relative overflow-hidden"
        >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                    <Activity size={13} className="text-accent" />
                    <div className="text-xs sm:text-sm font-semibold text-ink-700">Sales Overview</div>
                    <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-emerald-50 text-emerald-700">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> live
                    </span>
                </div>
                <div className="flex gap-1">
                    {["1D", "1W", "1M"].map((t, i) => (
                        <span key={t} className={`text-[9px] px-2 py-0.5 rounded-md ${i === 2 ? "bg-ink-950 text-white" : "text-ink-400"}`}>{t}</span>
                    ))}
                </div>
            </div>
            <div className="relative">
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20 sm:h-28" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="heroG" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#0066ff" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                    {/* Grid */}
                    {[30, 60, 90].map((g) => (
                        <line key={g} x1={pad} x2={w - pad} y1={g} y2={g} stroke="#e5e7eb" strokeDasharray="2 4" strokeWidth="0.4" />
                    ))}
                    <motion.path
                        d={areaPath}
                        fill="url(#heroG)"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 2.4 }}
                    />
                    <motion.path
                        d={linePath}
                        fill="none" stroke="url(#heroLine)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 2.2 }}
                    />
                    {/* Vertical guide */}
                    <motion.line
                        x1={cur.x} x2={cur.x} y1={pad} y2={h - pad}
                        stroke="#0066ff" strokeWidth="0.6" strokeDasharray="2 3"
                        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
                    />
                    {/* Traveling cursor dot */}
                    <motion.circle
                        cx={cur.x} cy={cur.y} r="3.5"
                        fill="#0066ff"
                        animate={{ cx: cur.x, cy: cur.y }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <motion.circle
                        cx={cur.x} cy={cur.y} r="7"
                        fill="none" stroke="#0066ff" strokeWidth="1"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        style={{ transformOrigin: `${cur.x}px ${cur.y}px` }}
                    />
                </svg>
                {/* Tooltip */}
                <motion.div
                    className="absolute pointer-events-none"
                    style={{ left: `${(cur.x / w) * 100}%`, top: `${(cur.y / h) * 100}%` }}
                    animate={{ x: "-50%", y: "-130%" }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="bg-ink-950 text-white text-[9px] px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
                        <span className="text-white/50">₹</span>
                        <span className="font-semibold tabular-nums">{value}</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ──────── AI Camera grid with detection bounding boxes ──────── */
const CAM_FEEDS = [
    { name: "Entrance", detect: { x: 18, y: 30, w: 32, h: 50, label: "Person", color: "#10b981" } },
    { name: "Checkout", detect: { x: 36, y: 22, w: 40, h: 56, label: "Cart", color: "#0066ff" } },
    { name: "Aisle 3", detect: { x: 28, y: 36, w: 30, h: 42, label: "Person", color: "#10b981" } },
    { name: "Stock", detect: { x: 14, y: 18, w: 60, h: 60, label: "Low", color: "#f59e0b" } },
];

function HeroCameraGrid() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="p-3 sm:p-4 rounded-xl border border-ink-100"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                    <Camera size={12} className="text-red-500" />
                    <span className="text-[10px] sm:text-xs font-semibold text-ink-700">AI Camera</span>
                    <span className="text-[9px] text-ink-400">· 4 zones</span>
                </div>
                <div className="flex items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded">
                    <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] sm:text-[9px] font-semibold text-red-600">REC</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
                {CAM_FEEDS.map((f, i) => (
                    <CamTile key={i} feed={f} delay={i * 0.4} />
                ))}
            </div>
        </motion.div>
    );
}

function CamTile({ feed, delay }: { feed: typeof CAM_FEEDS[number]; delay: number }) {
    return (
        <div className="aspect-video rounded-md bg-gradient-to-br from-ink-800 to-ink-950 relative overflow-hidden">
            {/* Subtle scanlines */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 3px)" }}
            />
            {/* Sweeping scan line */}
            <motion.div
                className="absolute inset-x-0 h-[1px] bg-emerald-400/50 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay }}
            />
            {/* Detection bounding box */}
            <motion.div
                className="absolute border-2 rounded-sm"
                style={{
                    left: `${feed.detect.x}%`,
                    top: `${feed.detect.y}%`,
                    width: `${feed.detect.w}%`,
                    height: `${feed.detect.h}%`,
                    borderColor: feed.detect.color,
                    boxShadow: `0 0 12px ${feed.detect.color}55`,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: [0, 1, 1, 0.3, 1], scale: [0.85, 1, 1, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay, times: [0, 0.15, 0.7, 0.85, 1] }}
            >
                {/* Corner ticks */}
                <span className="absolute -top-px -left-px w-1.5 h-1.5 border-t-2 border-l-2" style={{ borderColor: feed.detect.color }} />
                <span className="absolute -top-px -right-px w-1.5 h-1.5 border-t-2 border-r-2" style={{ borderColor: feed.detect.color }} />
                <span className="absolute -bottom-px -left-px w-1.5 h-1.5 border-b-2 border-l-2" style={{ borderColor: feed.detect.color }} />
                <span className="absolute -bottom-px -right-px w-1.5 h-1.5 border-b-2 border-r-2" style={{ borderColor: feed.detect.color }} />
                {/* Label */}
                <div
                    className="absolute -top-3 left-0 px-1 py-0 rounded-sm text-[6px] font-bold text-white whitespace-nowrap"
                    style={{ backgroundColor: feed.detect.color }}
                >
                    {feed.detect.label}
                </div>
            </motion.div>
            {/* Top-left REC label */}
            <div className="absolute top-1 left-1 flex items-center gap-0.5">
                <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[6px] text-white/70 font-medium tracking-wider">{feed.name}</span>
            </div>
            {/* Eye icon top-right (face detection indicator) */}
            <div className="absolute top-1 right-1">
                <Eye size={7} className="text-emerald-400/70" />
            </div>
        </div>
    );
}

/* ──────── Live POS feed (auto-rotating) ──────── */
const POS_TXNS = [
    { id: "#2478", amount: "₹2,211" },
    { id: "#2479", amount: "₹856" },
    { id: "#2480", amount: "₹4,320" },
    { id: "#2481", amount: "₹1,540" },
    { id: "#2482", amount: "₹899" },
    { id: "#2483", amount: "₹3,180" },
];

function HeroPOSFeed() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), 2400);
        return () => clearInterval(id);
    }, []);
    const visible = Array.from({ length: 3 }, (_, i) => {
        const idx = (tick + i) % POS_TXNS.length;
        return { ...POS_TXNS[idx], time: i === 0 ? "Just now" : i === 1 ? "3m ago" : "8m ago" };
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="p-3 sm:p-4 rounded-xl border border-ink-100"
        >
            <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                    <ShoppingCart size={12} className="text-accent" />
                    <span className="text-[10px] sm:text-xs font-semibold text-ink-700">Recent POS</span>
                </div>
                <span className="text-[8px] uppercase tracking-wider text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> live
                </span>
            </div>
            <div className="min-h-[88px]">
                <AnimatePresence mode="popLayout" initial={false}>
                    {visible.map((tx, i) => (
                        <motion.div
                            key={`${tick}-${tx.id}`}
                            layout
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.35, delay: i * 0.04 }}
                            className="flex items-center justify-between py-1.5 border-b border-ink-50 last:border-0"
                        >
                            <div className="flex items-center gap-2">
                                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${i === 0 ? "bg-emerald-100 text-emerald-600" : "bg-accent/10 text-accent"}`}>
                                    <Sparkles size={9} />
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-ink-600">{tx.id}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] sm:text-xs font-semibold text-ink-800 tabular-nums">{tx.amount}</div>
                                <div className="text-[8px] text-ink-400">{tx.time}</div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ──────── Trends mini-row (4 sparkline cards) ──────── */
const TRENDS = [
    { label: "Tea sales", value: "+42%", icon: TrendingUp, color: "#10b981", spark: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9], up: true },
    { label: "Foot traffic", value: "1.2K", icon: Users, color: "#0066ff", spark: [0.4, 0.5, 0.45, 0.6, 0.65, 0.7, 0.75, 0.8], up: true },
    { label: "Avg basket", value: "₹412", icon: ShoppingCart, color: "#8b5cf6", spark: [0.5, 0.55, 0.6, 0.65, 0.7, 0.7, 0.75, 0.8], up: true },
    { label: "Low stock", value: "4 items", icon: AlertTriangle, color: "#f59e0b", spark: [0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65], up: false },
];

function HeroTrends() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2.5"
        >
            {TRENDS.map((t, i) => {
                const Icon = t.icon;
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3.1 + i * 0.08 }}
                        whileHover={{ y: -2 }}
                        className="group relative p-2.5 sm:p-3 rounded-xl border border-ink-100 bg-white hover:shadow-md hover:shadow-ink-950/5 transition-shadow overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: `${t.color}15` }}>
                                <Icon size={11} style={{ color: t.color }} strokeWidth={2} />
                            </div>
                            <span className="text-[9px] uppercase tracking-wider text-ink-400 truncate">{t.label}</span>
                        </div>
                        <div className="flex items-end justify-between gap-2">
                            <div className="text-sm sm:text-base font-semibold tracking-tight tabular-nums" style={{ color: t.color }}>{t.value}</div>
                            <HeroSparkline points={t.spark} color={t.color} delay={3.2 + i * 0.08} />
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}

/* ──────── Count-up hook ──────── */
function useCountUp(target: number, duration = 1500, delayMs = 0) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let raf: number;
        const startAt = performance.now() + delayMs;
        const step = (now: number) => {
            const t = now - startAt;
            if (t < 0) {
                raf = requestAnimationFrame(step);
                return;
            }
            const p = Math.min(1, t / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, duration, delayMs]);
    return value;
}