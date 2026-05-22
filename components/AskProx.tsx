"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Send, X } from "lucide-react";
import Image from "next/image";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PROX_QUESTIONS = [
    "Why did tea sales spike yesterday?",
    "Forecast next week's revenue",
    "Which products need restocking?",
    "Show top customer this month",
    "Compare this week vs last week",
    "Generate a GST invoice",
    "What's my best-selling category?",
];

export default function AskProx() {
    const [open, setOpen] = useState(false);
    const [bubble, setBubble] = useState(0);
    const [showBubble, setShowBubble] = useState(false);

    // Auto-cycle question bubbles when collapsed
    useEffect(() => {
        if (open) {
            setShowBubble(false);
            return;
        }
        let mounted = true;
        let hideTimer: ReturnType<typeof setTimeout>;
        let nextTimer: ReturnType<typeof setTimeout>;
        const cycle = () => {
            if (!mounted) return;
            setShowBubble(true);
            hideTimer = setTimeout(() => {
                if (mounted) setShowBubble(false);
            }, 3500);
            nextTimer = setTimeout(() => {
                if (!mounted) return;
                setBubble((b) => (b + 1) % PROX_QUESTIONS.length);
                cycle();
            }, 5000);
        };
        const initial = setTimeout(cycle, 1800);
        return () => {
            mounted = false;
            clearTimeout(initial);
            clearTimeout(hideTimer);
            clearTimeout(nextTimer);
        };
    }, [open]);

    return (
        <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-[60] flex flex-col items-end gap-2 pointer-events-none">
            {/* Auto-popup question bubble (when collapsed) */}
            <AnimatePresence>
                {!open && showBubble && (
                    <motion.button
                        key={bubble}
                        type="button"
                        onClick={() => setOpen(true)}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.4, ease }}
                        className="pointer-events-auto relative max-w-[240px] text-left bg-white border border-ink-100 shadow-xl shadow-ink-950/10 rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[12px] text-ink-800 backdrop-blur"
                    >
                        <div className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-violet-600 mb-1">
                            <Sparkles size={10} /> Prox suggests
                        </div>
                        <span className="leading-snug">{PROX_QUESTIONS[bubble]}</span>
                        <span className="absolute -bottom-1 right-5 w-2.5 h-2.5 rotate-45 bg-white border-r border-b border-ink-100" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Expanded chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 14, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 14, scale: 0.96 }}
                        transition={{ duration: 0.35, ease }}
                        className="pointer-events-auto w-[300px] sm:w-[340px] bg-white border border-ink-100 shadow-2xl shadow-ink-950/20 rounded-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between gap-2 px-3.5 py-3 border-b border-ink-100 bg-gradient-to-r from-violet-50 via-white to-sky-50">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-accent to-purple-600 p-[2px] shrink-0">
                                    <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                                        <Image src="/mascot.png" alt="Prox" width={64} height={64} className="w-7 h-7 object-contain" />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[13px] font-semibold tracking-tight leading-none">Ask Prox</div>
                                    <div className="text-[10px] text-ink-400 mt-1">AI assistant · online</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-7 h-7 rounded-md hover:bg-ink-100 flex items-center justify-center text-ink-500"
                                aria-label="Close"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <div className="p-3 space-y-2 max-h-[240px] overflow-y-auto">
                            <div className="text-[10px] text-ink-400 uppercase tracking-wider font-semibold mb-1 px-1">Try asking</div>
                            {PROX_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className="w-full text-left text-[12px] px-3 py-2 rounded-lg bg-ink-50 hover:bg-ink-100 text-ink-700 transition-colors flex items-center gap-2"
                                >
                                    <Sparkles size={11} className="text-violet-500 shrink-0" />
                                    <span className="truncate">{q}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2.5 border-t border-ink-100 bg-ink-50/50">
                            <input
                                type="text"
                                placeholder="Ask anything…"
                                className="flex-1 bg-white border border-ink-100 rounded-lg px-3 py-1.5 text-[12px] outline-none focus:border-accent"
                            />
                            <button className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-600 text-white flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity">
                                <Send size={13} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mascot launcher button */}
            <motion.button
                type="button"
                onClick={() => setOpen((o) => !o)}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="pointer-events-auto relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl shadow-ink-950/30"
                aria-label="Ask Prox"
            >
                {/* Animated halo */}
                <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <span className="absolute inset-[2px] rounded-full bg-white" />
                {/* Ping ring */}
                {!open && (
                    <span className="absolute inset-0 rounded-full bg-violet-500/30 animate-ping" />
                )}
                {/* Mascot image */}
                <motion.span
                    className="absolute inset-[3px] rounded-full overflow-hidden flex items-center justify-center"
                    animate={{ y: [0, -2.5, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image src="/mascot.png" alt="Prox" width={140} height={140} className="w-full h-full object-contain" />
                </motion.span>
                {/* Notification dot */}
                {!open && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">
                        1
                    </span>
                )}
            </motion.button>
        </div>
    );
}
