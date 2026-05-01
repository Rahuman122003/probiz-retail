"use client";
import { motion } from "framer-motion";
import Magnetic from "./ui/Magnetic";
import Link from "next/link";

export default function PageCTA() {
    return (
        <section className="relative py-20 sm:py-32 md:py-40 bg-ink-950 text-white overflow-hidden">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full opacity-15 blur-3xl"
                style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
            />
            <div className="relative max-w-3xl mx-auto px-5 sm:px-6 text-center">
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95]">
                    Ready to get started?
                </h2>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/50 font-light">
                    Free for 30 days. No credit card required.
                </p>
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <Magnetic>
                        <Link href="/pricing" className="w-full sm:w-auto inline-block text-center px-8 py-4 rounded-full bg-white text-ink-950 font-medium text-sm">
                            Start Free Trial
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link href="/contact" className="w-full sm:w-auto inline-block text-center px-8 py-4 rounded-full border border-white/20 text-sm">
                            Contact Sales →
                        </Link>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
}
