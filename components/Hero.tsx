"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { WordReveal, MaskReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";
import { TrendingUp, Sparkles, ShoppingCart, Camera, Receipt, BarChart3, Package, Users, Bell, Search } from "lucide-react";

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
                        <button className="group relative w-full sm:w-auto px-7 py-3.5 rounded-full bg-ink-950 text-white text-[14px] font-medium overflow-hidden">
                            <span className="relative z-10">Start Free</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </Magnetic>
                    <Magnetic>
                        <button className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-ink-200 text-[14px] font-medium hover:bg-white transition-colors">
                            Book a Demo →
                        </button>
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
                                {[
                                    { label: "Revenue", value: "₹4,82,300", change: "+23.4%", positive: true, icon: TrendingUp },
                                    { label: "Invoices", value: "342", change: "+12%", positive: true, icon: Receipt },
                                    { label: "AI Alerts", value: "7", change: "−3 vs yday", positive: true, icon: Camera },
                                    { label: "POS Sales", value: "₹1,24,500", change: "+18%", positive: true, icon: ShoppingCart },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1.8 + i * 0.1 }}
                                        className="p-3 sm:p-4 rounded-xl border border-ink-100 bg-white hover:shadow-md hover:shadow-ink-950/5 transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-400">{stat.label}</span>
                                            <stat.icon size={13} className="text-ink-300" />
                                        </div>
                                        <div className="text-lg sm:text-xl font-semibold tracking-tight text-ink-900">{stat.value}</div>
                                        <div className="text-[10px] sm:text-[11px] text-emerald-600 font-medium mt-0.5">{stat.change}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Charts row */}
                            <div className="grid lg:grid-cols-5 gap-3 sm:gap-4">
                                {/* Main chart */}
                                <div className="lg:col-span-3 p-4 sm:p-5 rounded-xl border border-ink-100">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <div className="text-xs sm:text-sm font-semibold text-ink-700">Sales Overview</div>
                                        <div className="flex gap-1">
                                            {["1D", "1W", "1M"].map((t, i) => (
                                                <span key={t} className={`text-[9px] px-2 py-0.5 rounded-md ${i === 2 ? "bg-ink-950 text-white" : "text-ink-400"}`}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <svg viewBox="0 0 600 120" className="w-full h-20 sm:h-28">
                                        <defs>
                                            <linearGradient id="heroG" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#0066ff" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <motion.path
                                            d="M0,90 Q50,70 100,75 T200,55 T300,60 T400,35 T500,25 T600,15 L600,120 L0,120 Z"
                                            fill="url(#heroG)"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 2.2 }}
                                        />
                                        <motion.path
                                            d="M0,90 Q50,70 100,75 T200,55 T300,60 T400,35 T500,25 T600,15"
                                            fill="none" stroke="#0066ff" strokeWidth="2.5" strokeLinecap="round"
                                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 2 }}
                                        />
                                        {/* Dot at peak */}
                                        <motion.circle
                                            cx="600" cy="15" r="4" fill="#0066ff"
                                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.8, type: "spring" }}
                                        />
                                        <motion.circle
                                            cx="600" cy="15" r="8" fill="none" stroke="#0066ff" strokeWidth="1" opacity="0.3"
                                            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ delay: 4, duration: 2, repeat: Infinity }}
                                        />
                                    </svg>
                                </div>

                                {/* AI Camera mini feed + Recent POS */}
                                <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                                    {/* AI Camera mini */}
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
                                            </div>
                                            <div className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded">
                                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[8px] sm:text-[9px] font-medium text-emerald-700">4 Live</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1.5">
                                            {["Entrance", "Checkout", "Aisle 3", "Stock"].map((z, i) => (
                                                <div key={i} className="aspect-video rounded-md bg-ink-900 relative overflow-hidden">
                                                    <motion.div
                                                        className="absolute inset-x-0 h-[1px] bg-emerald-400/40"
                                                        animate={{ top: ["0%", "100%", "0%"] }}
                                                        transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                                                    />
                                                    <div className="absolute top-1 left-1 flex items-center gap-0.5">
                                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                                        <span className="text-[6px] text-white/60 font-medium">{z}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Recent POS transactions */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.8, duration: 0.8 }}
                                        className="p-3 sm:p-4 rounded-xl border border-ink-100"
                                    >
                                        <div className="flex items-center gap-1.5 mb-2.5">
                                            <ShoppingCart size={12} className="text-accent" />
                                            <span className="text-[10px] sm:text-xs font-semibold text-ink-700">Recent POS</span>
                                        </div>
                                        {[
                                            { id: "#2478", amount: "₹2,211", time: "Just now" },
                                            { id: "#2477", amount: "₹856", time: "3m ago" },
                                            { id: "#2476", amount: "₹4,320", time: "8m ago" },
                                        ].map((tx, i) => (
                                            <div key={i} className="flex items-center justify-between py-1.5 border-b border-ink-50 last:border-0">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                                                        <Sparkles size={9} className="text-accent" />
                                                    </div>
                                                    <span className="text-[10px] sm:text-xs font-medium text-ink-600">{tx.id}</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] sm:text-xs font-semibold text-ink-800">{tx.amount}</div>
                                                    <div className="text-[8px] text-ink-400">{tx.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Gradient fade at bottom to blend with next section */}
                <div className="h-20 sm:h-32 bg-gradient-to-b from-transparent to-white relative -mt-10 sm:-mt-16 z-20" />
            </motion.div>
        </section>
    );
}