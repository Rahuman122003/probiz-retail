"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AlertTriangle, User, ShoppingCart, Package, Activity } from "lucide-react";
import { WordReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1];

interface DetectionBox {
    label: string;
    confidence: number;
    color: string;
    top: string;
    left: string;
    w: string;
    h: string;
    delay: number;
}

interface Feed {
    zone: string;
    accent: "emerald" | "amber" | "sky" | "rose";
    boxes: DetectionBox[];
}

const FEEDS: Feed[] = [
    {
        zone: "Entrance",
        accent: "emerald",
        boxes: [
            { label: "Person", confidence: 98, color: "emerald", top: "20%", left: "35%", w: "20%", h: "55%", delay: 0.6 },
            { label: "Person", confidence: 94, color: "emerald", top: "30%", left: "65%", w: "18%", h: "45%", delay: 1.4 },
        ],
    },
    {
        zone: "Checkout",
        accent: "sky",
        boxes: [
            { label: "Cart", confidence: 99, color: "sky", top: "45%", left: "20%", w: "30%", h: "40%", delay: 0.9 },
            { label: "Item", confidence: 91, color: "sky", top: "25%", left: "60%", w: "22%", h: "30%", delay: 1.6 },
        ],
    },
    {
        zone: "Aisle 3",
        accent: "amber",
        boxes: [
            { label: "Suspicious", confidence: 87, color: "amber", top: "30%", left: "40%", w: "25%", h: "50%", delay: 1.0 },
        ],
    },
    {
        zone: "Stockroom",
        accent: "rose",
        boxes: [
            { label: "Motion", confidence: 76, color: "rose", top: "35%", left: "30%", w: "40%", h: "45%", delay: 0.7 },
        ],
    },
];

const COLOR_MAP: Record<string, { border: string; bg: string; text: string }> = {
    emerald: { border: "border-emerald-400/70", bg: "bg-emerald-400/10", text: "text-emerald-300" },
    sky: { border: "border-sky-400/70", bg: "bg-sky-400/10", text: "text-sky-300" },
    amber: { border: "border-amber-400/70", bg: "bg-amber-400/10", text: "text-amber-300" },
    rose: { border: "border-rose-400/70", bg: "bg-rose-400/10", text: "text-rose-300" },
};

export default function AICameraShowcase() {
    return (
        <section className="relative py-20 sm:py-32 md:py-48 bg-ink-950 text-white overflow-hidden">
            <div className="noise opacity-[0.04]" />
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
            }} />

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -top-40 -left-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full opacity-20 blur-3xl"
                style={{ background: "conic-gradient(from 0deg, #ef4444, #f59e0b, #ef4444)" }}
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Text */}
                    <div>
                        <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-4 sm:mb-6">— AI Security</div>
                        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-semibold tracking-ultra leading-[0.92]">
                            <WordReveal text="AI cameras" />
                            <br />
                            <span className="italic font-light text-gradient-accent"><WordReveal text="that never blink." delay={0.3} /></span>
                        </h2>
                        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-white/50 font-light tracking-tight max-w-md">
                            Prevent theft before it happens. Our AI watches every aisle, every checkout, every second — alerting you in real-time.
                        </p>
                        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 sm:gap-6 max-w-sm">
                            {[
                                { val: "99.7%", label: "Accuracy" },
                                { val: "< 2s", label: "Response" },
                                { val: "24/7", label: "Monitoring" },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                                >
                                    <div className="text-xl sm:text-2xl font-semibold tracking-tight text-gradient-accent">{s.val}</div>
                                    <div className="text-[10px] text-white/30 mt-1">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="mt-8 sm:mt-10"
                        >
                            <Magnetic>
                                <Link href="/ai-camera" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-ink-950 text-sm font-medium hover:bg-white/90 transition-colors">
                                    Explore AI Camera
                                    <span>→</span>
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </div>

                    {/* Right — Mini Camera Grid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            {FEEDS.map((feed, i) => (
                                <CameraFeed key={feed.zone} feed={feed} index={i} />
                            ))}
                        </div>

                        {/* Live event log */}
                        <EventLog />

                        {/* Floating alert */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2, duration: 0.8, ease }}
                            className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 glass-dark rounded-xl p-3 sm:p-4 max-w-[200px] sm:max-w-[240px] shadow-2xl"
                        >
                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="relative flex w-2 h-2">
                                        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
                                        <span className="relative inline-flex w-2 h-2 rounded-full bg-amber-400" />
                                    </span>
                                    <AlertTriangle size={12} className="text-amber-400" />
                                    <span className="text-[10px] font-semibold text-white/80">Alert</span>
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-white/60 leading-snug">Suspicious activity detected at <span className="text-amber-400">Entrance</span></div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function CameraFeed({ feed, index }: { feed: Feed; index: number }) {
    return (
        <div className="relative aspect-video rounded-xl bg-ink-900 border border-white/5 overflow-hidden group">
            {/* Animated noise pattern */}
            <motion.div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "3px 3px",
                }}
                animate={{ backgroundPosition: ["0 0", "3px 3px"] }}
                transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
            />

            {/* Scan line sweep */}
            <motion.div
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3 + index * 0.7, repeat: Infinity, ease: "linear" }}
            />

            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />

            {/* Crosshair corner brackets */}
            {["top-1.5 left-1.5", "top-1.5 right-1.5", "bottom-1.5 left-1.5", "bottom-1.5 right-1.5"].map((pos, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${pos} w-2.5 h-2.5 border-white/30`}
                    style={{
                        borderTopWidth: pos.includes("top") ? 1 : 0,
                        borderBottomWidth: pos.includes("bottom") ? 1 : 0,
                        borderLeftWidth: pos.includes("left") ? 1 : 0,
                        borderRightWidth: pos.includes("right") ? 1 : 0,
                    }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
            ))}

            {/* LIVE badge with ping */}
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded">
                <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-red-500" />
                </span>
                <span className="text-[8px] font-semibold text-white/80 tracking-wider">LIVE</span>
            </div>

            {/* Timestamp */}
            <Timestamp />

            <div className="absolute bottom-2 left-2 text-[9px] text-white/40 tracking-wide">{feed.zone}</div>

            {/* AI detection boxes */}
            {feed.boxes.map((b, i) => (
                <DetectionBoxAnim key={i} box={b} />
            ))}
        </div>
    );
}

function DetectionBoxAnim({ box }: { box: DetectionBox }) {
    const c = COLOR_MAP[box.color];
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: box.delay, duration: 0.5, ease }}
            className={`absolute border ${c.border} ${c.bg} rounded-sm`}
            style={{ top: box.top, left: box.left, width: box.w, height: box.h }}
        >
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -top-4 left-0 flex items-center gap-1 px-1 py-0.5 rounded-sm bg-black/70 ${c.text} text-[7px] font-semibold whitespace-nowrap`}
            >
                <span className="w-1 h-1 rounded-full bg-current" />
                {box.label} · {box.confidence}%
            </motion.div>
        </motion.div>
    );
}

function Timestamp() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const fmt = () => {
            const d = new Date();
            const pad = (n: number) => String(n).padStart(2, "0");
            setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
        };
        fmt();
        const t = setInterval(fmt, 1000);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="absolute top-2 right-2 text-[8px] font-mono text-white/50 tabular-nums">{time}</div>
    );
}

const EVENTS = [
    { icon: User, text: "Person detected at Entrance", color: "text-emerald-300" },
    { icon: ShoppingCart, text: "Cart abandoned at Aisle 3", color: "text-amber-300" },
    { icon: Activity, text: "High traffic at Checkout", color: "text-sky-300" },
    { icon: Package, text: "Stock movement in Stockroom", color: "text-rose-300" },
    { icon: AlertTriangle, text: "Loitering flagged · Aisle 3", color: "text-amber-300" },
    { icon: User, text: "Face matched · returning customer", color: "text-emerald-300" },
];

function EventLog() {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIdx((i) => (i + 1) % EVENTS.length), 2400);
        return () => clearInterval(t);
    }, []);
    const e = EVENTS[idx];
    const Icon = e.icon;
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 0.8, ease }}
            className="absolute -top-4 -right-2 sm:-top-5 sm:-right-5 glass-dark rounded-xl px-3 py-2.5 shadow-2xl min-w-[200px]"
        >
            <div className="flex items-center gap-1.5 mb-1.5">
                <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[9px] font-semibold text-white/70 tracking-widest uppercase">Live Events</span>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-2"
                >
                    <Icon size={12} className={e.color} />
                    <span className="text-[10px] sm:text-[11px] text-white/80 leading-snug">{e.text}</span>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
