"use client";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

export function MaskReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "100px" });
    
    return (
        <span ref={ref} className={`inline-block overflow-hidden align-bottom pb-[0.15em] ${className}`}>
            <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : { y: "110%" }}
                transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.span>
        </span>
    );
}

export function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "100px" });
    const words = text.split(" ");
    
    return (
        <span ref={ref} className={className}>
            {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom pb-[0.15em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "110%" }}
                        animate={isInView ? { y: 0 } : { y: "110%" }}
                        transition={{ duration: 1.1, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}