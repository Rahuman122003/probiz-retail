"use client";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Scan, CreditCard, Banknote, Smartphone, Receipt, WifiOff, Languages, Split, MonitorSmartphone, Printer, ShoppingCart, Zap, Check } from "lucide-react";
import { WordReveal } from "@/components/ui/TextReveal";

const ease = [0.22, 1, 0.36, 1];

const cartItems = [
    { name: "Organic Green Tea", qty: 2, price: 349, hsn: "0902" },
    { name: "Basmati Rice 5kg", qty: 1, price: 625, hsn: "1006" },
    { name: "Olive Oil 1L", qty: 1, price: 899, hsn: "1509" },
    { name: "Dark Chocolate 70%", qty: 3, price: 199, hsn: "1806" },
];

const speedStats = [
    { metric: "< 3s", label: "Per transaction", title: "Speed" },
    { metric: "50K+", label: "Daily transactions", title: "Scale" },
    { metric: "99.9%", label: "Uptime guaranteed", title: "Reliability" },
    { metric: "0", label: "Training needed", title: "Simplicity" },
];

const bentoFeatures = [
    { icon: Scan, title: "Barcode & QR Scanner", desc: "Scan any barcode or QR code instantly. Supports 1D, 2D, and mobile wallet codes.", size: "lg", gradient: "from-accent to-cyan-500" },
    { icon: CreditCard, title: "Multi-Payment", desc: "Accept UPI, cards, wallets, cash, and store credit — all in one flow.", size: "md", gradient: "from-purple-500 to-pink-500" },
    { icon: Receipt, title: "Smart Receipts", desc: "Thermal print, SMS, WhatsApp, or email. GST-compliant with custom branding.", size: "md", gradient: "from-emerald-500 to-teal-500" },
    { icon: WifiOff, title: "Offline Mode", desc: "Keep billing even when internet drops. Auto-syncs when back online.", size: "sm", gradient: "from-amber-500 to-orange-500" },
    { icon: Languages, title: "Multi-Language", desc: "Interface available in 12+ Indian languages for your team.", size: "sm", gradient: "from-rose-500 to-pink-500" },
    { icon: Split, title: "Split & Hold Bills", desc: "Split payments, hold bills for later, and manage layaway orders with ease.", size: "lg", gradient: "from-indigo-500 to-violet-500" },
];

const hardware = [
    { icon: MonitorSmartphone, name: "POS Terminals" },
    { icon: Scan, name: "Barcode Scanners" },
    { icon: Printer, name: "Receipt Printers" },
    { icon: Banknote, name: "Cash Drawers" },
    { icon: ShoppingCart, name: "Weight Scales" },
    { icon: Smartphone, name: "Mobile Devices" },
];

const terminals = [
    { id: "POS-01", status: "Active", txn: 142, amount: "₹48,320", color: "bg-emerald-500" },
    { id: "POS-02", status: "Processing", txn: 138, amount: "₹45,100", color: "bg-amber-500" },
    { id: "POS-03", status: "Active", txn: 156, amount: "₹52,780", color: "bg-emerald-500" },
    { id: "POS-04", status: "Idle", txn: 89, amount: "₹31,200", color: "bg-ink-400" },
];

export default function POSContent() {
    const subtotal = cartItems.reduce((sum, it) => sum + it.price * it.qty, 0);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    return (
        <>
            {/* ── Interactive POS Terminal ── */}
            <section className="relative py-16 sm:py-24 bg-ink-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4 sm:mb-6">— Terminal Preview</div>
                    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-ink-950 mb-12 sm:mb-16">
                        <WordReveal text="Checkout" />{" "}
                        <span className="italic font-light text-gradient-accent"><WordReveal text="reimagined." delay={0.3} /></span>
                    </h2>

                    <ParallaxTerminal>
                        {/* Floating success bubbles around terminal */}
                        <FloatingPayments />

                        {/* Browser chrome */}
                        <div className="bg-ink-50 px-4 sm:px-6 py-3 flex items-center gap-2 border-b border-ink-100">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="text-[10px] sm:text-xs text-ink-400 mx-auto">probiz.app/pos/terminal-01</div>
                        </div>

                        <div className="p-4 sm:p-6 lg:p-8">
                            <div className="grid lg:grid-cols-5 gap-6">
                                {/* Product list — Left */}
                                <div className="relative lg:col-span-3 space-y-3">
                                    {/* Animated scanner laser beam */}
                                    <ScannerBeam />

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-sm sm:text-base font-semibold text-ink-800">Current Order</div>
                                        <div className="text-[10px] text-ink-400">Invoice #INV-2478</div>
                                    </div>
                                    {/* Header */}
                                    <div className="grid grid-cols-12 gap-2 text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-400 px-3 pb-2 border-b border-ink-100">
                                        <div className="col-span-5">Item</div>
                                        <div className="col-span-2 text-center">HSN</div>
                                        <div className="col-span-2 text-center">Qty</div>
                                        <div className="col-span-3 text-right">Amount</div>
                                    </div>
                                    {cartItems.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease }}
                                            className="grid grid-cols-12 gap-2 items-center px-3 py-2.5 rounded-lg hover:bg-ink-50 transition-colors group"
                                        >
                                            <div className="col-span-5 flex items-center gap-2">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
                                                    className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center flex-shrink-0"
                                                >
                                                    <svg width="10" height="10" viewBox="0 0 10 10" className="text-emerald-600">
                                                        <motion.path
                                                            d="M2 5 L4 7 L8 3"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            initial={{ pathLength: 0 }}
                                                            whileInView={{ pathLength: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: 1 + i * 0.15, duration: 0.3 }}
                                                        />
                                                    </svg>
                                                </motion.div>
                                                <span className="text-xs sm:text-sm font-medium text-ink-700 truncate">{item.name}</span>
                                            </div>
                                            <div className="col-span-2 text-center text-[10px] sm:text-xs text-ink-400 font-mono">{item.hsn}</div>
                                            <div className="col-span-2 text-center text-xs sm:text-sm text-ink-600">{item.qty}</div>
                                            <div className="col-span-3 text-right text-xs sm:text-sm font-semibold text-ink-800">₹{(item.price * item.qty).toLocaleString()}</div>
                                        </motion.div>
                                    ))}
                                    {/* Quick Actions */}
                                    <div className="flex gap-2 pt-4 mt-2 border-t border-ink-100">
                                        {["Discount", "Hold Bill", "Customer"].map((action, i) => (
                                            <motion.button
                                                key={action}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1.5 + i * 0.1 }}
                                                className="px-3 py-1.5 rounded-lg border border-ink-100 text-[10px] sm:text-xs text-ink-500 hover:bg-ink-50 hover:border-ink-200 transition-all"
                                            >
                                                {action}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Panel — Payment */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.5, ease }}
                                    className="lg:col-span-2 rounded-xl sm:rounded-2xl border border-ink-100 bg-ink-50/50 p-4 sm:p-6 flex flex-col"
                                >
                                    <div className="text-xs sm:text-sm font-semibold text-ink-700 mb-4">Payment Summary</div>
                                    <div className="space-y-2 text-xs sm:text-sm flex-1">
                                        <div className="flex justify-between text-ink-500">
                                            <span>Subtotal</span>
                                            <span>₹{subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-ink-500">
                                            <span>GST (18%)</span>
                                            <span>₹{gst.toLocaleString()}</span>
                                        </div>
                                        <div className="border-t border-ink-100 pt-2 mt-2 flex justify-between font-semibold text-ink-900 text-sm sm:text-base">
                                            <span>Total</span>
                                            <motion.span
                                                key={total}
                                                initial={{ scale: 1.2, color: "#0066ff" }}
                                                animate={{ scale: 1, color: "#0a0a0b" }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                ₹{total.toLocaleString()}
                                            </motion.span>
                                        </div>
                                    </div>
                                    {/* Payment methods */}
                                    <div className="mt-4 pt-4 border-t border-ink-100">
                                        <div className="text-[10px] uppercase tracking-wider text-ink-400 mb-3">Pay with</div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { icon: Smartphone, label: "UPI", active: true },
                                                { icon: CreditCard, label: "Card", active: false },
                                                { icon: Banknote, label: "Cash", active: false },
                                            ].map((pm, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                                                        pm.active
                                                            ? "border-accent bg-accent/5 text-accent"
                                                            : "border-ink-100 text-ink-400 hover:border-ink-200"
                                                    }`}
                                                >
                                                    <pm.icon size={16} strokeWidth={1.5} />
                                                    <span className="text-[10px] font-medium">{pm.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Complete Sale Button (magnetic + coin burst) */}
                                    <MagneticCTA />
                                </motion.div>
                            </div>
                        </div>
                    </ParallaxTerminal>
                </div>
            </section>

            {/* ── Live Transaction Ticker ── */}
            <LiveTicker />

            {/* ── Watch a Sale Happen (cinematic receipt) ── */}
            <ReceiptCinematic />

            {/* ── Speed Stats ── */}
            <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {speedStats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                                className="relative border-t border-ink-100 pt-6 group"
                            >
                                {/* Animated underline that grows on view */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease }}
                                    style={{ originX: 0 }}
                                    className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-accent via-purple-500 to-transparent"
                                />
                                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tightest text-gradient-accent">
                                    <AnimatedMetric value={s.metric} delay={i * 0.1} />
                                </div>
                                <div className="text-[10px] sm:text-xs text-ink-400 mt-2">{s.label}</div>
                                <div className="text-sm sm:text-base font-medium text-ink-900 mt-3 sm:mt-4">{s.title}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bento Grid Features ── */}
            <section className="relative py-16 sm:py-24 bg-ink-50">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="max-w-3xl mb-12 sm:mb-16">
                        <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4 sm:mb-6">— POS Features</div>
                        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-ink-950">
                            <WordReveal text="Built for" />{" "}
                            <span className="italic font-light text-gradient-accent"><WordReveal text="speed." delay={0.3} /></span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {bentoFeatures.map((f, i) => {
                            const Icon = f.icon;
                            const isLarge = f.size === "lg";
                            return (
                                <TiltCard
                                    key={i}
                                    index={i}
                                    icon={Icon}
                                    title={f.title}
                                    desc={f.desc}
                                    gradient={f.gradient}
                                    isLarge={isLarge}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Hardware Compatibility ── */}
            <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4 sm:mb-6">— Hardware</div>
                        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-ink-950">
                            <WordReveal text="Works with" />{" "}
                            <span className="italic font-light text-gradient-accent"><WordReveal text="everything." delay={0.3} /></span>
                        </h2>
                    </div>

                    {/* Marquee */}
                    <div className="relative overflow-hidden py-4">
                        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />
                        <motion.div
                            animate={{ x: [0, -960] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="flex gap-6 sm:gap-8"
                        >
                            {[...hardware, ...hardware, ...hardware].map((h, i) => {
                                const Icon = h.icon;
                                return (
                                    <div key={i} className="flex-shrink-0 flex flex-col items-center gap-3 w-28 sm:w-32">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-ink-100 bg-ink-50 flex items-center justify-center group hover:border-accent hover:bg-accent/5 transition-all duration-300">
                                            <Icon size={28} strokeWidth={1.2} className="text-ink-400 group-hover:text-accent transition-colors" />
                                        </div>
                                        <span className="text-[11px] sm:text-xs text-ink-400 font-medium text-center">{h.name}</span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Multi-Terminal Dashboard ── */}
            <section className="relative py-16 sm:py-24 bg-ink-50">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4 sm:mb-6">— Multi-Terminal</div>
                    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-ink-950 mb-12 sm:mb-16">
                        <WordReveal text="One store." />{" "}
                        <span className="italic font-light text-gradient-accent"><WordReveal text="Many terminals." delay={0.3} /></span>
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {terminals.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                                className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 hover:shadow-lg hover:shadow-ink-950/5 transition-all duration-500"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-xs font-semibold text-ink-700 font-mono">{t.id}</div>
                                    <div className="flex items-center gap-1.5">
                                        <motion.span
                                            animate={t.status === "Processing" ? { opacity: [1, 0.3, 1] } : {}}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className={`w-2 h-2 rounded-full ${t.color}`}
                                        />
                                        <span className="text-[10px] text-ink-400">{t.status}</span>
                                    </div>
                                </div>
                                <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-900 mb-1">{t.amount}</div>
                                <div className="text-[10px] sm:text-xs text-ink-400">{t.txn} transactions today</div>
                                {/* Mini bar chart */}
                                <div className="mt-4 flex items-end gap-1 h-8">
                                    {Array.from({ length: 8 }).map((_, j) => {
                                        const h = 20 + Math.sin(j * 1.2 + i * 2) * 60 + 20;
                                        return (
                                            <motion.div
                                                key={j}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.5 + j * 0.05, ease }}
                                                className="flex-1 rounded-sm bg-accent/20"
                                            />
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

/* ──────── Terminal preview wrapper (no tilt) ──────── */
function ParallaxTerminal({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-ink-950/20 border border-ink-200 bg-white"
        >
            {children}
        </motion.div>
    );
}

/* ──────── Magnetic CTA button + coin burst on hover ──────── */
function MagneticCTA() {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useSpring(0, { stiffness: 250, damping: 18 });
    const y = useSpring(0, { stiffness: 250, damping: 18 });
    const [burst, setBurst] = useState(0);

    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    const onHover = () => setBurst((b) => b + 1);

    return (
        <div className="mt-4 relative">
            {/* Coin burst */}
            <AnimatePresence>
                {burst > 0 && (
                    <CoinBurst key={burst} />
                )}
            </AnimatePresence>
            <motion.button
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                onMouseEnter={onHover}
                style={{ x, y }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-ink-950 text-white text-sm font-medium relative overflow-hidden group"
            >
                {/* Shimmer sweep */}
                <motion.span
                    aria-hidden
                    className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{ x: ["0%", "400%"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                    <Zap size={14} />
                    Complete Sale
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
        </div>
    );
}

function CoinBurst() {
    const coins = Array.from({ length: 10 }, (_, i) => i);
    return (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            {coins.map((i) => {
                const angle = (i / coins.length) * Math.PI * 2;
                const dx = Math.cos(angle) * (60 + Math.random() * 30);
                const dy = Math.sin(angle) * (40 + Math.random() * 20) - 20;
                return (
                    <motion.span
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
                        animate={{ x: dx, y: dy, opacity: 0, scale: 1, rotate: 360 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-md shadow-amber-500/40 border border-amber-200"
                    />
                );
            })}
        </div>
    );
}

/* ──────── Live TPS (transactions per second) counter ──────── */
function TPSCounter() {
    const [tps, setTps] = useState(127);
    useEffect(() => {
        const id = setInterval(() => {
            setTps((v) => Math.max(80, Math.min(180, v + Math.round((Math.random() - 0.5) * 14))));
        }, 900);
        return () => clearInterval(id);
    }, []);
    return (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-semibold">TPS</span>
            <motion.span
                key={tps}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-[12px] font-semibold text-emerald-400 tabular-nums"
            >
                {tps}
            </motion.span>
            <span className="text-[9px] text-white/30">/sec</span>
        </div>
    );
}

/* ──────── Cinematic "Watch a sale happen" with thermal receipt ──────── */
const RECEIPT_LINES = [
    { type: "header", a: "PROBIZ RETAIL", b: "" },
    { type: "sub", a: "GST: 27AABCP1234M1Z5", b: "" },
    { type: "sub", a: "Bengaluru · HSR Layout", b: "" },
    { type: "divider" },
    { type: "info", a: "INV-2478", b: "10:42 AM" },
    { type: "divider" },
    { type: "item", a: "Organic Green Tea ×2", b: "₹698" },
    { type: "item", a: "Basmati Rice 5kg", b: "₹625" },
    { type: "item", a: "Olive Oil 1L", b: "₹899" },
    { type: "item", a: "Dark Chocolate ×3", b: "₹597" },
    { type: "divider" },
    { type: "row", a: "Subtotal", b: "₹2,819" },
    { type: "row", a: "GST 18%", b: "₹507" },
    { type: "total", a: "TOTAL", b: "₹3,326" },
    { type: "divider" },
    { type: "info", a: "Paid via UPI", b: "✓" },
    { type: "sub", a: "Thank you for shopping!", b: "" },
];

function ReceiptCinematic() {
    const [printing, setPrinting] = useState(false);
    const [printed, setPrinted] = useState(false);
    const [cycle, setCycle] = useState(0);

    const handlePrint = () => {
        if (printing) return;
        setCycle((c) => c + 1);
        setPrinted(false);
        setPrinting(true);
        const total = RECEIPT_LINES.length * 220 + 1400;
        setTimeout(() => {
            setPrinting(false);
            setPrinted(true);
        }, total);
    };

    return (
        <section className="relative py-20 sm:py-32 bg-gradient-to-b from-ink-50 via-white to-ink-50 overflow-hidden">
            {/* Subtle grid backdrop */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4 sm:mb-6">— Watch a sale happen</div>
                    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[0.95] text-ink-950">
                        <WordReveal text="Tap." />{" "}
                        <span className="italic font-light text-gradient-accent"><WordReveal text="Print." delay={0.2} /></span>{" "}
                        <WordReveal text="Done." delay={0.4} />
                    </h2>
                    <p className="mt-5 sm:mt-6 text-base text-ink-500 max-w-md leading-relaxed">
                        From scan to thermal receipt in under three seconds. GST-compliant, branded, and ready to print, SMS, or WhatsApp — automatically.
                    </p>

                    {/* Print Bill button */}
                    <motion.button
                        onClick={handlePrint}
                        whileHover={{ scale: printing ? 1 : 1.03 }}
                        whileTap={{ scale: printing ? 1 : 0.97 }}
                        disabled={printing}
                        className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-ink-950 text-white text-sm font-medium shadow-xl shadow-ink-950/20 disabled:opacity-70 relative overflow-hidden group"
                    >
                        <motion.span
                            aria-hidden
                            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            animate={{ x: ["0%", "400%"] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
                        />
                        <Printer size={15} className={printing ? "animate-pulse" : ""} />
                        <span className="relative z-10">
                            {printing ? "Printing…" : printed ? "Print New Bill" : "Print Bill"}
                        </span>
                        {!printing && (
                            <span className="relative z-10 ml-1 opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                        )}
                    </motion.button>

                    <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                        {[
                            { k: "2.4s", v: "Avg. checkout" },
                            { k: "100%", v: "GST compliant" },
                            { k: "0", v: "Manual entry" },
                        ].map((x, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease }}
                                className="border-l border-ink-200 pl-3"
                            >
                                <div className="text-xl sm:text-2xl font-semibold text-gradient-accent">{x.k}</div>
                                <div className="text-[10px] text-ink-400 mt-1">{x.v}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Printer + receipt */}
                <div className="relative flex flex-col items-center">
                    {/* Printer */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease }}
                        className="relative w-72 sm:w-80 z-20"
                    >
                        <div className="relative h-28 rounded-t-2xl bg-gradient-to-b from-ink-800 to-ink-950 shadow-2xl shadow-ink-950/40 border-b-2 border-ink-700 overflow-hidden">
                            <div className="absolute top-4 left-4 flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${printing ? "bg-emerald-400 animate-pulse" : printed ? "bg-emerald-400" : "bg-white/30"}`} />
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/60 font-semibold">
                                    {printing ? "Printing" : printed ? "Done" : "Ready"}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 text-[9px] font-mono text-white/40">PROBIZ-T2</div>

                            {/* Print head moving back and forth */}
                            <motion.div
                                aria-hidden
                                className="absolute top-10 left-6 right-6 h-1"
                            >
                                <motion.div
                                    className="w-3 h-1 rounded-sm bg-accent shadow-[0_0_10px_rgba(0,102,255,0.8)]"
                                    animate={printing ? { x: ["0%", "calc(100% - 12px)", "0%"] } : { x: "0%" }}
                                    transition={{ duration: 0.6, repeat: printing ? Infinity : 0, ease: "easeInOut" }}
                                />
                            </motion.div>

                            {/* Slot */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[88%] h-2 bg-ink-950 rounded-b-sm shadow-inner" />
                            {/* LED bar */}
                            <motion.div
                                className="absolute bottom-3 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                                animate={printing ? { opacity: [0.4, 1, 0.4] } : { opacity: printed ? 0.5 : 0.25 }}
                                transition={{ duration: 1.6, repeat: printing ? Infinity : 0 }}
                            />
                        </div>

                        {/* Slot shadow (subtle dark line where paper exits) */}
                        <div aria-hidden className="relative mx-auto w-[86%] h-1 -mt-px bg-gradient-to-b from-ink-950/40 to-transparent z-20" />

                        {/* Receipt paper emerging */}
                        <div className="relative -mt-1 mx-auto w-[86%] z-10 min-h-[40px]">
                            <AnimatePresence mode="wait">
                                {(printing || printed) && (
                                    <ReceiptPaper key={cycle} printing={printing} />
                                )}
                            </AnimatePresence>
                            {!printing && !printed && (
                                <div className="text-center text-[10px] text-ink-400 italic mt-4">Click “Print Bill” to print receipt</div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ReceiptPaper({ printing }: { printing: boolean }) {
    const [revealed, setRevealed] = useState(0);
    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i++;
            setRevealed(i);
            if (i >= RECEIPT_LINES.length) clearInterval(id);
        }, 220);
        return () => clearInterval(id);
    }, []);

    const done = revealed >= RECEIPT_LINES.length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative"
        >
        {/* Subtle wobble while paper is feeding */}
        <motion.div
            animate={printing ? { x: [0, 0.6, -0.6, 0] } : { x: 0 }}
            transition={{ duration: 0.22, repeat: printing ? Infinity : 0, ease: "linear" }}
            className="relative bg-white shadow-2xl shadow-ink-950/30 overflow-hidden"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.12))" }}
        >
            {/* Paper texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0 1px, transparent 1px 4px)" }} />

            <div className="relative px-5 py-5 font-mono text-[11px] text-ink-800 space-y-1">
                {RECEIPT_LINES.map((line, i) => {
                    const visible = i < revealed;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -4 }}
                            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
                            transition={{ duration: 0.25, ease }}
                        >
                            {line.type === "header" && (
                                <div className="text-center font-bold text-[14px] tracking-wider">{line.a}</div>
                            )}
                            {line.type === "sub" && (
                                <div className="text-center text-[10px] text-ink-500">{line.a}</div>
                            )}
                            {line.type === "divider" && (
                                <div className="border-t border-dashed border-ink-300 my-1.5" />
                            )}
                            {line.type === "info" && (
                                <div className="flex justify-between text-[10px] text-ink-500">
                                    <span>{line.a}</span><span>{line.b}</span>
                                </div>
                            )}
                            {line.type === "item" && (
                                <div className="flex justify-between">
                                    <span className="truncate pr-2">{line.a}</span>
                                    <span className="tabular-nums">{line.b}</span>
                                </div>
                            )}
                            {line.type === "row" && (
                                <div className="flex justify-between text-ink-600">
                                    <span>{line.a}</span><span className="tabular-nums">{line.b}</span>
                                </div>
                            )}
                            {line.type === "total" && (
                                <div className="flex justify-between font-bold text-[13px] mt-1">
                                    <span>{line.a}</span><span className="tabular-nums">{line.b}</span>
                                </div>
                            )}
                        </motion.div>
                    );
                })}

                {/* Animated barcode at the bottom */}
                {done && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="pt-3 flex flex-col items-center gap-1"
                    >
                        <div className="flex items-end gap-[2px] h-8">
                            {Array.from({ length: 36 }).map((_, i) => {
                                const w = (i % 3 === 0 ? 2 : 1);
                                const h = 60 + ((i * 37) % 40);
                                return (
                                    <motion.span
                                        key={i}
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ delay: 0.25 + i * 0.012, duration: 0.2 }}
                                        style={{ height: `${h}%`, width: w, originY: 1 }}
                                        className="bg-ink-900"
                                    />
                                );
                            })}
                        </div>
                        <div className="text-[9px] tracking-[0.3em] text-ink-500">2478 · INV</div>
                    </motion.div>
                )}
            </div>

            {/* Zigzag tear edge */}
            <svg className="block w-full h-3 -mt-px" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,0 L0,4 L5,10 L10,4 L15,10 L20,4 L25,10 L30,4 L35,10 L40,4 L45,10 L50,4 L55,10 L60,4 L65,10 L70,4 L75,10 L80,4 L85,10 L90,4 L95,10 L100,4 L105,10 L110,4 L115,10 L120,4 L125,10 L130,4 L135,10 L140,4 L145,10 L150,4 L155,10 L160,4 L165,10 L170,4 L175,10 L180,4 L185,10 L190,4 L195,10 L200,4 L200,0 Z" fill="white" />
            </svg>
        </motion.div>
        {/* Tear-off hint after printing finishes */}
        {done && !printing && (
            <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center justify-center gap-1.5 mt-3 text-[9px] uppercase tracking-[0.25em] text-ink-400 font-semibold"
            >
                <span className="h-px w-6 bg-ink-300" />
                <span>Tear here</span>
                <span className="h-px w-6 bg-ink-300" />
            </motion.div>
        )}
        </motion.div>
    );
}

/* ──────── Animated scanner laser beam over cart items ──────── */
function ScannerBeam() {
    return (
        <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.6, duration: 0.4 }}
            className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-lg"
        >
            <motion.div
                className="absolute left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent 0%, #ef4444 20%, #ef4444 80%, transparent 100%)", boxShadow: "0 0 14px rgba(239,68,68,0.7), 0 0 30px rgba(239,68,68,0.35)" }}
                animate={{ top: ["6%", "94%", "6%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
            />
        </motion.div>
    );
}

/* ──────── Floating payment success bubbles around terminal ──────── */
const PAY_BUBBLES = [
    { label: "UPI · ₹1,247", color: "from-emerald-500 to-teal-500", side: "left", top: "22%" },
    { label: "Card · ₹3,899", color: "from-sky-500 to-blue-600", side: "right", top: "38%" },
    { label: "Cash · ₹560", color: "from-amber-500 to-orange-500", side: "left", top: "60%" },
    { label: "UPI · ₹2,140", color: "from-violet-500 to-purple-600", side: "right", top: "74%" },
];

function FloatingPayments() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick((x) => x + 1), 2200);
        return () => clearInterval(t);
    }, []);
    const current = PAY_BUBBLES[tick % PAY_BUBBLES.length];

    return (
        <div className="hidden md:block pointer-events-none absolute inset-0 z-20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={tick}
                    initial={{ opacity: 0, y: 20, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.85 }}
                    transition={{ duration: 0.6, ease }}
                    style={{ top: current.top, [current.side]: "-12px" } as React.CSSProperties}
                    className="absolute"
                >
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-white text-[11px] font-semibold shadow-xl shadow-ink-950/20 bg-gradient-to-r ${current.color}`}>
                        <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center">
                            <Check size={11} strokeWidth={3} />
                        </span>
                        {current.label}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

/* ──────── Live transaction ticker (between sections) ──────── */
const TICKER_TXNS = [
    { store: "Mumbai · Andheri", amount: "₹2,480", method: "UPI" },
    { store: "Bengaluru · Koramangala", amount: "₹845", method: "Card" },
    { store: "Delhi · Connaught Place", amount: "₹5,120", method: "UPI" },
    { store: "Chennai · T. Nagar", amount: "₹1,290", method: "Cash" },
    { store: "Hyderabad · Banjara Hills", amount: "₹3,675", method: "UPI" },
    { store: "Pune · FC Road", amount: "₹980", method: "Card" },
    { store: "Kolkata · Park Street", amount: "₹4,210", method: "UPI" },
    { store: "Ahmedabad · CG Road", amount: "₹1,560", method: "Cash" },
];

function LiveTicker() {
    return (
        <section className="relative py-6 sm:py-8 bg-ink-950 overflow-hidden border-y border-ink-800">
            <div className="flex items-center justify-between gap-3 px-5 sm:px-6 lg:px-10 mb-3 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <span className="relative flex w-2 h-2">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">Live · processed nationwide</span>
                </div>
                <TPSCounter />
            </div>
            <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-ink-950 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-ink-950 to-transparent z-10" />
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex gap-3 sm:gap-4 whitespace-nowrap"
                >
                    {[...TICKER_TXNS, ...TICKER_TXNS].map((t, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur"
                        >
                            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <Check size={11} strokeWidth={3} />
                            </div>
                            <span className="text-[11px] text-white/60">{t.store}</span>
                            <span className="text-[11px] font-semibold text-white">{t.amount}</span>
                            <span className="text-[10px] text-white/40 font-mono">{t.method}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ──────── Animated metric (counts up where applicable) ──────── */
function AnimatedMetric({ value, delay = 0 }: { value: string; delay?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState(value);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (started) return;
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (!e.isIntersecting) continue;
                    setStarted(true);
                    obs.disconnect();
                    // Parse number out of value
                    const match = value.match(/([\d.]+)/);
                    if (!match) return;
                    const target = parseFloat(match[1]);
                    if (Number.isNaN(target)) return;
                    const prefix = value.slice(0, match.index);
                    const suffix = value.slice((match.index ?? 0) + match[0].length);
                    const start = performance.now() + delay * 1000;
                    const duration = 1500;
                    const isInt = !match[0].includes(".");
                    const step = (now: number) => {
                        const p = Math.max(0, Math.min(1, (now - start) / duration));
                        const eased = 1 - Math.pow(1 - p, 3);
                        const cur = target * eased;
                        const txt = isInt
                            ? Math.round(cur).toLocaleString()
                            : cur.toFixed(1);
                        setShown(`${prefix}${txt}${suffix}`);
                        if (p < 1) requestAnimationFrame(step);
                    };
                    setShown(`${prefix}0${suffix}`);
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.4 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [value, delay, started]);

    return <span ref={ref} className="tabular-nums">{shown}</span>;
}

/* ──────── Bento card (no tilt) with cursor-follow glow ──────── */
function TiltCard({
    index,
    icon: Icon,
    title,
    desc,
    gradient,
    isLarge,
}: {
    index: number;
    icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
    title: string;
    desc: string;
    gradient: string;
    isLarge: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const glowX = useTransform(mx, (v) => `${(v + 0.5) * 100}%`);
    const glowY = useTransform(my, (v) => `${(v + 0.5) * 100}%`);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.08, ease }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={`group relative rounded-2xl sm:rounded-3xl border border-ink-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-ink-950/5 transition-shadow duration-500 ${
                isLarge ? "sm:col-span-2" : ""
            }`}
        >
            {/* Cursor-follow radial glow */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(420px circle at var(--gx) var(--gy), rgba(0,102,255,0.08), transparent 60%)`,
                    // @ts-expect-error: CSS custom properties
                    "--gx": glowX,
                    "--gy": glowY,
                }}
            />
            <div className={`relative p-6 sm:p-8 ${isLarge ? "lg:p-10" : ""}`}>
                <motion.div
                    whileHover={{ rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 0.6 }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                    <Icon size={20} strokeWidth={1.5} className="text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 sm:mb-3">{title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{desc}</p>
            </div>
            {isLarge && (
                <div className="absolute -bottom-8 -right-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-10 blur-2xl bg-gradient-to-br from-accent to-purple-600" />
            )}
            {/* Floating sparkle particles */}
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-accent"
                        style={{ left: `${20 + i * 28}%`, top: "80%" }}
                        animate={{ y: [0, -60, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

