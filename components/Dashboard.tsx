"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
    LayoutDashboard, FileText, Boxes, Users, BarChart3, Sparkles,
    TrendingUp, TrendingDown, ArrowUpRight, Bell, Search, Plus, Wallet, ShoppingBag,
} from "lucide-react";
import Image from "next/image";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Stats with mini sparkline points (0..1 normalised) */
const STATS = [
    { l: "Revenue", v: "₹12.4L", raw: 1240000, c: "+18%", up: true, icon: Wallet, accent: "text-emerald-600", bg: "bg-emerald-50", spark: [0.3, 0.45, 0.4, 0.6, 0.55, 0.7, 0.85, 0.95] },
    { l: "Invoices", v: "342", raw: 342, c: "+12%", up: true, icon: FileText, accent: "text-sky-600", bg: "bg-sky-50", spark: [0.4, 0.5, 0.45, 0.6, 0.7, 0.65, 0.8, 0.9] },
    { l: "Customers", v: "1,284", raw: 1284, c: "+24%", up: true, icon: Users, accent: "text-violet-600", bg: "bg-violet-50", spark: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 0.95] },
    { l: "Stock value", v: "₹8.2L", raw: 820000, c: "−3%", up: false, icon: ShoppingBag, accent: "text-rose-600", bg: "bg-rose-50", spark: [0.7, 0.65, 0.6, 0.55, 0.6, 0.5, 0.45, 0.5] },
];

const NAV = [
    { i: LayoutDashboard, l: "Dashboard" },
    { i: FileText, l: "Invoices", count: 12 },
    { i: Boxes, l: "Inventory" },
    { i: Users, l: "Customers" },
    { i: BarChart3, l: "Reports" },
    { i: Sparkles, l: "AI Studio", glow: true },
];

const CHART_DAYS = 30;
const CHART_SERIES = Array.from({ length: CHART_DAYS }, (_, i) => {
    const base = 30 + Math.sin(i * 0.55) * 18 + Math.cos(i * 0.3) * 10;
    return Math.max(8, Math.min(110, base + i * 1.6 + (i % 5 === 0 ? 8 : 0)));
});
function chartPath(values: number[], w = 600, h = 140, pad = 6) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const xStep = (w - pad * 2) / (values.length - 1);
    return values.map((v, i) => {
        const x = pad + i * xStep;
        const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
}
const LINE_PATH = chartPath(CHART_SERIES);
const AREA_PATH = `${LINE_PATH} L594,134 L6,134 Z`;

const CATEGORIES = [
    { name: "Groceries", val: 38, color: "#0066ff" },
    { name: "Apparel", val: 24, color: "#8b5cf6" },
    { name: "Electronics", val: 18, color: "#ec4899" },
    { name: "Beauty", val: 12, color: "#10b981" },
    { name: "Other", val: 8, color: "#f59e0b" },
];

const TOP_PRODUCTS = [
    { name: "Basmati Rice 5kg", sold: 187, pct: 92 },
    { name: "Olive Oil 1L", sold: 142, pct: 76 },
    { name: "Organic Tea 250g", sold: 118, pct: 64 },
    { name: "Whole Wheat Bread", sold: 96, pct: 52 },
];

const ACTIVITY = [
    { who: "Priya S.", what: "paid invoice INV-2410", amt: "₹4,820", color: "bg-emerald-100 text-emerald-700" },
    { who: "Stock Alert", what: "Low: Olive Oil 1L (4 left)", amt: "Reorder", color: "bg-amber-100 text-amber-700" },
    { who: "Probiz AI", what: "Forecast updated for Aug", amt: "+12%", color: "bg-violet-100 text-violet-700" },
    { who: "Rajesh K.", what: "new GST invoice created", amt: "₹12,400", color: "bg-sky-100 text-sky-700" },
    { who: "Refund", what: "processed for INV-2387", amt: "−₹890", color: "bg-rose-100 text-rose-700" },
];

export default function Dashboard() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 1.04]);
    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.85]);

    return (
        <section ref={ref} className="relative py-20 sm:py-32 bg-ink-50 overflow-hidden">
            {/* Ambient glow */}
            <motion.div
                className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 text-center mb-10 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] font-medium text-ink-600 mb-5">
                    <Image src="/logo1.png" alt="" width={389} height={340} className="w-3.5 h-3.5 object-contain" />
                    Live preview
                </div>
                <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-semibold tracking-ultra leading-[0.95]">
                    One dashboard.<br />
                    <span className="text-ink-400 font-light italic">Infinite clarity.</span>
                </h2>
                <p className="mt-5 sm:mt-6 text-base sm:text-lg text-ink-400 font-light max-w-xl mx-auto">
                    Every metric that matters. Live, beautiful, and powered by Probiz AI.
                </p>
            </div>

            <motion.div style={{ scale, y, opacity }} className="relative max-w-7xl mx-auto px-5 sm:px-6">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] border border-ink-200 bg-white">
                    {/* Browser chrome */}
                    <div className="bg-ink-50 px-4 sm:px-6 py-3 flex items-center gap-3 border-b border-ink-100">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 max-w-md mx-auto">
                            <div className="text-[10px] sm:text-xs text-ink-400 text-center bg-white border border-ink-100 rounded-md py-1 px-3">probiz.app/dashboard</div>
                        </div>
                        <div className="flex items-center gap-2 text-ink-400">
                            <Search size={12} />
                            <Bell size={12} />
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex gap-4 sm:gap-6">
                            {/* Sidebar */}
                            <aside className="hidden lg:block w-44 flex-shrink-0">
                                <div className="flex items-center gap-2 mb-5 px-2">
                                    <Image src="/logo1.png" alt="" width={389} height={340} className="w-5 h-5 object-contain" />
                                    <span className="font-quicksand font-bold text-sm tracking-tight leading-none">
                                        <span style={{ color: "#1F9CE8" }}>Probiz</span>
                                        <span className="ml-0.5" style={{ color: "#7C3AED" }}>Retail</span>
                                    </span>
                                </div>
                                <nav className="space-y-1">
                                    {NAV.map((it, i) => {
                                        const Icon = it.i;
                                        const active = i === 0;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -8 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease }}
                                                className={`relative flex items-center gap-2.5 text-[12px] px-3 py-2 rounded-lg ${
                                                    active ? "bg-ink-950 text-white" : "text-ink-500 hover:bg-ink-50"
                                                }`}
                                            >
                                                <Icon size={13} strokeWidth={1.7} className={it.glow ? "text-violet-500" : ""} />
                                                <span className="flex-1">{it.l}</span>
                                                {it.count && (
                                                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-accent text-white">{it.count}</span>
                                                )}
                                                {it.glow && (
                                                    <span className="relative flex w-1.5 h-1.5">
                                                        <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-75" />
                                                        <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-violet-500" />
                                                    </span>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </nav>

                                {/* AI Insight card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.6, ease }}
                                    className="relative mt-6 rounded-xl p-3 overflow-hidden border border-violet-200/60"
                                    style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,102,255,0.08))" }}
                                >
                                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-violet-700 mb-1.5">
                                        <Sparkles size={11} />
                                        AI INSIGHT
                                    </div>
                                    <Typewriter text="Tea sales spike on rainy days. Restock by Fri." />
                                </motion.div>
                            </aside>

                            {/* Main */}
                            <div className="flex-1 min-w-0 space-y-4 sm:space-y-5">
                                {/* Header row */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold tracking-tight">Good evening, Rajesh</h3>
                                        <p className="text-[11px] text-ink-400">Here's what's happening across your stores today.</p>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                                            <span className="relative flex w-1.5 h-1.5">
                                                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                                                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            </span>
                                            <span className="text-[10px] font-medium text-emerald-700">All systems online</span>
                                        </div>
                                        <button className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-ink-950 text-white">
                                            <Plus size={11} /> New invoice
                                        </button>
                                    </div>
                                </div>

                                {/* Stat tiles */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                    {STATS.map((s, i) => (
                                        <StatCard key={i} stat={s} index={i} />
                                    ))}
                                </div>

                                {/* Chart + Donut row */}
                                <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
                                    <SalesChart />
                                    <CategoryDonut />
                                </div>

                                {/* Top products + Activity */}
                                <div className="grid lg:grid-cols-2 gap-3 sm:gap-4">
                                    <TopProducts />
                                    <ActivityFeed />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating notification (decoration) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6, ease }}
                    className="hidden md:flex absolute -right-2 lg:right-4 -top-3 items-center gap-2.5 bg-white rounded-2xl shadow-xl shadow-ink-950/15 border border-ink-100 px-3 py-2.5 z-10"
                >
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white">
                            <Sparkles size={13} />
                        </div>
                        <div>
                            <div className="text-[10px] font-semibold">Sales hit ₹50K today</div>
                            <div className="text-[9px] text-ink-400">+18% vs yesterday</div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

/* ─────────── Stat Card with count-up + sparkline ─────────── */
function StatCard({ stat, index }: { stat: typeof STATS[number]; index: number }) {
    const Icon = stat.icon;
    const display = useCountUp(stat.raw, 1200);
    const formatted = stat.l === "Revenue" ? `₹${(display / 100000).toFixed(1)}L`
        : stat.l === "Stock value" ? `₹${(display / 100000).toFixed(1)}L`
        : display.toLocaleString("en-IN");

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.06, ease }}
            className="relative p-3 sm:p-4 rounded-xl border border-ink-100 bg-white overflow-hidden group"
        >
            <div className="flex items-start justify-between mb-2">
                <div className={`w-7 h-7 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon size={13} className={stat.accent} strokeWidth={1.8} />
                </div>
                <div className={`flex items-center gap-0.5 text-[10px] font-semibold ${stat.up ? "text-emerald-600" : "text-rose-600"}`}>
                    {stat.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {stat.c}
                </div>
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-400">{stat.l}</div>
            <div className="text-lg sm:text-xl font-semibold tracking-tight mt-0.5 tabular-nums">{formatted}</div>
            <Sparkline points={stat.spark} color={stat.up ? "#10b981" : "#f43f5e"} />
        </motion.div>
    );
}

function Sparkline({ points, color }: { points: number[]; color: string }) {
    const w = 100, h = 22;
    const xStep = w / (points.length - 1);
    const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${(i * xStep).toFixed(1)},${(h - p * h).toFixed(1)}`).join(" ");
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-5 mt-2" preserveAspectRatio="none">
            <motion.path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease }}
            />
        </svg>
    );
}

/* ─────────── Sales Chart ─────────── */
function SalesChart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="lg:col-span-2 p-4 sm:p-5 rounded-xl border border-ink-100 bg-white"
        >
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink-400">Sales · Last 30 days</div>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl sm:text-2xl font-semibold tracking-tight">₹4.82L</span>
                        <span className="text-[10px] font-semibold text-emerald-600 inline-flex items-center gap-0.5">
                            <ArrowUpRight size={11} /> +24.6%
                        </span>
                    </div>
                </div>
                <div className="flex gap-1 text-[10px]">
                    {["7d", "30d", "90d"].map((p, i) => (
                        <span key={p} className={`px-2 py-0.5 rounded-md ${i === 1 ? "bg-ink-950 text-white" : "text-ink-400 hover:bg-ink-50"}`}>{p}</span>
                    ))}
                </div>
            </div>
            <div className="relative">
                <svg viewBox="0 0 600 140" className="w-full h-32 sm:h-40" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#0066ff" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>

                    {/* Grid */}
                    {[34, 68, 102].map((g) => (
                        <line key={g} x1="6" x2="594" y1={g} y2={g} stroke="#e5e7eb" strokeDasharray="2 4" strokeWidth="0.5" />
                    ))}

                    {/* Area */}
                    <motion.path
                        d={AREA_PATH}
                        fill="url(#chartFill)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                    />
                    {/* Line */}
                    <motion.path
                        d={LINE_PATH}
                        fill="none"
                        stroke="url(#chartLine)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.2, ease }}
                    />

                    {/* End-point pulsing dot */}
                    <motion.circle
                        cx="594"
                        cy={(LINE_PATH.split("L").pop() ?? "0,20").split(",")[1]}
                        r="3.5"
                        fill="#0066ff"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2.2 }}
                    />
                    <motion.circle
                        cx="594"
                        cy={(LINE_PATH.split("L").pop() ?? "0,20").split(",")[1]}
                        r="3.5"
                        fill="#0066ff"
                        animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 2.4 }}
                    />
                </svg>

                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.4, duration: 0.5 }}
                    className="absolute right-2 top-2 bg-ink-950 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-lg"
                >
                    <div className="text-white/60 text-[8px] uppercase tracking-wider">Today</div>
                    <div className="font-semibold tabular-nums">₹52,840</div>
                    <span className="absolute -bottom-1 right-3 w-2 h-2 rotate-45 bg-ink-950" />
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ─────────── Category Donut ─────────── */
function CategoryDonut() {
    const r = 38, c = 50, total = CATEGORIES.reduce((s, x) => s + x.val, 0);
    const circ = 2 * Math.PI * r;
    let acc = 0;
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="p-4 sm:p-5 rounded-xl border border-ink-100 bg-white"
        >
            <div className="text-[10px] uppercase tracking-wider text-ink-400 mb-1">Categories</div>
            <div className="text-sm font-semibold tracking-tight mb-3">Sales mix</div>
            <div className="flex items-center gap-4">
                <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90 shrink-0">
                    <circle cx={c} cy={c} r={r} fill="none" stroke="#f3f4f6" strokeWidth="10" />
                    {CATEGORIES.map((cat, i) => {
                        const len = (cat.val / total) * circ;
                        const dash = `${len} ${circ - len}`;
                        const offset = -acc;
                        acc += len;
                        return (
                            <motion.circle
                                key={i}
                                cx={c} cy={c} r={r}
                                fill="none"
                                stroke={cat.color}
                                strokeWidth="10"
                                strokeDasharray={dash}
                                strokeDashoffset={offset}
                                strokeLinecap="butt"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease }}
                            />
                        );
                    })}
                </svg>
                <ul className="flex-1 space-y-1.5">
                    {CATEGORIES.map((cat, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: 6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.7 + i * 0.07 }}
                            className="flex items-center justify-between text-[10px]"
                        >
                            <span className="flex items-center gap-1.5 truncate">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                <span className="text-ink-700 truncate">{cat.name}</span>
                            </span>
                            <span className="font-semibold text-ink-900 tabular-nums">{cat.val}%</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

/* ─────────── Top Products ─────────── */
function TopProducts() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="p-4 sm:p-5 rounded-xl border border-ink-100 bg-white"
        >
            <div className="flex items-center justify-between mb-3">
                <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink-400">Top products</div>
                    <div className="text-sm font-semibold tracking-tight">This week</div>
                </div>
                <span className="text-[10px] text-accent font-medium">View all →</span>
            </div>
            <ul className="space-y-3">
                {TOP_PRODUCTS.map((p, i) => (
                    <li key={i}>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-ink-800 font-medium truncate pr-2">{p.name}</span>
                            <span className="text-ink-500 tabular-nums shrink-0">{p.sold} sold</span>
                        </div>
                        <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: "linear-gradient(90deg, #0066ff, #8b5cf6)" }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${p.pct}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.7 + i * 0.1, ease }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

/* ─────────── Activity Feed ─────────── */
function ActivityFeed() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick((x) => x + 1), 2400);
        return () => clearInterval(t);
    }, []);
    const visible = Array.from({ length: 4 }, (_, i) => ACTIVITY[(tick + i) % ACTIVITY.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="p-4 sm:p-5 rounded-xl border border-ink-100 bg-white"
        >
            <div className="flex items-center justify-between mb-3">
                <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink-400">Live activity</div>
                    <div className="text-sm font-semibold tracking-tight">Just now</div>
                </div>
                <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </span>
            </div>
            <ul className="space-y-2 min-h-[160px]">
                <AnimatePresence mode="popLayout" initial={false}>
                    {visible.map((a, i) => (
                        <motion.li
                            key={`${tick}-${i}`}
                            layout
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.35, delay: i * 0.04 }}
                            className="flex items-center justify-between gap-3 text-[11px]"
                        >
                            <div className="min-w-0 flex-1">
                                <span className="font-semibold text-ink-900">{a.who}</span>{" "}
                                <span className="text-ink-500">{a.what}</span>
                            </div>
                            <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-md ${a.color}`}>{a.amt}</span>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </motion.div>
    );
}

/* ─────────── Hooks ─────────── */
function useCountUp(target: number, duration = 1200) {
    const [value, setValue] = useState(0);
    const [started, setStarted] = useState(false);
    const elRef = useRef<{ done: boolean }>({ done: false });

    useEffect(() => {
        if (started) return;
        const obs = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting && !elRef.current.done) {
                    elRef.current.done = true;
                    setStarted(true);
                    const start = performance.now();
                    const step = (t: number) => {
                        const p = Math.min(1, (t - start) / duration);
                        const eased = 1 - Math.pow(1 - p, 3);
                        setValue(Math.round(target * eased));
                        if (p < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                    obs.disconnect();
                }
            }
        });
        // Observe document body since hook isn't tied to a node — start when the section is roughly in view
        obs.observe(document.body);
        // Failsafe: start on next tick anyway after a delay
        const fail = setTimeout(() => {
            if (!elRef.current.done) {
                elRef.current.done = true;
                setStarted(true);
                const start = performance.now();
                const step = (t: number) => {
                    const p = Math.min(1, (t - start) / duration);
                    const eased = 1 - Math.pow(1 - p, 3);
                    setValue(Math.round(target * eased));
                    if (p < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            }
        }, 800);
        return () => { obs.disconnect(); clearTimeout(fail); };
    }, [target, duration, started]);

    return value;
}

function Typewriter({ text }: { text: string }) {
    const [shown, setShown] = useState("");
    useEffect(() => {
        let i = 0;
        const t = setInterval(() => {
            i++;
            setShown(text.slice(0, i));
            if (i >= text.length) clearInterval(t);
        }, 28);
        return () => clearInterval(t);
    }, [text]);
    return (
        <div className="text-[11px] text-ink-700 leading-snug min-h-[2.5rem]">
            {shown}
            <span className="inline-block w-[1.5px] h-[10px] bg-violet-600 align-middle ml-0.5 animate-pulse" />
        </div>
    );
}
