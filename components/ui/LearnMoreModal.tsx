"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface LearnMoreItem {
    icon: LucideIcon;
    title: string;
    tagline: string;
    long: string;
    highlights: string[];
}

interface Props {
    item: LearnMoreItem | null;
    onClose: () => void;
    /** Visual theme — "light" for white pages, "dark" for ink-950 pages */
    theme?: "light" | "dark";
}

export default function LearnMoreModal({ item, onClose, theme = "light" }: Props) {
    useEffect(() => {
        if (!item) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [item, onClose]);

    const isDark = theme === "dark";

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-md" />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={item.title}
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className={`relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl shadow-ink-950/30 ${
                            isDark ? "bg-ink-950 border border-white/10" : "bg-white"
                        }`}
                    >
                        <div className="relative p-8 sm:p-10 md:p-12">
                            <motion.div
                                className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
                                style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            />

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className={`absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                                    isDark
                                        ? "text-white/60 hover:text-white hover:bg-white/10"
                                        : "text-ink-500 hover:text-ink-950 hover:bg-ink-100"
                                }`}
                            >
                                <X size={18} />
                            </button>

                            <div className="relative">
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-accent to-purple-600 text-white mb-5 sm:mb-6">
                                    <item.icon size={24} strokeWidth={1.75} />
                                </div>
                                <h3 className={`font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] ${isDark ? "text-white" : "text-ink-950"}`}>
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-base sm:text-lg text-gradient-accent font-medium tracking-tight">
                                    {item.tagline}
                                </p>
                                <p className={`mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed font-light ${isDark ? "text-white/60" : "text-ink-500"}`}>
                                    {item.long}
                                </p>

                                <div className="mt-8 sm:mt-10">
                                    <div className={`text-[11px] uppercase tracking-[0.25em] font-semibold mb-4 sm:mb-5 ${isDark ? "text-white/40" : "text-ink-400"}`}>
                                        Highlights
                                    </div>
                                    <ul className="space-y-3">
                                        {item.highlights.map((h, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                                                className={`flex items-start gap-3 text-sm sm:text-base ${isDark ? "text-white/80" : "text-ink-700"}`}
                                            >
                                                <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-accent to-purple-600 text-white shrink-0">
                                                    <Check size={12} strokeWidth={3} />
                                                </span>
                                                <span className="leading-relaxed">{h}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                                    <a
                                        href="/pricing"
                                        className={`inline-flex items-center justify-center gap-2 text-[13px] font-medium px-5 py-3 rounded-full transition-colors ${
                                            isDark
                                                ? "bg-white text-ink-950 hover:bg-white/90"
                                                : "bg-ink-950 text-white hover:bg-ink-900"
                                        }`}
                                    >
                                        Start Free Trial →
                                    </a>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className={`inline-flex items-center justify-center gap-2 text-[13px] font-medium px-5 py-3 rounded-full border transition-colors ${
                                            isDark
                                                ? "border-white/20 text-white/80 hover:bg-white/5"
                                                : "border-ink-200 text-ink-700 hover:bg-ink-50"
                                        }`}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
