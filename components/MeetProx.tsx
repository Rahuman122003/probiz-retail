"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Rocket, Sparkles, Zap } from "lucide-react";
import { WordReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";

export default function MeetProx() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);

    return (
        <section ref={ref} className="relative py-24 sm:py-36 bg-gradient-to-b from-white via-[#fff7ed] to-white overflow-hidden">
            {/* Ambient orbs */}
            <motion.div
                className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl pointer-events-none"
                style={{ background: "conic-gradient(from 0deg, #fb923c, #f59e0b, #fb923c)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #0066ff, transparent 70%)" }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="noise opacity-[0.04]" />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Mascot */}
                    <motion.div style={{ y, rotate: rot }} className="relative flex justify-center order-2 lg:order-1">
                        {/* Glow halo */}
                        <motion.div
                            className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full blur-3xl opacity-50"
                            style={{ background: "radial-gradient(circle, #fb923c 0%, transparent 60%)" }}
                            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        {/* Orbiting sparkles */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.span
                                key={i}
                                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                                style={{ background: i % 2 ? "#0066ff" : "#fb923c", boxShadow: "0 0 12px currentColor" }}
                                animate={{
                                    x: [Math.cos((i / 5) * Math.PI * 2) * 200, Math.cos((i / 5) * Math.PI * 2 + Math.PI * 2) * 200],
                                    y: [Math.sin((i / 5) * Math.PI * 2) * 200, Math.sin((i / 5) * Math.PI * 2 + Math.PI * 2) * 200],
                                }}
                                transition={{ duration: 12 + i, repeat: Infinity, ease: "linear" }}
                            />
                        ))}
                        {/* Floating mascot */}
                        <motion.div
                            animate={{ y: [0, -18, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <Image
                                src="/mascot.png"
                                alt="PROX — Probiz mascot"
                                width={1000}
                                height={1000}
                                priority
                                className="w-[280px] sm:w-[380px] md:w-[460px] h-auto drop-shadow-[0_30px_40px_rgba(251,146,60,0.35)]"
                            />
                        </motion.div>
                        {/* Floor reflection */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-6 rounded-full bg-orange-400/20 blur-xl" />
                    </motion.div>

                    {/* Copy */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-[11px] font-semibold tracking-wider uppercase mb-5"
                        >
                            <Sparkles size={12} />
                            Meet PROX
                        </motion.div>
                        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-ultra leading-[0.95] text-ink-950">
                            <WordReveal text="Say hi to" />
                            <br />
                            <span className="italic font-light bg-gradient-to-br from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent">
                                <WordReveal text="PROX." delay={0.25} />
                            </span>
                        </h2>
                        <p className="mt-6 text-base sm:text-lg text-ink-500 font-light tracking-tight max-w-md">
                            The clever little PROX powering every Probiz product. Curious, fast, and always one step ahead — PROX is your business sidekick, jetpack and all.
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
                            {[
                                { icon: Rocket, val: "v1.0", label: "PROX OS" },
                                { icon: Zap, val: "0.2s", label: "Reflex" },
                                { icon: Sparkles, val: "∞", label: "Charm" },
                            ].map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                                        className="p-3 rounded-2xl bg-white/70 backdrop-blur border border-orange-100"
                                    >
                                        <Icon size={14} className="text-orange-500 mb-2" />
                                        <div className="text-lg font-semibold text-ink-950">{s.val}</div>
                                        <div className="text-[10px] text-ink-400 mt-0.5">{s.label}</div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="mt-10 flex items-center gap-3"
                        >
                            <Magnetic>
                                <Link
                                    href="/prox"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow"
                                >
                                    Meet PROX <span>→</span>
                                </Link>
                            </Magnetic>
                            <span className="text-[11px] text-ink-400 hidden sm:inline">
                                designed & built by <span className="text-ink-700 font-medium">Probiz Technologies</span>
                            </span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
