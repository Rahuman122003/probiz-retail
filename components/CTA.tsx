"use client";
import { motion } from "framer-motion";
import { WordReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";

export default function CTA() {
    return (
        <section className="relative py-32 md:py-48 bg-ink-950 text-white overflow-hidden">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full opacity-20 blur-3xl"
                style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
            />
            <div className="relative max-w-5xl mx-auto px-6 text-center">
                <h2 className="font-display text-6xl md:text-9xl font-semibold tracking-ultra leading-[0.92]">
                    <WordReveal text="Start scaling" />
                    <br />
                    <span className="italic font-light text-gradient-accent"><WordReveal text="today." delay={0.3} /></span>
                </h2>
                <motion.p
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }}
                    className="mt-10 text-xl text-white/60 font-light max-w-xl mx-auto"
                >
                    Free for 30 days. No card required. Cancel anytime.
                </motion.p>
                <div className="mt-12 flex items-center justify-center gap-4">
                    <Magnetic>
                        <button className="px-8 py-4 rounded-full bg-white text-ink-950 font-medium text-sm">Get Started</button>
                    </Magnetic>
                    <Magnetic>
                        <button className="px-8 py-4 rounded-full border border-white/20 text-sm">Book Demo →</button>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
}