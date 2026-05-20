"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Brain, Moon, Cloud, Store, AlertTriangle, Activity, Camera, Wifi, User, ShoppingCart, Package, ArrowUp, HardDrive } from "lucide-react";
import { WordReveal } from "@/components/ui/TextReveal";
import LearnMoreModal, { LearnMoreItem } from "@/components/ui/LearnMoreModal";
import ThreatHeatmap from "./ThreatHeatmap";

const ease = [0.22, 1, 0.36, 1];

const alerts = [
    { severity: "critical", text: "Unscanned item detected — Checkout 2", time: "Just now", color: "bg-red-500" },
    { severity: "warning", text: "Suspicious loitering — Aisle 3", time: "2m ago", color: "bg-amber-500" },
    { severity: "info", text: "Unknown face detected — Entrance", time: "5m ago", color: "bg-blue-500" },
    { severity: "warning", text: "Unusual bag activity — Electronics", time: "8m ago", color: "bg-amber-500" },
];

const stats = [
    { metric: "99.7%", label: "Detection accuracy", title: "Precision" },
    { metric: "< 2s", label: "Alert response time", title: "Speed" },
    { metric: "₹18L", label: "Theft prevented / month", title: "Savings" },
    { metric: "24/7", label: "Always watching", title: "Uptime" },
];

type CamFeature = LearnMoreItem & { desc: string };

const features: CamFeature[] = [
    {
        icon: AlertTriangle,
        title: "Smart Alerts",
        desc: "Instant push notifications to your phone and dashboard when suspicious activity is detected.",
        tagline: "Notified before the loss.",
        long: "Probiz AI Camera fires real-time alerts the instant something looks off — reaching your phone, dashboard, and security team in under 2 seconds with full context and a one-tap clip.",
        highlights: [
            "Sub-2-second alert latency",
            "Push, SMS, WhatsApp & email channels",
            "Severity-tiered routing & escalation",
            "One-tap clip preview from the alert",
            "Auto-mute false positives over time",
        ],
    },
    {
        icon: Eye,
        title: "Facial Recognition",
        desc: "Identify known offenders and VIP customers. Maintain a watchlist synced across all your stores.",
        tagline: "Faces, instantly understood.",
        long: "Recognise repeat offenders, blacklisted individuals, and your most valuable customers the moment they walk in — with privacy-respecting on-prem matching across every store.",
        highlights: [
            "Multi-store synced watchlists",
            "VIP customer recognition & greetings",
            "Repeat-offender flagging",
            "On-device matching, encrypted at rest",
            "Audit trail for every recognition event",
        ],
    },
    {
        icon: Brain,
        title: "Behavior Analysis",
        desc: "AI learns normal patterns and flags anomalies — loitering, concealment, sweethearting, and more.",
        tagline: "Patterns that betray intent.",
        long: "Our deep-learning model studies your store’s rhythms and surfaces the unusual — loitering near electronics, item concealment, sweethearting at checkout, and more — long before a human notices.",
        highlights: [
            "Loitering & dwell-time detection",
            "Concealment & bag-stuffing alerts",
            "Sweethearting at checkout flagging",
            "Crowd density & queue analytics",
            "Per-zone behaviour baselines",
        ],
    },
    {
        icon: Moon,
        title: "Night Vision AI",
        desc: "Crystal-clear detection even in low-light conditions. Our models are trained for all environments.",
        tagline: "Darkness, no obstacle.",
        long: "Models trained on millions of low-light frames keep detection accurate from dim backrooms to fully unlit aisles — no extra IR hardware required.",
        highlights: [
            "Works on standard CMOS sensors",
            "Auto noise-reduction & contrast boost",
            "IR camera support out-of-the-box",
            "Same accuracy day and night",
            "Adaptive to glare, headlights & flicker",
        ],
    },
    {
        icon: Cloud,
        title: "Cloud Recording — No DVR",
        desc: "Every frame streams straight to the Probiz Cloud. No tapes, no boxes, no missing footage.",
        tagline: "Zero hardware. Infinite memory.",
        long: "Throw away the DVR. Every camera streams encrypted footage directly to the Probiz Cloud, indexed by AI in real-time. Search by event, person, zone or timestamp — and jump to the exact frame in seconds, from any device.",
        highlights: [
            "Zero on-prem hardware — no DVR/NVR boxes",
            "Encrypted live upload · AES-256 at rest",
            "30-day rolling retention (extendable)",
            "AI-powered footage search by event",
            "Instant 4-camera grid replay from anywhere",
            "Export incident clips with one click",
        ],
    },
    {
        icon: Store,
        title: "Multi-Store Sync",
        desc: "Centralized monitoring across all locations. One dashboard, unlimited stores, zero blind spots.",
        tagline: "Every store. One pane of glass.",
        long: "Run a single command centre across every branch — unified watchlists, cross-store alerts, role-based access, and centralised reporting on the entire footprint.",
        highlights: [
            "Unlimited stores on one dashboard",
            "Cross-store watchlist syncing",
            "Role-based access & granular audit",
            "Aggregated incident analytics",
            "SSO & multi-region failover ready",
        ],
    },
];

const zones = ["Entrance", "Aisle 3", "Checkout", "Stockroom"];
const zoneColors = ["from-red-500/40", "from-amber-500/40", "from-blue-500/40", "from-emerald-500/40"];

const steps = [
    { icon: Camera, title: "Install Cameras", desc: "Works with any IP camera. Plug in and connect to Probiz in minutes." },
    { icon: Brain, title: "AI Learns Your Store", desc: "Our AI maps your layout, learns traffic patterns, and calibrates detection in 48 hours." },
    { icon: Shield, title: "Real-Time Protection", desc: "Get instant alerts, review footage, and track incidents — all from your Probiz dashboard." },
];

export default function AICameraContent() {
    const [active, setActive] = useState<number | null>(null);
    return (
        <>
            {/* ── Live Camera Grid ── */}
            <section className="relative py-16 sm:py-24 bg-ink-950 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }} />
                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-4 sm:mb-6">— Live Monitoring</div>
                    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-white mb-8 sm:mb-10">
                        <WordReveal text="Every angle." />{" "}
                        <span className="italic font-light text-gradient-accent"><WordReveal text="Every second." delay={0.3} /></span>
                    </h2>

                    {/* Cloud upload HUD */}
                    <CloudSyncHUD />

                    <div className="grid lg:grid-cols-3 gap-6 mt-6">
                        {/* Camera Grid */}
                        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                            {zones.map((zone, i) => (
                                <BigCameraFeed key={zone} zone={zone} index={i} bg={zoneColors[i]} />
                            ))}
                        </div>

                        {/* Alert Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease }}
                            className="rounded-xl sm:rounded-2xl border border-white/10 bg-ink-900/80 backdrop-blur-xl p-4 sm:p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                                    <Activity size={14} className="text-red-400" />
                                    Live Alerts
                                </div>
                                <div className="text-[10px] text-white/30 flex items-center gap-1">
                                    <Wifi size={10} /> Connected
                                </div>
                            </div>
                            <div className="space-y-3 flex-1">
                                {alerts.map((alert, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.8 + i * 0.15, ease }}
                                        className="p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-start gap-2.5">
                                            <div className="mt-0.5 relative">
                                                <span className={`block w-2 h-2 rounded-full ${alert.color}`} />
                                                {i === 0 && <span className={`absolute inset-0 w-2 h-2 rounded-full ${alert.color} animate-ping`} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[11px] sm:text-xs text-white/80 leading-snug">{alert.text}</div>
                                                <div className="text-[9px] sm:text-[10px] text-white/30 mt-1">{alert.time}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/5 text-center">
                                <span className="text-[11px] text-accent font-medium cursor-pointer hover:underline">View all alerts →</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Stats Row ── */}
            <section className="relative py-16 sm:py-24 bg-ink-950 border-t border-white/5 overflow-hidden">
                <div className="noise opacity-[0.04]" />
                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                                className="border-t border-white/10 pt-6"
                            >
                                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tightest text-gradient-accent">{s.metric}</div>
                                <div className="text-[10px] sm:text-xs text-white/40 mt-2">{s.label}</div>
                                <div className="text-sm sm:text-base font-medium text-white mt-3 sm:mt-4">{s.title}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Threat Heatmap ── */}
            <ThreatHeatmap />

            {/* ── Feature Grid ── */}
            <section className="relative py-16 sm:py-24 bg-ink-950 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="max-w-3xl mb-12 sm:mb-16">
                        <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-4 sm:mb-6">— Capabilities</div>
                        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-white">
                            <WordReveal text="Powered by" />{" "}
                            <span className="italic font-light text-gradient-accent"><WordReveal text="deep learning." delay={0.3} /></span>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <motion.button
                                    type="button"
                                    onClick={() => setActive(i)}
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.8, delay: i * 0.07, ease }}
                                    className="group relative bg-ink-950 p-6 sm:p-8 lg:p-10 overflow-hidden cursor-pointer text-left w-full"
                                >
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                        style={{ background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,102,255,0.08), transparent 40%)" }}
                                    />
                                    <div className="relative">
                                        <Icon size={24} strokeWidth={1.5} className="text-white mb-6 sm:mb-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-accent" />
                                        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-2 sm:mb-3">{f.title}</h3>
                                        <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                                        <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-[12px] font-medium text-white/40 group-hover:text-accent transition-colors">
                                            Learn more
                                            <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="relative py-16 sm:py-24 bg-ink-950 border-t border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="text-center mb-12 sm:mb-20">
                        <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-4 sm:mb-6">— Setup</div>
                        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-white">
                            <WordReveal text="Three steps to" />{" "}
                            <span className="italic font-light text-gradient-accent"><WordReveal text="total security." delay={0.3} /></span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 sm:gap-12 relative">
                        {/* Connecting line — desktop only */}
                        <div className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.15, ease }}
                                    className="text-center relative"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20"
                                    >
                                        <Icon size={24} strokeWidth={1.5} className="text-white" />
                                    </motion.div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Step {i + 1}</div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-2 sm:mb-3">{step.title}</h3>
                                    <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <LearnMoreModal
                item={active !== null ? features[active] : null}
                onClose={() => setActive(null)}
                theme="dark"
            />
        </>
    );
}

/* ── Mind-blowing live camera feed ── */
function BigCameraFeed({ zone, index, bg }: { zone: string; index: number; bg: string }) {
    const detectionPalettes = [
        { border: "border-emerald-400/70", bg: "bg-emerald-400/10", text: "text-emerald-300", dot: "bg-emerald-400" },
        { border: "border-amber-400/70", bg: "bg-amber-400/10", text: "text-amber-300", dot: "bg-amber-400" },
        { border: "border-sky-400/70", bg: "bg-sky-400/10", text: "text-sky-300", dot: "bg-sky-400" },
        { border: "border-rose-400/70", bg: "bg-rose-400/10", text: "text-rose-300", dot: "bg-rose-400" },
    ];
    const objects: Array<{ icon: typeof User; label: string; conf: number; top: string; left: string; w: string; h: string; pal: typeof detectionPalettes[number]; delay: number }>[] = [
        // Entrance
        [
            { icon: User, label: "Person", conf: 98, top: "22%", left: "32%", w: "22%", h: "55%", pal: detectionPalettes[0], delay: 0.6 },
            { icon: User, label: "Person", conf: 93, top: "30%", left: "62%", w: "20%", h: "48%", pal: detectionPalettes[0], delay: 1.4 },
        ],
        // Aisle 3
        [
            { icon: User, label: "Loitering", conf: 87, top: "30%", left: "38%", w: "24%", h: "50%", pal: detectionPalettes[1], delay: 0.9 },
        ],
        // Checkout
        [
            { icon: ShoppingCart, label: "Cart", conf: 99, top: "45%", left: "18%", w: "32%", h: "40%", pal: detectionPalettes[2], delay: 0.8 },
            { icon: User, label: "Cashier", conf: 96, top: "22%", left: "60%", w: "22%", h: "55%", pal: detectionPalettes[2], delay: 1.5 },
        ],
        // Stockroom
        [
            { icon: Package, label: "Motion", conf: 76, top: "35%", left: "30%", w: "40%", h: "45%", pal: detectionPalettes[3], delay: 0.7 },
        ],
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease }}
            className="relative aspect-video rounded-xl sm:rounded-2xl bg-ink-900 border border-white/5 overflow-hidden group"
        >
            {/* Animated grain */}
            <motion.div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "3px 3px" }}
                animate={{ backgroundPosition: ["0 0", "3px 3px"] }}
                transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
            />

            {/* Scan line */}
            <motion.div
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent z-10"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4 + index * 0.7, repeat: Infinity, ease: "linear" }}
            />

            {/* Color tint */}
            <div className={`absolute inset-0 bg-gradient-to-br ${bg} to-transparent opacity-25`} />
            <div className="absolute inset-0" style={{
                backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.03) 0%, transparent 50%)"
            }} />

            {/* Crosshair corner brackets */}
            {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${pos} w-3 h-3 border-white/30`}
                    style={{
                        borderTopWidth: pos.includes("top") ? 1 : 0,
                        borderBottomWidth: pos.includes("bottom") ? 1 : 0,
                        borderLeftWidth: pos.includes("left") ? 1 : 0,
                        borderRightWidth: pos.includes("right") ? 1 : 0,
                    }}
                    animate={{ opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
            ))}

            {/* Detection boxes */}
            {objects[index]?.map((o, i) => {
                const OIcon = o.icon;
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2 + o.delay, duration: 0.5, ease }}
                        className={`absolute border-2 ${o.pal.border} ${o.pal.bg} rounded-sm`}
                        style={{ top: o.top, left: o.left, width: o.w, height: o.h }}
                    >
                        <motion.div
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute -top-5 left-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-black/70 ${o.pal.text} text-[8px] sm:text-[9px] font-semibold whitespace-nowrap`}
                        >
                            <OIcon size={9} strokeWidth={2.2} />
                            {o.label} · {o.conf}%
                        </motion.div>
                    </motion.div>
                );
            })}

            {/* LIVE badge with ping */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-red-500" />
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-white/90 tracking-wider">LIVE</span>
            </div>

            {/* Cloud upload stream */}
            <CloudUploadStream index={index} accentClass={detectionPalettes[index]?.text || "text-emerald-300"} />

            {/* Live timestamp */}
            <Timestamp />

            {/* Zone label */}
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-[10px] sm:text-xs text-white/60 font-medium">{zone}</div>
            {/* Camera ID */}
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-[9px] text-white/30 font-mono">CAM-{String(index + 1).padStart(2, "0")}</div>
        </motion.div>
    );
}

/* ── Per-feed cloud upload stream ── */
function CloudUploadStream({ index, accentClass }: { index: number; accentClass: string }) {
    return (
        <div className="absolute top-2 sm:top-3 right-12 sm:right-14 flex flex-col items-center pointer-events-none z-10">
            <Cloud size={12} className={`${accentClass} opacity-90`} />
            <div className="relative w-0.5 h-7 mt-0.5 overflow-hidden">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className={`absolute left-0 right-0 h-1 rounded-full bg-current ${accentClass}`}
                        initial={{ y: 28, opacity: 0 }}
                        animate={{ y: -4, opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.45 + index * 0.12, ease: "easeOut" }}
                    />
                ))}
            </div>
        </div>
    );
}

/* ── Top-of-grid Probiz Cloud sync HUD ── */
function CloudSyncHUD() {
    const [mb, setMb] = useState(124);
    const [hours, setHours] = useState(720);
    useEffect(() => {
        const t = setInterval(() => {
            setMb((p) => +(p + Math.random() * 0.8).toFixed(1));
            setHours((p) => p + Math.random() * 0.01);
        }, 600);
        return () => clearInterval(t);
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative px-4 py-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] backdrop-blur-xl overflow-hidden"
        >
            {/* Flowing background streak */}
            <motion.div
                className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent"
                animate={{ x: ["-100%", "500%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative flex items-center gap-3 sm:gap-4 flex-wrap">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/30">
                    <motion.span
                        className="absolute inset-0 rounded-lg border border-emerald-400"
                        animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                    <Cloud size={15} className="text-emerald-400" />
                </div>

                <div className="flex flex-col leading-tight">
                    <span className="text-[9px] uppercase tracking-widest text-white/40 font-semibold">Probiz Cloud</span>
                    <span className="text-[12px] sm:text-[13px] text-white/85 font-medium">Streaming · 4 cameras live</span>
                </div>

                <div className="flex items-center gap-0.5">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            animate={{ y: [3, -3, 3], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                        >
                            <ArrowUp size={11} className="text-emerald-400" />
                        </motion.span>
                    ))}
                </div>

                <div className="ml-auto flex items-center gap-3 sm:gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[9px] uppercase tracking-widest text-white/40">Up</span>
                        <span className="text-[12px] font-mono text-emerald-300 tabular-nums">{mb.toFixed(1)} MB/s</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5">
                        <HardDrive size={11} className="text-white/40" />
                        <span className="text-[12px] font-mono text-white/70 tabular-nums">{Math.floor(hours)}h stored</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-[9px] uppercase tracking-widest text-emerald-300 font-semibold">
                        No DVR
                    </span>
                </div>
            </div>
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
    return <div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-[9px] sm:text-[10px] font-mono text-white/50 tabular-nums bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded">{time}</div>;
}
