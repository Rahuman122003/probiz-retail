"use client";
import { motion } from "framer-motion";

const entries = [
    { version: "3.0", date: "Apr 2025", title: "Probiz Retail 3.0", changes: ["Complete UI redesign with parallax effects", "AI Forecasting engine — 94% accuracy", "Voice invoicing in 10+ languages", "New mobile app for iOS and Android"] },
    { version: "2.8", date: "Feb 2025", title: "Smart Alerts & OCR", changes: ["Expense OCR — snap receipts for auto-entry", "Smart notification system", "Improved multi-location sync", "Performance boost — 3x faster loading"] },
    { version: "2.5", date: "Nov 2024", title: "Enterprise Features", changes: ["SSO and RBAC support", "Custom API integrations", "Audit trail logging", "Dedicated account management"] },
    { version: "2.0", date: "Aug 2024", title: "Inventory Revolution", changes: ["Batch and expiry management", "Multi-warehouse support", "Automated reorder points", "Barcode scanner integration"] },
    { version: "1.5", date: "May 2024", title: "GST Made Easy", changes: ["GSTR-1, 3B, 9 auto-generation", "E-invoicing support", "HSN code auto-mapping", "Bulk invoice creation"] },
];

export default function ChangelogContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-5 sm:px-6">
                <div className="relative">
                    <div className="absolute left-[17px] sm:left-[21px] top-0 bottom-0 w-px bg-ink-100" />
                    <div className="space-y-12 sm:space-y-16">
                        {entries.map((e, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                className="relative pl-10 sm:pl-14"
                            >
                                <div className="absolute left-0 top-1 w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] rounded-full bg-white border-2 border-ink-200 flex items-center justify-center text-[10px] sm:text-xs font-bold text-accent">
                                    {e.version}
                                </div>
                                <div className="text-xs text-ink-400 mb-2">{e.date}</div>
                                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3">{e.title}</h3>
                                <ul className="space-y-2">
                                    {e.changes.map((c, ci) => (
                                        <li key={ci} className="flex items-start gap-2 text-sm text-ink-500">
                                            <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
