"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plus, FileText, Package, Sparkles, FileCheck2 } from "lucide-react";

const steps = [
    { n: "01", icon: Plus, title: "Add Product", desc: "Import or create your catalog in one click." },
    { n: "02", icon: FileText, title: "Create Invoice", desc: "GST-compliant in under 10 seconds." },
    { n: "03", icon: Package, title: "Track Inventory", desc: "Stock auto-syncs across every channel." },
    { n: "04", icon: Sparkles, title: "Get AI Insights", desc: "Forecasts, alerts, and smart suggestions." },
    { n: "05", icon: FileCheck2, title: "File GST", desc: "GSTR-1, 3B, and 9 — generated automatically." },
];

export default function Timeline() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

    return (
        <section ref={ref} className="relative h-[400vh] bg-white">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-16">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-6">— How it works</div>
                    <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-ultra leading-[0.95] max-w-3xl">
                        From product to GST,<br />
                        <span className="text-ink-400 font-light italic">in five steps.</span>
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-8 pl-[5%]">
                    {steps.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className="flex-shrink-0 w-[440px] aspect-[4/5] rounded-3xl bg-gradient-to-br from-ink-50 to-white border border-ink-100 p-10 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl" />
                                <div className="relative">
                                    <div className="font-display text-7xl font-semibold tracking-tightest text-ink-100">{s.n}</div>
                                    <Icon size={40} strokeWidth={1.25} className="mt-8 text-ink-950" />
                                </div>
                                <div className="relative">
                                    <div className="text-3xl font-semibold tracking-tight">{s.title}</div>
                                    <div className="text-base text-ink-400 mt-3 max-w-xs leading-relaxed">{s.desc}</div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}