"use client";
import { motion } from "framer-motion";
import { Scan, CreditCard, Zap, Smartphone } from "lucide-react";
import { WordReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1];

const miniItems = [
    { name: "Organic Tea", price: "₹349", checked: true },
    { name: "Basmati Rice", price: "₹625", checked: true },
    { name: "Olive Oil 1L", price: "₹899", checked: false },
];

export default function POSShowcase() {
    return (
        <section className="relative py-20 sm:py-32 md:py-48 bg-white overflow-hidden">
            <div className="noise" />
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — Mini POS Terminal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-ink-950/10 border border-ink-200 bg-white">
                            {/* Browser chrome */}
                            <div className="bg-ink-50 px-4 py-2.5 flex items-center gap-2 border-b border-ink-100">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                </div>
                                <div className="text-[9px] text-ink-400 mx-auto">probiz.app/pos</div>
                            </div>
                            <div className="p-4 sm:p-6">
                                {/* Items */}
                                <div className="space-y-2.5 mb-4">
                                    {miniItems.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -15 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease }}
                                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-ink-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
                                                    className={`w-4 h-4 rounded flex items-center justify-center ${item.checked ? "bg-emerald-100" : "bg-ink-100"}`}
                                                >
                                                    {item.checked && (
                                                        <svg width="8" height="8" viewBox="0 0 10 10" className="text-emerald-600">
                                                            <path d="M2 5 L4 7 L8 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        </svg>
                                                    )}
                                                </motion.div>
                                                <span className="text-xs font-medium text-ink-700">{item.name}</span>
                                            </div>
                                            <span className="text-xs font-semibold text-ink-800">{item.price}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                {/* Total */}
                                <div className="border-t border-ink-100 pt-3 flex justify-between items-center">
                                    <span className="text-xs text-ink-400">Total (incl. GST)</span>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1.2 }}
                                        className="text-base font-semibold text-ink-900"
                                    >₹2,211</motion.span>
                                </div>
                                {/* Payment buttons */}
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    {[
                                        { icon: Smartphone, label: "UPI" },
                                        { icon: CreditCard, label: "Card" },
                                        { icon: Zap, label: "Quick" },
                                    ].map((p, i) => (
                                        <div key={i} className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-[9px] font-medium ${i === 0 ? "border-accent bg-accent/5 text-accent" : "border-ink-100 text-ink-400"}`}>
                                            <p.icon size={12} strokeWidth={1.5} />
                                            {p.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Floating scan badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5, duration: 0.8, ease }}
                            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 glass rounded-xl p-3 shadow-lg shadow-ink-950/10"
                        >
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                                <div className="flex items-center gap-2">
                                    <Scan size={14} className="text-accent" />
                                    <span className="text-[10px] font-semibold text-ink-700">Scanned!</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Text */}
                    <div className="order-1 lg:order-2">
                        <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4 sm:mb-6">— Point of Sale</div>
                        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-semibold tracking-ultra leading-[0.92] text-ink-950">
                            <WordReveal text="Checkout in" />
                            <br />
                            <span className="italic font-light text-gradient-accent"><WordReveal text="3 seconds flat." delay={0.3} /></span>
                        </h2>
                        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-ink-400 font-light tracking-tight max-w-md">
                            The fastest POS in retail. Scan, bill, and collect payments before your customer can put away their wallet.
                        </p>
                        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 sm:gap-6 max-w-sm">
                            {[
                                { val: "< 3s", label: "Per sale" },
                                { val: "50K+", label: "Daily txns" },
                                { val: "99.9%", label: "Uptime" },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                                >
                                    <div className="text-xl sm:text-2xl font-semibold tracking-tight text-gradient-accent">{s.val}</div>
                                    <div className="text-[10px] text-ink-400 mt-1">{s.label}</div>
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
                                <Link href="/pos" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-950 text-white text-sm font-medium hover:bg-ink-900 transition-colors">
                                    Explore POS
                                    <span>→</span>
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
