"use client";
import { motion } from "framer-motion";

const stats = [
    { value: "12,000+", label: "Businesses" },
    { value: "₹2,400 Cr", label: "Invoices processed" },
    { value: "94%", label: "AI accuracy" },
    { value: "4.9★", label: "App rating" },
];

const values = [
    { title: "Simplicity First", desc: "Complex problems deserve simple solutions. We obsess over reducing clicks, not adding features." },
    { title: "AI That Helps", desc: "AI should work quietly in the background — anticipating needs, not demanding attention." },
    { title: "Built for India", desc: "GST, multi-language, regional compliance — we build for the realities of Indian commerce." },
    { title: "Speed Matters", desc: "Every millisecond counts when you're billing customers. Our platform is engineered for speed." },
];

export default function AboutContent() {
    return (
        <>
            <section className="py-16 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-24">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="text-center p-6 rounded-2xl bg-ink-50"
                            >
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gradient-accent">{s.value}</div>
                                <div className="text-xs sm:text-sm text-ink-400 mt-2">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="max-w-3xl mx-auto mb-16 sm:mb-24">
                        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">Our Story</h2>
                        <div className="space-y-4 text-base sm:text-lg text-ink-500 leading-relaxed font-light">
                            <p>ProBiz started in 2023 with a simple observation: Indian businesses were using 4-5 different tools to manage billing, inventory, and accounting. Most of these tools didn&apos;t talk to each other.</p>
                            <p>We built ProBiz to unify everything into one platform — and then supercharged it with AI. Today, over 12,000 businesses trust ProBiz to run their operations, from corner shops to enterprise chains.</p>
                            <p>Our AI engine processes over ₹2,400 crores in invoices annually, predicts sales with 94% accuracy, and catches errors that humans miss. We&apos;re just getting started.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8 sm:mb-10">Our Values</h2>
                        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                            {values.map((v, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="p-6 sm:p-8 rounded-2xl border border-ink-100"
                                >
                                    <h3 className="text-lg font-semibold tracking-tight mb-2">{v.title}</h3>
                                    <p className="text-sm text-ink-400 leading-relaxed">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
