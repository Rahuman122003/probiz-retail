"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileCheck, Boxes, Brain, ScanLine, ShieldAlert, Mic } from "lucide-react";
import { WordReveal } from "./ui/TextReveal";
import LearnMoreModal, { LearnMoreItem } from "./ui/LearnMoreModal";

type Feature = LearnMoreItem & { desc: string };

const features: Feature[] = [
    {
        icon: FileCheck,
        title: "GST Billing",
        desc: "B2B & B2C invoicing with automatic tax handling and e-invoice integration.",
        tagline: "Compliant invoices in seconds.",
        long: "Generate fully GST-compliant invoices for B2B and B2C transactions with automatic CGST/SGST/IGST handling, HSN/SAC lookup, and direct e-invoice + e-way bill integration with the GSTN portal.",
        highlights: [
            "B2B, B2C, export & SEZ invoice formats",
            "Auto e-invoice (IRN + QR) generation",
            "E-way bill creation in one click",
            "Multi-branch & multi-GSTIN support",
            "Share via WhatsApp, email, or SMS",
        ],
    },
    {
        icon: Boxes,
        title: "Inventory Tracking",
        desc: "Live stock levels, low-stock alerts, and batch management built in.",
        tagline: "Stock that thinks for itself.",
        long: "Real-time inventory across unlimited branches and warehouses, with batch and expiry tracking, automatic reorder triggers, and a complete audit trail of every movement.",
        highlights: [
            "Live stock across multiple locations",
            "Batch, serial & expiry tracking",
            "Auto reorder & low-stock alerts",
            "Inter-branch transfers in one tap",
            "Stock-aging & dead-stock reports",
        ],
    },
    {
        icon: Brain,
        title: "AI Forecasting",
        desc: "Predict next month's sales with 94% accuracy using Probiz Retail AI.",
        tagline: "See tomorrow, today.",
        long: "Our AI engine analyses your historical sales, seasonality, festival cycles, and category trends to forecast demand at SKU level — so you order exactly what you'll sell.",
        highlights: [
            "94% forecast accuracy at SKU level",
            "Festival & seasonality-aware models",
            "Cash-flow & revenue projections",
            "Optimal reorder point suggestions",
            "Scenario simulation (\"what if\")",
        ],
    },
    {
        icon: ScanLine,
        title: "Expense OCR",
        desc: "Snap a receipt — we read, categorize, and reconcile it automatically.",
        tagline: "Receipts that file themselves.",
        long: "Snap a photo of any bill or receipt and our OCR + AI engine extracts vendor, GSTIN, line items, and tax — then categorises, reconciles, and posts the entry to the right ledger.",
        highlights: [
            "99% accuracy on Indian receipts",
            "Auto vendor & GSTIN matching",
            "Line-item extraction with HSN",
            "Bank-statement reconciliation",
            "Bulk upload via email or WhatsApp",
        ],
    },
    {
        icon: ShieldAlert,
        title: "Fraud Detection",
        desc: "Catch unusual patterns in real-time before they cost you.",
        tagline: "Anomalies, exposed instantly.",
        long: "Continuously monitors invoices, refunds, discounts, and stock movements for unusual patterns. Get alerted the moment a transaction looks off — before it becomes a loss.",
        highlights: [
            "Real-time anomaly detection",
            "Discount & void-bill abuse alerts",
            "Cashier behaviour scoring",
            "Stock-shrinkage flagging",
            "One-click investigation timeline",
        ],
    },
    {
        icon: Mic,
        title: "Voice Invoicing",
        desc: "Say it — done. Create invoices entirely with your voice.",
        tagline: "Speak. Bill. Done.",
        long: "Create complete invoices hands-free in English, Hindi, Tamil, Telugu, and 8+ Indian languages. Perfect for busy counters, field sales, and visually impaired operators.",
        highlights: [
            "12+ Indian languages supported",
            "Hands-free billing at the counter",
            "Auto-detect items, qty, and rate",
            "Voice search across customers",
            "Works offline on any device",
        ],
    },
];

export default function Features() {
    const [active, setActive] = useState<number | null>(null);

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
                    {features.map((f, i) => (
                        <FeatureCard key={i} feature={f} index={i} onOpen={() => setActive(i)} />
                    ))}
                </div>
            </div>

            <LearnMoreModal
                item={active !== null ? features[active] : null}
                onClose={() => setActive(null)}
            />
        </section>
    );
}

function FeatureCard({ feature, index, onOpen }: { feature: Feature; index: number; onOpen: () => void }) {
    const Icon = feature.icon;
    return (
        <motion.button
            type="button"
            onClick={onOpen}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white p-6 sm:p-8 lg:p-10 xl:p-12 overflow-hidden cursor-pointer text-left w-full"
        >
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,102,255,0.06), transparent 40%)"
                }}
            />
            <div className="relative">
                <Icon size={24} strokeWidth={1.5} className="text-ink-950 mb-6 sm:mb-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-accent sm:w-7 sm:h-7" />
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{feature.desc}</p>
                <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-[12px] font-medium text-ink-400 group-hover:text-accent transition-colors">
                    Learn more
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
            </div>
        </motion.button>
    );
}
