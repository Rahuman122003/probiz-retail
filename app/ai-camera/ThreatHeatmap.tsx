"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, ShieldCheck, Activity } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Hotspots over the floor plan (percent coords). */
const HOTSPOTS = [
    { top: "30%", left: "12%", size: 160, color: "rgba(239,68,68,0.45)", label: "Entrance", risk: "High", risk_color: "text-red-400", ring: "border-red-400/60" },
    { top: "55%", left: "42%", size: 200, color: "rgba(245,158,11,0.40)", label: "Electronics", risk: "Medium", risk_color: "text-amber-300", ring: "border-amber-400/60" },
    { top: "70%", left: "78%", size: 150, color: "rgba(239,68,68,0.50)", label: "Checkout", risk: "High", risk_color: "text-red-400", ring: "border-red-400/60" },
    { top: "30%", left: "70%", size: 110, color: "rgba(59,130,246,0.30)", label: "Apparel", risk: "Low", risk_color: "text-sky-300", ring: "border-sky-400/40" },
];

/* Pre-defined walking paths across the store (% based, keyframed). */
const PEOPLE = [
    { color: "#10b981", dur: 16, delay: 0,   path: { left: ["10%", "25%", "45%", "65%", "82%"], top: ["35%", "40%", "55%", "65%", "70%"] } },
    { color: "#0ea5e9", dur: 18, delay: 1.5, path: { left: ["12%", "30%", "50%", "70%", "85%"], top: ["32%", "30%", "45%", "55%", "70%"] } },
    { color: "#f59e0b", dur: 22, delay: 3,   path: { left: ["15%", "40%", "55%", "70%", "85%"], top: ["38%", "60%", "55%", "60%", "72%"] } },
    { color: "#ef4444", dur: 14, delay: 0.8, path: { left: ["8%", "20%", "35%", "50%", "78%"],  top: ["40%", "55%", "60%", "60%", "70%"] } },
    { color: "#a855f7", dur: 20, delay: 2.2, path: { left: ["13%", "28%", "42%", "55%", "75%"], top: ["33%", "33%", "32%", "45%", "70%"] } },
];

export default function ThreatHeatmap() {
    return (
        <section className="relative py-16 sm:py-24 bg-ink-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-4 sm:mb-6">— Threat Analysis</div>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-white mb-12 sm:mb-16">
                    Know your <span className="italic font-light text-gradient-accent">hotspots.</span>
                </h2>

                {/* Live counters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    <CounterTile icon={Users} label="People in store" target={47} accent="text-emerald-300" />
                    <CounterTile icon={Activity} label="Live tracks" target={12} accent="text-sky-300" />
                    <CounterTile icon={AlertTriangle} label="Active alerts" target={3} accent="text-amber-300" />
                    <CounterTile icon={ShieldCheck} label="Resolved · today" target={128} accent="text-violet-300" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease }}
                    className="relative aspect-[16/9] sm:aspect-[2/1] rounded-2xl sm:rounded-3xl border border-white/10 bg-ink-900/50 overflow-hidden"
                >
                    {/* Floor plan grid */}
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }} />

                    {/* SVG floor plan */}
                    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                        {/* Outer wall */}
                        <rect x="2" y="2" width="196" height="96" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" rx="1" />
                        {/* Entrance gap */}
                        <rect x="6" y="35" width="6" height="20" fill="#050506" />
                        <line x1="6" y1="35" x2="12" y2="35" stroke="rgba(16,185,129,0.6)" strokeWidth="0.4" />
                        <line x1="6" y1="55" x2="12" y2="55" stroke="rgba(16,185,129,0.6)" strokeWidth="0.4" />
                        {/* Aisles (shelves) */}
                        {[
                            { x: 35, y: 20, w: 50, h: 4 },
                            { x: 35, y: 35, w: 50, h: 4 },
                            { x: 35, y: 50, w: 50, h: 4 },
                            { x: 35, y: 65, w: 50, h: 4 },
                            { x: 95, y: 22, w: 4, h: 50 },
                            { x: 115, y: 22, w: 4, h: 50 },
                            { x: 135, y: 22, w: 4, h: 50 },
                        ].map((s, i) => (
                            <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.2" rx="0.5" />
                        ))}
                        {/* Checkout counters */}
                        <rect x="155" y="62" width="32" height="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.3" rx="0.5" />
                        <rect x="155" y="72" width="32" height="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.3" rx="0.5" />
                        <text x="171" y="65.5" fill="rgba(255,255,255,0.35)" fontSize="2.6" textAnchor="middle">CHECKOUT</text>
                        {/* Entrance label */}
                        <text x="9" y="46" fill="rgba(16,185,129,0.7)" fontSize="2.6" textAnchor="middle" transform="rotate(-90 9 46)">ENTRY</text>
                    </svg>

                    {/* Radar sweep */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 origin-left h-[1px] w-[55%] -translate-y-1/2 z-[5]"
                        style={{ background: "linear-gradient(to right, rgba(0,200,255,0.55), transparent)" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15 z-[5]"
                        style={{ width: "55%", height: "75%" }}
                        animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Heat blobs (hotspots) */}
                    {HOTSPOTS.map((spot, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.4 + i * 0.18, ease }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                            style={{ top: spot.top, left: spot.left }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                                className="rounded-full blur-2xl"
                                style={{ width: spot.size, height: spot.size, background: `radial-gradient(circle, ${spot.color}, transparent 70%)` }}
                            />
                            {/* Pulsing ring */}
                            <motion.div
                                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border ${spot.ring}`}
                            />
                            {/* Center dot */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                            {/* Always-visible label */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-3 sm:translate-y-4 whitespace-nowrap bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
                                <div className="text-[9px] sm:text-[10px] font-semibold text-white">{spot.label}</div>
                                <div className={`text-[8px] sm:text-[9px] ${spot.risk_color}`}>Risk · {spot.risk}</div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Walking people */}
                    {PEOPLE.map((p, i) => (
                        <Person key={i} {...p} />
                    ))}

                    {/* Legend */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center gap-4 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg z-20">
                        {[
                            { color: "bg-red-500", label: "High Risk" },
                            { color: "bg-amber-500", label: "Medium" },
                            { color: "bg-blue-500", label: "Low" },
                        ].map((l, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${l.color}`} />
                                <span className="text-[9px] sm:text-[10px] text-white/60">{l.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tracking badge */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                        <span className="relative flex w-1.5 h-1.5">
                            <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-white/80 tracking-wider">TRACKING · 5</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Person({ color, dur, delay, path }: { color: string; dur: number; delay: number; path: { left: string[]; top: string[] } }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 1, 1, 1, 0],
                left: path.left,
                top: path.top,
            }}
            transition={{
                duration: dur,
                repeat: Infinity,
                ease: "linear",
                delay,
                times: [0, 0.05, 0.5, 0.95, 1],
            }}
            className="absolute z-[15] -translate-x-1/2 -translate-y-1/2"
        >
            {/* Trail glow */}
            <motion.span
                className="absolute inset-0 rounded-full blur-md"
                style={{ backgroundColor: color, opacity: 0.6 }}
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Body */}
            <span
                className="relative block w-2 h-2 rounded-full ring-2 ring-white/20"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
            />
        </motion.div>
    );
}

function CounterTile({ icon: Icon, label, target, accent }: { icon: typeof Users; label: string; target: number; accent: string }) {
    const [n, setN] = useState(0);
    useEffect(() => {
        const dur = 1400;
        const start = performance.now();
        let raf = 0;
        const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(target * eased));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target]);
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-3 sm:p-4 overflow-hidden"
        >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 mb-2">
                <Icon size={12} className={accent} />
                {label}
            </div>
            <div className={`font-display text-2xl sm:text-3xl font-semibold tracking-tight ${accent} tabular-nums`}>{n}</div>
        </motion.div>
    );
}
