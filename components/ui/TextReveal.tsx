"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function MaskReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <span className={`inline-block overflow-hidden ${className}`}>
            <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.span>
        </span>
    );
}

export function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.1, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}