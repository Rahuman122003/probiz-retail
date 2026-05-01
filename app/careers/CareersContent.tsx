"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const positions = [
    { title: "Senior Frontend Engineer", team: "Engineering", location: "Bangalore / Remote", type: "Full-time" },
    { title: "ML Engineer — Forecasting", team: "AI", location: "Bangalore", type: "Full-time" },
    { title: "Product Designer", team: "Design", location: "Remote", type: "Full-time" },
    { title: "Backend Engineer (Go)", team: "Engineering", location: "Bangalore / Remote", type: "Full-time" },
    { title: "Customer Success Manager", team: "Operations", location: "Mumbai", type: "Full-time" },
    { title: "Technical Writer", team: "Product", location: "Remote", type: "Contract" },
];

const perks = ["Competitive salary + equity", "Remote-first culture", "Health insurance for family", "Learning budget ₹1L/year", "Home office setup", "Unlimited PTO"];

export default function CareersContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-5 sm:px-6">
                <div className="mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 sm:mb-8">Why ProBiz?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        {perks.map((p, i) => (
                            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                className="p-4 rounded-xl bg-ink-50 text-sm text-ink-600 font-medium text-center">
                                {p}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 sm:mb-8">Open Positions</h2>
                <div className="space-y-3 sm:space-y-4">
                    {positions.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-2xl border border-ink-100 hover:border-accent/30 hover:shadow-md transition-all cursor-pointer gap-3"
                        >
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">{p.title}</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-ink-100 text-ink-600">{p.team}</span>
                                    <span className="text-xs text-ink-400">{p.location}</span>
                                    <span className="text-xs text-ink-400">• {p.type}</span>
                                </div>
                            </div>
                            <ArrowRight size={18} className="text-ink-300 group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
