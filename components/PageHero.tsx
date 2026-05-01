"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { WordReveal } from "./ui/TextReveal";

interface PageHeroProps {
    label: string;
    title: string;
    titleAccent?: string;
    description: string;
}

export default function PageHero({ label, title, titleAccent, description }: PageHeroProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden mesh-bg pt-24 sm:pt-32 pb-16 sm:pb-20">
            <div className="noise" />
            <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full opacity-20 blur-3xl"
                style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] sm:text-[12px] font-medium text-ink-600 mb-6 sm:mb-8"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {label}
                </motion.div>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-ultra leading-[0.92] text-ink-950">
                    <WordReveal text={title} />
                    {titleAccent && (
                        <>
                            <br />
                            <span className="italic font-light text-gradient-accent">
                                <WordReveal text={titleAccent} delay={0.3} />
                            </span>
                        </>
                    )}
                </h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-ink-400 max-w-2xl mx-auto font-light tracking-tight"
                >
                    {description}
                </motion.p>
            </motion.div>
        </section>
    );
}
