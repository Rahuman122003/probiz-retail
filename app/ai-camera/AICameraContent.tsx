"use client";
import { motion } from "framer-motion";
import { Shield, Eye, Brain, Moon, Cloud, Store, AlertTriangle, Activity, Camera, Wifi } from "lucide-react";
import { WordReveal } from "@/components/ui/TextReveal";

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

const features = [
    { icon: AlertTriangle, title: "Smart Alerts", desc: "Instant push notifications to your phone and dashboard when suspicious activity is detected." },
    { icon: Eye, title: "Facial Recognition", desc: "Identify known offenders and VIP customers. Maintain a watchlist synced across all your stores." },
    { icon: Brain, title: "Behavior Analysis", desc: "AI learns normal patterns and flags anomalies — loitering, concealment, sweethearting, and more." },
    { icon: Moon, title: "Night Vision AI", desc: "Crystal-clear detection even in low-light conditions. Our models are trained for all environments." },
    { icon: Cloud, title: "Cloud Recording", desc: "30-day cloud storage with instant playback. Search footage by event, time, or person." },
    { icon: Store, title: "Multi-Store Sync", desc: "Centralized monitoring across all locations. One dashboard, unlimited stores, zero blind spots." },
];

const zones = ["Entrance", "Aisle 3", "Checkout", "Stockroom"];
const zoneColors = ["from-red-500/40", "from-amber-500/40", "from-blue-500/40", "from-emerald-500/40"];

const steps = [
    { icon: Camera, title: "Install Cameras", desc: "Works with any IP camera. Plug in and connect to Probiz in minutes." },
    { icon: Brain, title: "AI Learns Your Store", desc: "Our AI maps your layout, learns traffic patterns, and calibrates detection in 48 hours." },
    { icon: Shield, title: "Real-Time Protection", desc: "Get instant alerts, review footage, and track incidents — all from your Probiz dashboard." },
];

export default function AICameraContent() {
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
                    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-white mb-12 sm:mb-16">
                        <WordReveal text="Every angle." />{" "}
                        <span className="italic font-light text-gradient-accent"><WordReveal text="Every second." delay={0.3} /></span>
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Camera Grid */}
                        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                            {zones.map((zone, i) => (
                                <motion.div
                                    key={zone}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease }}
                                    className="relative aspect-video rounded-xl sm:rounded-2xl bg-ink-900 border border-white/5 overflow-hidden group"
                                >
                                    {/* Scan line animation */}
                                    <motion.div
                                        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent z-10"
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
                                    />
                                    {/* Simulated camera feed bg */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${zoneColors[i]} to-transparent opacity-20`} />
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.03) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.02) 0%, transparent 50%)"
                                    }} />

                                    {/* AI bounding box */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1.5 + i * 0.3, duration: 0.5 }}
                                        className="absolute top-[25%] left-[30%] w-[25%] h-[40%] border-2 border-emerald-400/70 rounded-sm"
                                    >
                                        <div className="absolute -top-5 left-0 bg-emerald-500/90 text-white text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded font-medium">
                                            Person • 98%
                                        </div>
                                    </motion.div>

                                    {/* LIVE badge */}
                                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[9px] sm:text-[10px] font-semibold text-white/90 tracking-wide">LIVE</span>
                                    </div>
                                    {/* Zone label */}
                                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-[10px] sm:text-xs text-white/60 font-medium">{zone}</div>
                                    {/* Camera ID */}
                                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-[9px] text-white/30 font-mono">CAM-{String(i + 1).padStart(2, "0")}</div>
                                </motion.div>
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
            <section className="relative py-16 sm:py-24 bg-ink-950 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-4 sm:mb-6">— Threat Analysis</div>
                    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-white mb-12 sm:mb-16">
                        <WordReveal text="Know your" />{" "}
                        <span className="italic font-light text-gradient-accent"><WordReveal text="hotspots." delay={0.3} /></span>
                    </h2>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease }}
                        className="relative aspect-[16/9] sm:aspect-[2/1] rounded-2xl sm:rounded-3xl border border-white/10 bg-ink-900/50 overflow-hidden"
                    >
                        {/* Store floor plan grid */}
                        <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                            backgroundSize: "50px 50px"
                        }} />

                        {/* Hotspots */}
                        {[
                            { top: "20%", left: "15%", size: "180px", color: "rgba(239,68,68,0.4)", label: "Entrance", risk: "High" },
                            { top: "40%", left: "45%", size: "220px", color: "rgba(245,158,11,0.35)", label: "Electronics", risk: "Medium" },
                            { top: "60%", left: "75%", size: "160px", color: "rgba(239,68,68,0.45)", label: "Checkout", risk: "High" },
                            { top: "30%", left: "70%", size: "120px", color: "rgba(59,130,246,0.25)", label: "Apparel", risk: "Low" },
                        ].map((spot, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.5 + i * 0.2, ease }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                                style={{ top: spot.top, left: spot.left }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                                    className="rounded-full blur-2xl"
                                    style={{ width: spot.size, height: spot.size, background: `radial-gradient(circle, ${spot.color}, transparent 70%)` }}
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    <div className="text-[10px] sm:text-xs font-semibold text-white">{spot.label}</div>
                                    <div className="text-[9px] text-white/50">Risk: {spot.risk}</div>
                                </div>
                                {/* Center dot */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80" />
                            </motion.div>
                        ))}

                        {/* Legend */}
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center gap-4 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
                            {[
                                { color: "bg-red-500", label: "High Risk" },
                                { color: "bg-amber-500", label: "Medium" },
                                { color: "bg-blue-500", label: "Low" },
                            ].map((l, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${l.color}`} />
                                    <span className="text-[9px] sm:text-[10px] text-white/60">{l.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

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
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.8, delay: i * 0.07, ease }}
                                    className="group relative bg-ink-950 p-6 sm:p-8 lg:p-10 overflow-hidden cursor-pointer"
                                >
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                        style={{ background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,102,255,0.08), transparent 40%)" }}
                                    />
                                    <div className="relative">
                                        <Icon size={24} strokeWidth={1.5} className="text-white mb-6 sm:mb-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-accent" />
                                        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-2 sm:mb-3">{f.title}</h3>
                                        <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                                        <div className="mt-6 sm:mt-8 flex items-center gap-2 text-[12px] font-medium text-white/40 group-hover:text-accent transition-colors">
                                            Learn more
                                            <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </div>
                                    </div>
                                </motion.div>
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
        </>
    );
}
