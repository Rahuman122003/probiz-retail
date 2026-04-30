"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { WordReveal } from "./ui/TextReveal";

const aiFeatures = [
    { title: "Sales Prediction", metric: "94%", label: "Forecast accuracy" },
    { title: "Smart GST Checker", metric: "0", label: "Filing errors" },
    { title: "Credit Risk Scoring", metric: "3.2x", label: "Faster decisions" },
    { title: "Auto Categorization", metric: "12s", label: "Per receipt" },
];

export default function AISection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

    return (
        <section ref={ref} className="relative py-32 md:py-48 bg-ink-950 text-white overflow-hidden">
            <div className="noise opacity-[0.04]" />

            {/* Animated grid */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
            }} />

            <motion.div
                style={{ rotate }}
                className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            >
                <div className="w-full h-full bg-gradient-to-br from-accent via-purple-600 to-pink-600 rounded-full" />
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
                <div className="max-w-4xl">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-6">— Intelligence</div>
                    <h2 className="font-display text-5xl md:text-8xl font-semibold tracking-ultra leading-[0.92]">
                        <WordReveal text="Built with" />{" "}
                        <span className="italic font-light text-gradient-accent"><WordReveal text="intelligence" delay={0.3} /></span>
                        <br />
                        <WordReveal text="at its core." delay={0.5} />
                    </h2>
                    <p className="mt-10 text-xl text-white/60 max-w-xl font-light tracking-tight">
                        Every workflow is supercharged by ProBiz AI — quietly working behind the scenes, so you don&apos;t have to.
                    </p>
                </div>

                <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {aiFeatures.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="border-t border-white/10 pt-6"
                        >
                            <div className="font-display text-6xl font-semibold tracking-tightest text-gradient-accent">{f.metric}</div>
                            <div className="text-xs text-white/40 mt-2">{f.label}</div>
                            <div className="text-base font-medium mt-4">{f.title}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}