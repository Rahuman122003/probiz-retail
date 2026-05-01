"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Dashboard() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.05]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

    return (
        <section ref={ref} className="relative py-20 sm:py-32 bg-ink-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 text-center mb-10 sm:mb-16">
                <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-semibold tracking-ultra leading-[0.95]">
                    One dashboard.<br />
                    <span className="text-ink-400 font-light italic">Infinite clarity.</span>
                </h2>
            </div>

            <motion.div style={{ scale, y, opacity }} className="max-w-7xl mx-auto px-5 sm:px-6">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-ink-950/20 border border-ink-200 bg-white">
                    {/* Mock dashboard */}
                    <div className="bg-ink-50 px-4 sm:px-6 py-3 flex items-center gap-2 border-b border-ink-100">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="text-[10px] sm:text-xs text-ink-400 mx-auto">probiz.app/dashboard</div>
                    </div>
                    
                    {/* Mobile: no sidebar */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex gap-6">
                            {/* Sidebar — hidden on mobile */}
                            <div className="hidden lg:block w-36 flex-shrink-0 space-y-2">
                                {["Dashboard", "Invoices", "Inventory", "Customers", "Reports", "AI"].map((it, i) => (
                                    <div key={i} className={`text-xs px-3 py-2 rounded-lg ${i === 0 ? "bg-ink-950 text-white" : "text-ink-400"}`}>{it}</div>
                                ))}
                            </div>
                            {/* Main content */}
                            <div className="flex-1 space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                    {[
                                        { l: "Revenue", v: "₹12.4L", c: "+18%" },
                                        { l: "Invoices", v: "342", c: "+12%" },
                                        { l: "Customers", v: "1,284", c: "+24%" },
                                        { l: "Stock value", v: "₹8.2L", c: "−3%" },
                                    ].map((s, i) => (
                                        <div key={i} className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-ink-100">
                                            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-400">{s.l}</div>
                                            <div className="text-lg sm:text-xl font-semibold tracking-tight mt-1">{s.v}</div>
                                            <div className="text-[10px] sm:text-[11px] text-emerald-600 mt-1">{s.c}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl border border-ink-100 h-32 sm:h-48">
                                    <div className="text-[10px] sm:text-xs text-ink-400 mb-2">Sales — Last 30 days</div>
                                    <svg viewBox="0 0 600 140" className="w-full h-full">
                                        <defs>
                                            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#0066ff" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <motion.path
                                            d="M0,100 Q60,80 120,70 T240,50 T360,60 T480,30 T600,20 L600,140 L0,140 Z"
                                            fill="url(#g)"
                                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }}
                                        />
                                        <motion.path
                                            d="M0,100 Q60,80 120,70 T240,50 T360,60 T480,30 T600,20"
                                            fill="none" stroke="#0066ff" strokeWidth="2"
                                            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}