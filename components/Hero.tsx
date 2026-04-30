"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { WordReveal, MaskReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";
import { TrendingUp, Sparkles } from "lucide-react";

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-32 pb-20">
            <div className="noise" />

            {/* Animated gradient orb */}
            <motion.div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
                style={{
                    background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[12px] font-medium text-ink-600 mb-10"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Introducing ProBiz Retail 3.0
                </motion.div>

                <h1 className="font-display font-semibold tracking-ultra text-[14vw] md:text-[8.5vw] lg:text-[7.5vw] leading-[0.92] text-ink-950">
                    <span className="block"><WordReveal text="Run your entire" /></span>
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
                    className="mt-10 text-lg md:text-xl text-ink-400 max-w-2xl mx-auto font-light tracking-tight"
                >
                    GST billing. Inventory. Accounting. Unified into one breathtakingly simple platform.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-12 flex items-center justify-center gap-4"
                >
                    <Magnetic>
                        <button className="group relative px-7 py-3.5 rounded-full bg-ink-950 text-white text-[14px] font-medium overflow-hidden">
                            <span className="relative z-10">Start Free</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </Magnetic>
                    <Magnetic>
                        <button className="px-7 py-3.5 rounded-full border border-ink-200 text-[14px] font-medium hover:bg-white transition-colors">
                            Book a Demo →
                        </button>
                    </Magnetic>
                </motion.div>

                {/* Floating UI cards */}
                <div className="relative mt-24 h-[300px] hidden md:block">
                    <FloatingCard
                        className="absolute left-[8%] top-0"
                        delay={1.4}
                        rotate={-6}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <TrendingUp size={16} className="text-emerald-600" />
                            </div>
                            <div className="text-[11px] text-ink-400 font-medium">Sales today</div>
                        </div>
                        <div className="text-2xl font-semibold tracking-tight">₹4,82,300</div>
                        <div className="text-[11px] text-emerald-600 font-medium mt-1">↑ 23.4% vs yesterday</div>
                        <svg viewBox="0 0 200 60" className="mt-3 w-full">
                            <motion.path
                                d="M0,40 Q40,20 80,30 T160,15 L200,10"
                                fill="none" stroke="#10b981" strokeWidth="2"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 2 }}
                            />
                        </svg>
                    </FloatingCard>

                    <FloatingCard className="absolute left-1/2 -translate-x-1/2 top-8" delay={1.6} rotate={2}>
                        <div className="text-[10px] uppercase tracking-widest text-ink-400 font-semibold mb-2">Invoice #2451</div>
                        <div className="text-sm font-semibold mb-1">Acme Industries</div>
                        <div className="flex items-baseline justify-between mt-3">
                            <div className="text-xs text-ink-400">GST 18%</div>
                            <div className="text-lg font-semibold tracking-tight">₹24,960</div>
                        </div>
                        <div className="mt-3 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-accent" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 2 }} />
                        </div>
                    </FloatingCard>

                    <FloatingCard className="absolute right-[8%] top-2" delay={1.8} rotate={5}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
                                <Sparkles size={16} className="text-white" />
                            </div>
                            <div className="text-[11px] text-ink-400 font-medium">AI Insight</div>
                        </div>
                        <div className="text-sm font-medium leading-snug">Reorder <span className="text-accent">Hero Pen</span> — stockout in 4 days.</div>
                    </FloatingCard>
                </div>
            </motion.div>
        </section>
    );
}

function FloatingCard({ children, className, delay, rotate }: { children: React.ReactNode, className?: string, delay: number, rotate: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate }}
            transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`w-[240px] p-5 rounded-2xl glass shadow-2xl shadow-ink-950/5 ${className}`}
        >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}>
                {children}
            </motion.div>
        </motion.div>
    );
}