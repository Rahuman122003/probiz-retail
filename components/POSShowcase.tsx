"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { CreditCard, Smartphone, Zap, Wifi, Check } from "lucide-react";
import Image from "next/image";
import { WordReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";
import Link from "next/link";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const RECEIPT_ITEMS = [
    { name: "Organic Tea · 250g", qty: 1, price: 349 },
    { name: "Basmati Rice · 5kg", qty: 1, price: 625 },
    { name: "Olive Oil · 1L", qty: 1, price: 899 },
    { name: "Whole Wheat Bread", qty: 2, price: 90 },
    { name: "Free-Range Eggs · 12", qty: 1, price: 158 },
];
const SUBTOTAL = RECEIPT_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
const TAX = Math.round(SUBTOTAL * 0.05);
const TOTAL = SUBTOTAL + TAX;

export default function POSShowcase() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

    return (
        <section ref={ref} className="relative bg-white" style={{ minHeight: "320vh" }}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="noise opacity-[0.03] pointer-events-none" />

                {/* Ambient gradient orbs (on-brand) */}
                <motion.div
                    className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
                    style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Left — POS Scene */}
                        <div className="order-2 lg:order-1 flex justify-center">
                            <POSScene progress={p} />
                        </div>

                        {/* Right Text */}
                        <div className="order-1 lg:order-2">
                            <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4 sm:mb-6">— Point of Sale</div>
                            <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-semibold tracking-ultra leading-[0.92] text-ink-950">
                                <WordReveal text="Checkout in" />
                                <br />
                                <span className="italic font-light text-gradient-accent"><WordReveal text="3 seconds flat." delay={0.3} /></span>
                            </h2>
                            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-ink-400 font-light tracking-tight max-w-md">
                                Scroll to watch a real checkout — card swipe, instant approval, GST-compliant receipt printed in under 3 seconds.
                            </p>

                            <ScrollHints progress={p} />

                            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 sm:gap-6 max-w-sm">
                                {[
                                    { val: "< 3s", label: "Per sale" },
                                    { val: "50K+", label: "Daily txns" },
                                    { val: "99.9%", label: "Uptime" },
                                ].map((s, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                                    >
                                        <div className="text-xl sm:text-2xl font-semibold tracking-tight text-gradient-accent">{s.val}</div>
                                        <div className="text-[10px] text-ink-400 mt-1">{s.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="mt-8 sm:mt-10"
                            >
                                <Magnetic>
                                    <Link href="/pos" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-950 text-white text-sm font-medium hover:bg-ink-900 transition-colors">
                                        Explore POS
                                        <span>→</span>
                                    </Link>
                                </Magnetic>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────── POS scene — card swipe + receipt ─────────── */
function POSScene({ progress }: { progress: MotionValue<number> }) {
    /* Phase map (0..1):
       0.00 – 0.15  Card drops in from top
       0.15 – 0.30  Card swipes into the slot
       0.30 – 0.45  "Approved" pulse on screen
       0.45 – 0.80  Receipt unfurls fully + line items appear
       0.80 – 1.00  Receipt folds (accordion) — wow finish
    */

    // Card
    const cardY = useTransform(progress, [0, 0.15, 0.30, 1], [-260, -10, -110, -110]);
    const cardX = useTransform(progress, [0, 0.15, 1], [60, 0, 0]);
    const cardRot = useTransform(progress, [0, 0.15, 1], [-12, 0, 0]);
    const cardOpacity = useTransform(progress, [0, 0.05, 0.45, 0.52], [0, 1, 1, 0]);

    // POS screen
    const screenStage = useTransform<number, number>(progress, (v) => (v < 0.30 ? 0 : 1));
    const approvedScale = useTransform(progress, [0.28, 0.42], [0, 1]);
    const approvedOpacity = useTransform(progress, [0.28, 0.36, 0.48, 0.56], [0, 1, 1, 0.85]);

    // Slot light
    const slotGlow = useTransform(progress, [0.10, 0.30, 0.45], [0, 1, 0.4]);

    // Receipt unfurl
    const receiptHeight = useTransform(progress, [0.45, 0.80], ["0%", "100%"]);
    const receiptOpacity = useTransform(progress, [0.45, 0.50], [0, 1]);

    // Subtle terminal float
    const terminalY = useTransform(progress, [0, 0.5, 1], [0, -6, -12]);

    return (
        <div className="relative w-full max-w-[440px]" style={{ height: "min(78vh, 720px)", perspective: 1200 }}>
            {/* Receipt — behind the terminal */}
            <motion.div
                style={{ height: receiptHeight, opacity: receiptOpacity }}
                className="absolute left-1/2 -translate-x-1/2 top-[58%] w-[74%] origin-top z-0"
            >
                <Receipt progress={progress} />
            </motion.div>

            {/* Terminal */}
            <motion.div
                style={{ y: terminalY }}
                className="absolute inset-x-0 top-0 mx-auto z-10 w-full"
            >
                <Terminal
                    cardY={cardY}
                    cardX={cardX}
                    cardRot={cardRot}
                    cardOpacity={cardOpacity}
                    slotGlow={slotGlow}
                    screenStage={screenStage}
                    approvedScale={approvedScale}
                    approvedOpacity={approvedOpacity}
                />
            </motion.div>
        </div>
    );
}

/* ─────────── Terminal (POS machine) ─────────── */
function Terminal({
    cardY, cardX, cardRot, cardOpacity,
    slotGlow, screenStage, approvedScale, approvedOpacity,
}: {
    cardY: MotionValue<number>;
    cardX: MotionValue<number>;
    cardRot: MotionValue<number>;
    cardOpacity: MotionValue<number>;
    slotGlow: MotionValue<number>;
    screenStage: MotionValue<number>;
    approvedScale: MotionValue<number>;
    approvedOpacity: MotionValue<number>;
}) {
    return (
        <div className="relative mx-auto w-full max-w-[320px]">
            {/* Card (animated above terminal, lands into slot) */}
            <motion.div
                style={{ y: cardY, x: cardX, rotate: cardRot, opacity: cardOpacity }}
                className="absolute left-1/2 -translate-x-1/2 -top-2 z-20 w-[78%] aspect-[1.586/1] rounded-xl overflow-hidden shadow-2xl shadow-ink-950/40"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-accent via-purple-600 to-pink-500" />
                <div className="absolute inset-0" style={{
                    backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.25), transparent 50%), radial-gradient(circle at 20% 80%, rgba(0,0,0,0.25), transparent 50%)"
                }} />
                {/* Chip */}
                <div className="absolute top-3 left-3 w-7 h-5 sm:w-8 sm:h-6 rounded-[3px] bg-gradient-to-br from-yellow-200 to-yellow-500 shadow-inner" />
                {/* Wifi (contactless) */}
                <Wifi size={14} className="absolute top-3 right-3 text-white/80 rotate-90" />
                {/* Number */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white/85 font-mono text-[9px] sm:text-[10px] tracking-widest">
                    <span>4242</span><span>••••</span><span>••••</span><span>9012</span>
                </div>
                {/* Brand text */}
                <div className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60 text-[8px] tracking-widest font-semibold">PROBIZ</div>
            </motion.div>

            {/* Glow under terminal */}
            <div className="absolute -inset-4 -z-10 rounded-[36px] blur-2xl opacity-50" style={{ background: "radial-gradient(60% 60% at 50% 60%, rgba(0,102,255,0.25), transparent 70%)" }} />

            {/* Terminal body — premium */}
            <div className="relative rounded-[32px] p-3 pb-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45),0_8px_24px_-8px_rgba(0,0,0,0.3)] border border-white/10"
                 style={{ background: "linear-gradient(180deg, #0f1115 0%, #0a0c10 50%, #07080b 100%)" }}>
                {/* Top metallic highlight */}
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                {/* Side power button */}
                <div className="absolute -right-1 top-16 w-1 h-8 rounded-r-md bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
                <div className="absolute -left-1 top-12 w-1 h-5 rounded-l-md bg-white/10" />
                <div className="absolute -left-1 top-20 w-1 h-5 rounded-l-md bg-white/10" />

                {/* Brand bezel */}
                <div className="flex items-center justify-between px-2 mb-2">
                    <div className="flex items-center gap-1.5">
                        <Image src="/logo1.png" alt="" width={389} height={340} className="w-3.5 h-3.5 object-contain opacity-90" />
                        <span className="font-quicksand font-bold text-[9px] tracking-tight leading-none">
                            <span style={{ color: "#1F9CE8" }}>Probiz</span>
                            <span className="ml-0.5" style={{ color: "#A78BFA" }}>POS</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                            <span key={i} className="w-1 h-1 rounded-full bg-white/20" />
                        ))}
                    </div>
                </div>

                {/* Screen */}
                <div className="relative rounded-2xl bg-white overflow-hidden border border-ink-100" style={{ aspectRatio: "1 / 0.85" }}>
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-3 py-1.5 text-[8px] font-mono text-ink-400 border-b border-ink-100">
                        <span>PROBIZ POS</span>
                        <div className="flex items-center gap-1">
                            <Wifi size={8} />
                            <span>4G</span>
                            <span>· 100%</span>
                        </div>
                    </div>

                    {/* Stage 0 — awaiting payment */}
                    <motion.div
                        style={{ opacity: useTransform(screenStage, (v) => (v === 0 ? 1 : 0)) }}
                        className="absolute inset-x-0 top-6 bottom-0 p-3 flex flex-col"
                    >
                        <div className="text-[9px] text-ink-400 mb-1">Total due</div>
                        <div className="font-display text-2xl sm:text-3xl font-semibold text-ink-950 tracking-tight">₹{TOTAL.toLocaleString("en-IN")}</div>
                        <div className="mt-2 grid grid-cols-3 gap-1.5">
                            {[
                                { i: Smartphone, l: "UPI" },
                                { i: CreditCard, l: "Card", active: true },
                                { i: Zap, l: "Quick" },
                            ].map((m, idx) => {
                                const Icon = m.i;
                                return (
                                    <div key={idx} className={`flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-md border text-[8px] font-medium ${m.active ? "border-accent bg-accent/5 text-accent" : "border-ink-100 text-ink-400"}`}>
                                        <Icon size={11} strokeWidth={1.6} />
                                        {m.l}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-auto text-center">
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                                className="text-[9px] font-medium text-accent"
                            >
                                ↓ Insert or tap card
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Stage 1 — approved */}
                    <motion.div
                        style={{ opacity: useTransform(screenStage, (v) => (v === 1 ? 1 : 0)) }}
                        className="absolute inset-x-0 top-6 bottom-0 flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white"
                    >
                        <motion.div
                            style={{ scale: approvedScale, opacity: approvedOpacity }}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                        >
                            <Check size={24} strokeWidth={3} className="text-white" />
                        </motion.div>
                        <motion.div style={{ opacity: approvedOpacity }} className="mt-2 text-sm font-semibold text-emerald-700">Approved</motion.div>
                        <motion.div style={{ opacity: approvedOpacity }} className="text-[9px] text-ink-400 mt-0.5">₹{TOTAL.toLocaleString("en-IN")} · CARD ••9012</motion.div>
                    </motion.div>
                </div>

                {/* Card slot — premium with inner shadow & lit edge */}
                <div className="relative mt-3 mx-auto w-[82%] h-2.5 rounded-full bg-black overflow-hidden" style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8), inset 0 -1px 0 rgba(255,255,255,0.06)" }}>
                    <motion.div style={{ opacity: slotGlow }} className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
                        <motion.div
                            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            animate={{ x: ["-100%", "300%"] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                </div>

                {/* Keypad with subtle row dividers */}
                <div className="mt-3 grid grid-cols-3 gap-1.5 px-1">
                    {["1","2","3","4","5","6","7","8","9","*","0","#"].map((k, i) => (
                        <div key={i} className="aspect-[2/1] rounded-md flex items-center justify-center text-[11px] text-white/70 font-medium border border-white/[0.06]"
                             style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 0 rgba(0,0,0,0.4)" }}>
                            {k}
                        </div>
                    ))}
                </div>

                {/* Bottom branding strip */}
                <div className="mt-3 flex items-center justify-between px-2 pt-2 border-t border-white/5 text-[8px] text-white/30 tracking-widest font-mono">
                    <span>MODEL P-300</span>
                    <span>EMV · NFC · PIN</span>
                </div>
            </div>
        </div>
    );
}

/* ─────────── Receipt — unfurls then accordion-folds ─────────── */
function Receipt({ progress }: { progress: MotionValue<number> }) {
    const visibleItems = RECEIPT_ITEMS.length;

    /* Accordion fold (0.82 → 1.00):
       Split the receipt into 4 horizontal panels; alternately rotate +/- around X axis to fold like a concertina.
       The whole receipt also lifts upward and shrinks slightly. */
    const foldT = useTransform(progress, [0.82, 1], [0, 1]);
    const foldA = useTransform(foldT, [0, 1], [0, -65]);   // even panels
    const foldB = useTransform(foldT, [0, 1], [0, 65]);    // odd panels
    const liftY = useTransform(foldT, [0, 1], [0, -40]);
    const scale = useTransform(foldT, [0, 1], [1, 0.92]);
    const shadow = useTransform(foldT, [0, 1], [
        "0 25px 40px -20px rgba(0,0,0,0.18)",
        "0 35px 60px -10px rgba(0,0,0,0.30)",
    ]);

    const panels: { rotateX: MotionValue<number>; origin: string }[] = [
        { rotateX: foldA, origin: "bottom" },
        { rotateX: foldB, origin: "top" },
        { rotateX: foldA, origin: "bottom" },
        { rotateX: foldB, origin: "top" },
    ];

    return (
        <motion.div
            style={{ y: liftY, scale, boxShadow: shadow as unknown as string, transformStyle: "preserve-3d" }}
            className="relative w-full"
        >
            {/* Tear edge top */}
            <div className="h-2 w-full bg-transparent" style={{
                backgroundImage: "radial-gradient(circle at 6px 0, white 5px, transparent 5px)",
                backgroundSize: "12px 8px",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "0 -4px",
            }} />

            {/* PANEL 1 — Header */}
            <motion.div
                style={{ rotateX: panels[0].rotateX, transformOrigin: panels[0].origin, transformStyle: "preserve-3d" }}
                className="bg-white border-x border-ink-100 px-4 pt-3 pb-2 font-mono text-[10px] text-ink-700"
            >
                <div className="text-center border-b border-dashed border-ink-200 pb-2 flex flex-col items-center">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <Image src="/logo1.png" alt="" width={389} height={340} className="w-3.5 h-3.5 object-contain" />
                        <span className="font-sans font-semibold text-ink-950 text-[11px] tracking-tight">
                            <span style={{ color: "#1F9CE8" }}>Probiz</span>
                            <span className="ml-0.5" style={{ color: "#7C3AED" }}>Retail</span>
                        </span>
                    </div>
                    <div className="text-[9px] text-ink-400">GSTIN: 29ABCDE1234F1Z5</div>
                    <div className="text-[9px] text-ink-400 mt-0.5">Bengaluru, KA · 560001</div>
                    <div className="text-[9px] text-ink-400 mt-0.5">Bill #PR-4821 · 06/05/2026</div>
                </div>
            </motion.div>

            {/* PANEL 2 — Items */}
            <motion.div
                style={{ rotateX: panels[1].rotateX, transformOrigin: panels[1].origin, transformStyle: "preserve-3d" }}
                className="bg-white border-x border-ink-100 px-4 py-2 font-mono text-[10px] text-ink-700"
            >
                <div className="flex justify-between text-[8px] uppercase tracking-widest text-ink-400 border-b border-dashed border-ink-200 pb-1 mb-1.5">
                    <span>Item</span><span>Amount</span>
                </div>
                <div className="space-y-1">
                    {RECEIPT_ITEMS.map((it, i) => {
                        const start = 0.50 + (i / visibleItems) * 0.28;
                        const end = start + 0.05;
                        const opacity = useTransform(progress, [start, end], [0, 1]);
                        const y = useTransform(progress, [start, end], [6, 0]);
                        return (
                            <motion.div key={i} style={{ opacity, y }} className="flex justify-between">
                                <span className="truncate pr-2">{it.qty} × {it.name}</span>
                                <span className="tabular-nums">₹{(it.price * it.qty).toLocaleString("en-IN")}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* PANEL 3 — Totals */}
            <motion.div
                style={{ rotateX: panels[2].rotateX, transformOrigin: panels[2].origin, transformStyle: "preserve-3d" }}
                className="bg-white border-x border-ink-100 px-4 py-2 font-mono text-[10px] text-ink-700"
            >
                <div className="border-t border-dashed border-ink-200 pt-2 space-y-1">
                    <RowAt progress={progress} at={0.78} label="Subtotal" value={`₹${SUBTOTAL.toLocaleString("en-IN")}`} />
                    <RowAt progress={progress} at={0.79} label="GST (5%)" value={`₹${TAX.toLocaleString("en-IN")}`} />
                    <RowAt progress={progress} at={0.80} label={<span className="font-semibold text-ink-950">TOTAL</span>} value={<span className="font-semibold text-ink-950">₹{TOTAL.toLocaleString("en-IN")}</span>} bold />
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-dashed border-ink-200">
                    <RowAt progress={progress} at={0.81} label="PAID · Card ••9012" value="✓ Approved" />
                </div>
            </motion.div>

            {/* PANEL 4 — Footer with QR */}
            <motion.div
                style={{ rotateX: panels[3].rotateX, transformOrigin: panels[3].origin, transformStyle: "preserve-3d" }}
                className="bg-white border-x border-ink-100 px-4 pt-2 pb-3 font-mono text-[10px] text-ink-700"
            >
                <motion.div
                    style={{ opacity: useTransform(progress, [0.78, 0.82], [0, 1]) }}
                    className="flex items-center gap-3"
                >
                    {/* Faux QR */}
                    <div className="w-10 h-10 grid grid-cols-5 grid-rows-5 gap-[1px] p-0.5 bg-ink-950 rounded-sm shrink-0">
                        {[...Array(25)].map((_, i) => (
                            <span key={i} className={`block ${[0,1,3,4,5,9,10,13,14,15,16,18,21,22,24].includes(i) ? "bg-white" : "bg-transparent"}`} />
                        ))}
                    </div>
                    <div className="text-[9px] leading-tight text-ink-500">
                        Scan to view bill online · Track returns · Loyalty points
                    </div>
                </motion.div>
                <motion.div
                    style={{ opacity: useTransform(progress, [0.81, 0.84], [0, 1]) }}
                    className="mt-2 text-center text-[9px] text-ink-400"
                >
                    Thank you for shopping with Probiz! ✨
                </motion.div>
            </motion.div>

            {/* Tear edge bottom */}
            <div className="h-2 w-full" style={{
                backgroundImage: "radial-gradient(circle at 6px 8px, white 5px, transparent 5px)",
                backgroundSize: "12px 8px",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "0 4px",
            }} />
        </motion.div>
    );
}

function RowAt({ progress, at, label, value, bold }: { progress: MotionValue<number>; at: number; label: React.ReactNode; value: React.ReactNode; bold?: boolean }) {
    const opacity = useTransform(progress, [at, at + 0.03], [0, 1]);
    const y = useTransform(progress, [at, at + 0.03], [6, 0]);
    return (
        <motion.div style={{ opacity, y }} className={`flex justify-between ${bold ? "text-ink-950" : ""}`}>
            <span>{label}</span>
            <span className="tabular-nums">{value}</span>
        </motion.div>
    );
}

/* Tiny scroll progress hint chip */
function ScrollHints({ progress }: { progress: MotionValue<number> }) {
    const w = useTransform(progress, [0, 1], ["0%", "100%"]);
    return (
        <div className="mt-6 sm:mt-8 max-w-xs">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-ink-400 mb-2">
                <span>Swipe</span>
                <span>Approved</span>
                <span>Receipt</span>
            </div>
            <div className="h-1 rounded-full bg-ink-100 overflow-hidden">
                <motion.div style={{ width: w }} className="h-full bg-gradient-to-r from-accent via-purple-500 to-pink-500" />
            </div>
        </div>
    );
}
