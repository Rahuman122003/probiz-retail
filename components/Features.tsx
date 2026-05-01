"use client";
import { motion } from "framer-motion";
import { FileCheck, Boxes, Brain, ScanLine, ShieldAlert, Mic } from "lucide-react";
import { WordReveal } from "./ui/TextReveal";

const features = [
    { icon: FileCheck, title: "GST Billing", desc: "B2B & B2C invoicing with automatic tax handling and e-invoice integration." },
    { icon: Boxes, title: "Inventory Tracking", desc: "Live stock levels, low-stock alerts, and batch management built in." },
    { icon: Brain, title: "AI Forecasting", desc: "Predict next month's sales with 94% accuracy using Probiz Retail AI." },
    { icon: ScanLine, title: "Expense OCR", desc: "Snap a receipt — we read, categorize, and reconcile it automatically." },
    { icon: ShieldAlert, title: "Fraud Detection", desc: "Catch unusual patterns in real-time before they cost you." },
    { icon: Mic, title: "Voice Invoicing", desc: "Say it — done. Create invoices entirely with your voice." },
];

export default function Features() {
    return (
        <section className="relative py-20 sm:py-32 md:py-48 bg-ink-50">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="max-w-3xl mb-12 sm:mb-20 overflow-visible">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4 sm:mb-6">— Capabilities</div>
                    <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-semibold tracking-ultra leading-[1.1] overflow-visible">
                        <WordReveal text="Everything you need." />
                        <br />
                        <span className="text-ink-400 font-light italic"><WordReveal text="Nothing you don't." delay={0.2} /></span>
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-ink-100 rounded-2xl sm:rounded-3xl overflow-hidden border border-ink-100">
                    {features.map((f, i) => <FeatureCard key={i} {...f} index={i} />)}
                </div>
            </div>
        </section>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FeatureCard({ icon: Icon, title, desc, index }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white p-6 sm:p-8 lg:p-10 xl:p-12 overflow-hidden cursor-pointer"
        >
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,102,255,0.06), transparent 40%)"
                }}
            />
            <div className="relative">
                <Icon size={24} strokeWidth={1.5} className="text-ink-950 mb-6 sm:mb-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-accent sm:w-7 sm:h-7" />
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 sm:mb-3">{title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{desc}</p>
                <div className="mt-6 sm:mt-8 flex items-center gap-2 text-[12px] font-medium text-ink-400 group-hover:text-accent transition-colors">
                    Learn more
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
            </div>
        </motion.div>
    );
}