"use client";
import { motion } from "framer-motion";
import { Shield, Eye, AlertTriangle, Camera } from "lucide-react";
import { WordReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1];

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
                            {["Entrance", "Checkout", "Aisle 3", "Stockroom"].map((zone, i) => (
                                <div key={zone} className="relative aspect-video rounded-xl bg-ink-900 border border-white/5 overflow-hidden">
                                    {/* Scan line */}
                                    <motion.div
                                        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
                                    {/* LIVE badge */}
                                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded">
                                        <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[8px] font-semibold text-white/80">LIVE</span>
                                    </div>
                                    <div className="absolute bottom-2 left-2 text-[9px] text-white/40">{zone}</div>
                                    {/* AI detection box on first feed */}
                                    {i === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 1.5 }}
                                            className="absolute top-[20%] left-[35%] w-[20%] h-[45%] border border-emerald-400/60 rounded-sm"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
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
