"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
    { name: "Starter", price: "Free", period: "forever", desc: "For solo entrepreneurs", features: ["50 invoices/month", "1 location", "Basic reports", "Email support", "Mobile app"], accent: false },
    { name: "Pro", price: "₹999", period: "/month", desc: "For growing businesses", features: ["Unlimited invoices", "5 locations", "AI forecasting", "Priority support", "API access", "Expense OCR", "Voice invoicing"], accent: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "For large organizations", features: ["Everything in Pro", "Unlimited locations", "Custom integrations", "Dedicated manager", "SLA guarantee", "On-premise option", "SSO & RBAC"], accent: false },
];

export default function PricingContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {plans.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col ${p.accent ? "bg-ink-950 text-white ring-2 ring-accent" : "bg-ink-50 border border-ink-100"}`}
                        >
                            {p.accent && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-white text-[10px] font-semibold uppercase tracking-wider">Most Popular</div>}
                            <div className="mb-6">
                                <div className="text-sm font-medium mb-1">{p.name}</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl sm:text-5xl font-semibold tracking-tight">{p.price}</span>
                                    <span className={`text-sm ${p.accent ? "text-white/50" : "text-ink-400"}`}>{p.period}</span>
                                </div>
                                <div className={`text-sm mt-2 ${p.accent ? "text-white/60" : "text-ink-400"}`}>{p.desc}</div>
                            </div>
                            <ul className="space-y-3 flex-1">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-sm">
                                        <Check size={16} className={`mt-0.5 flex-shrink-0 ${p.accent ? "text-accent-glow" : "text-emerald-500"}`} />
                                        <span className={p.accent ? "text-white/80" : "text-ink-600"}>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/contact"
                                className={`mt-8 w-full inline-block text-center py-3 rounded-full text-sm font-medium transition-colors ${p.accent ? "bg-white text-ink-950 hover:bg-ink-100" : "bg-ink-950 text-white hover:bg-ink-800"}`}
                            >
                                {p.price === "Custom" ? "Contact Sales" : "Get Started"}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
