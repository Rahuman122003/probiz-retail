"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { WordReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";

export default function CTA() {
    return (
        <section className="relative py-24 sm:py-32 md:py-48 bg-ink-950 text-white overflow-hidden">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[800px] sm:h-[1200px] rounded-full opacity-20 blur-3xl"
                style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
            />
            <div className="relative max-w-5xl mx-auto px-5 sm:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center mb-8 sm:mb-10"
                >
                    <div className="relative">
                        <div className="absolute inset-0 blur-2xl opacity-60 bg-gradient-to-br from-accent to-purple-500" />
                        <Image src="/logo1.png" alt="Probiz Retail" width={389} height={340} className="relative w-14 h-14 sm:w-16 sm:h-16 object-contain" />
                    </div>
                </motion.div>
                <h2 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold tracking-ultra leading-[0.92]">
                    <WordReveal text="Start scaling" />
                    <br />
                    <span className="italic font-light text-gradient-accent"><WordReveal text="today." delay={0.3} /></span>
                </h2>
                <motion.p
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }}
                    className="mt-6 sm:mt-10 text-base sm:text-lg md:text-xl text-white/60 font-light max-w-xl mx-auto"
                >
                    Free for 30 days. No card required. Cancel anytime.
                </motion.p>
                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <Magnetic>
                        <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-ink-950 font-medium text-sm">Get Started</button>
                    </Magnetic>
                    <Magnetic>
                        <Link href="/pricing" className="w-full sm:w-auto inline-block text-center px-8 py-4 rounded-full border border-white/20 text-sm hover:bg-white/5 transition-colors">
                            Book Demo →
                        </Link>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
}