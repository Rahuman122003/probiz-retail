"use client";
import { motion } from "framer-motion";
import { Scan, CreditCard, Banknote, Smartphone, Receipt, WifiOff, Languages, Split, MonitorSmartphone, Printer, ShoppingCart, Zap } from "lucide-react";
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

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease }}
                        className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-ink-950/20 border border-ink-200 bg-white"
                    >
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
                                <div className="lg:col-span-3 space-y-3">
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
                                    {/* Complete Sale Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-4 w-full py-3 sm:py-3.5 rounded-xl bg-ink-950 text-white text-sm font-medium relative overflow-hidden group"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <Zap size={14} />
                                            Complete Sale
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

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
                                className="border-t border-ink-100 pt-6"
                            >
                                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tightest text-gradient-accent">{s.metric}</div>
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
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: i * 0.08, ease }}
                                    className={`group relative rounded-2xl sm:rounded-3xl border border-ink-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-ink-950/5 transition-all duration-500 ${
                                        isLarge ? "sm:col-span-2" : ""
                                    }`}
                                >
                                    <div className={`p-6 sm:p-8 ${isLarge ? "lg:p-10" : ""}`}>
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon size={20} strokeWidth={1.5} className="text-white" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 sm:mb-3">{f.title}</h3>
                                        <p className="text-sm text-ink-400 leading-relaxed">{f.desc}</p>
                                    </div>
                                    {/* Decorative element for large cards */}
                                    {isLarge && (
                                        <div className="absolute -bottom-8 -right-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-10 blur-2xl bg-gradient-to-br from-accent to-purple-600" />
                                    )}
                                </motion.div>
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
