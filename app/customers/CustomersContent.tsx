"use client";
import { motion } from "framer-motion";

const stories = [
    { company: "Sharma Textiles", industry: "Textiles", quote: "Probiz cut our billing time by 80%. The AI catches mistakes we'd never spot.", person: "Priya Sharma", role: "Founder", metric: "80%", metricLabel: "Faster billing" },
    { company: "Mehta Electronics", industry: "Electronics", quote: "We replaced four tools with Probiz. Our accountant is finally happy.", person: "Rohan Mehta", role: "CEO", metric: "4→1", metricLabel: "Tools replaced" },
    { company: "Verma Pharma", industry: "Pharmaceuticals", quote: "The forecasting alone has saved us ₹40 lakhs in dead stock this year.", person: "Anjali Verma", role: "COO", metric: "₹40L", metricLabel: "Saved annually" },
    { company: "Chennai Silks", industry: "Retail", quote: "Multi-location inventory management was a nightmare. Probiz made it seamless.", person: "Karthik Raja", role: "Operations Head", metric: "15", metricLabel: "Stores managed" },
    { company: "Green Grocers", industry: "FMCG", quote: "Voice invoicing in Tamil changed everything for our staff. Truly built for India.", person: "Lakshmi Narayanan", role: "Owner", metric: "3x", metricLabel: "Faster checkout" },
    { company: "TechMart India", industry: "Electronics", quote: "The AI predicted our Diwali demand perfectly. Zero stockouts for the first time.", person: "Amit Patel", role: "Director", metric: "94%", metricLabel: "Forecast accuracy" },
];

export default function CustomersContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {stories.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.08 }}
                            className="rounded-2xl sm:rounded-3xl border border-ink-100 overflow-hidden hover:shadow-lg hover:shadow-ink-950/5 transition-shadow duration-500"
                        >
                            <div className="p-6 sm:p-8 bg-ink-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-xs text-accent font-medium">{s.industry}</div>
                                        <div className="text-lg font-semibold tracking-tight">{s.company}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-semibold tracking-tight text-gradient-accent">{s.metric}</div>
                                        <div className="text-[10px] text-ink-400">{s.metricLabel}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8">
                                <p className="text-sm sm:text-base text-ink-600 leading-relaxed mb-6 font-light">&quot;{s.quote}&quot;</p>
                                <div className="pt-4 border-t border-ink-100">
                                    <div className="text-sm font-semibold">{s.person}</div>
                                    <div className="text-xs text-ink-400">{s.role}, {s.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
