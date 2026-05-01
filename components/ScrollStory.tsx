"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Receipt, Package, Users, BarChart3, Camera, ScanLine } from "lucide-react";

const modules = [
    { icon: Receipt, title: "Billing", subtitle: "GST-compliant invoices in seconds.", desc: "Generate B2B & B2C invoices with auto-tax calculation, e-invoicing, and instant share via WhatsApp or email.", color: "from-blue-500 to-cyan-500" },
    { icon: Package, title: "Inventory", subtitle: "Stock that thinks for itself.", desc: "Real-time tracking, low-stock alerts, batch & expiry management — across unlimited locations.", color: "from-purple-500 to-pink-500" },
    { icon: Users, title: "CRM", subtitle: "Every customer, perfectly understood.", desc: "Unified profiles for customers and vendors. Loyalty, credit, and payment history at a glance.", color: "from-orange-500 to-red-500" },
    { icon: BarChart3, title: "Reports", subtitle: "Decisions backed by data.", desc: "Profit & loss, GSTR-ready statements, cash flow projections — exported in one tap.", color: "from-emerald-500 to-teal-500" },
    { icon: Camera, title: "AI Camera", subtitle: "Eyes that never blink.", desc: "AI-powered surveillance detects theft in real-time — smart alerts, behavior analysis, and facial recognition across every aisle.", color: "from-red-500 to-rose-600" },
    { icon: ScanLine, title: "POS", subtitle: "Checkout in 3 seconds flat.", desc: "Lightning-fast point of sale with barcode scanning, multi-payment support, GST receipts, and offline mode built in.", color: "from-indigo-500 to-violet-600" },
];

/* ── Desktop: scroll-driven two-column layout ── */
function DesktopScrollStory() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    return (
        <section ref={ref} className="relative hidden lg:block" style={{ height: `${modules.length * 100}vh` }}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT */}
                    <div className="relative h-[400px]">
                        {modules.map((m, i) => <ModuleText key={i} m={m} i={i} total={modules.length} scrollYProgress={scrollYProgress} />)}
                    </div>

                    {/* RIGHT */}
                    <div className="relative h-[500px] flex items-center justify-center">
                        {modules.map((m, i) => <ModuleCard key={i} m={m} i={i} total={modules.length} scrollYProgress={scrollYProgress} />)}
                    </div>
                </div>

                {/* Progress dots */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                    {modules.map((_, i) => <ProgressDot key={i} i={i} total={modules.length} scrollYProgress={scrollYProgress} />)}
                </div>
            </div>
        </section>
    );
}

/* ── Mobile: stacked cards ── */
function MobileScrollStory() {
    return (
        <section className="lg:hidden py-20 sm:py-28 bg-white">
            <div className="max-w-xl mx-auto px-5 sm:px-6 mb-12">
                <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4">— Modules</div>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tightest text-ink-950 leading-[0.95]">
                    Everything your business needs.
                </h2>
            </div>
            <div className="space-y-6 px-5 sm:px-6 max-w-xl mx-auto">
                {modules.map((m, i) => {
                    const Icon = m.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.08 }}
                            className="rounded-3xl overflow-hidden border border-ink-100 bg-white"
                        >
                            <div className={`bg-gradient-to-br ${m.color} p-6 sm:p-8`}>
                                <Icon size={32} strokeWidth={1.5} className="text-white mb-4" />
                                <div className="text-white text-2xl sm:text-3xl font-semibold tracking-tight">{m.title}</div>
                            </div>
                            <div className="p-6 sm:p-8">
                                <p className="text-lg font-light text-ink-700 mb-2">{m.subtitle}</p>
                                <p className="text-sm text-ink-400 leading-relaxed">{m.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

export default function ScrollStory() {
    return (
        <>
            <DesktopScrollStory />
            <MobileScrollStory />
        </>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ModuleText({ m, i, total, scrollYProgress }: { m: any, i: number, total: number, scrollYProgress: MotionValue<number> }) {
    const start = i / total;
    const end = (i + 1) / total;
    // First item starts visible (opacity 1 at start=0)
    const opacityInput = i === 0
        ? [start, end - 0.05, end]
        : [start, start + 0.05, end - 0.05, end];
    const opacityOutput = i === 0
        ? [1, 1, 0]
        : [0, 1, 1, 0];
    const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
    const y = useTransform(scrollYProgress, [start, end], [0, -40]);

    return (
        <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
            <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-6">
                0{i + 1} — Module
            </div>
            <h3 className="font-display text-6xl xl:text-7xl font-semibold tracking-tightest text-ink-950 mb-4">
                {m.title}
            </h3>
            <p className="text-xl xl:text-2xl text-ink-600 font-light tracking-tight mb-6">{m.subtitle}</p>
            <p className="text-base text-ink-400 max-w-md leading-relaxed">{m.desc}</p>
        </motion.div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ModuleCard({ m, i, total, scrollYProgress }: { m: any, i: number, total: number, scrollYProgress: MotionValue<number> }) {
    const start = i / total;
    const end = (i + 1) / total;
    const opacityInput = i === 0
        ? [start, end - 0.05, end]
        : [start, start + 0.05, end - 0.05, end];
    const opacityOutput = i === 0
        ? [1, 1, 0]
        : [0, 1, 1, 0];
    const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
    const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.85, 1, 1, 1.1]);

    const Icon = m.icon;
    return (
        <motion.div
            style={{ opacity, scale }}
            className="absolute w-full max-w-sm xl:max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-ink-950/10"
        >
            <div className={`w-full h-full bg-gradient-to-br ${m.color} p-8 xl:p-10 flex flex-col justify-between`}>
                <Icon size={48} strokeWidth={1.5} className="text-white" />
                <div className="text-white">
                    <div className="text-xs uppercase tracking-widest opacity-70">Probiz Retail</div>
                    <div className="text-3xl xl:text-4xl font-semibold tracking-tight mt-1">{m.title}</div>
                </div>
            </div>
        </motion.div>
    );
}

function ProgressDot({ i, total, scrollYProgress }: { i: number, total: number, scrollYProgress: MotionValue<number> }) {
    const start = i / total;
    const end = (i + 1) / total;
    const scale = useTransform(scrollYProgress, [start, (start + end) / 2, end], [1, 1.5, 1]);
    const bg = useTransform(scrollYProgress, [start, (start + end) / 2, end], ["#d1d1d6", "#0a0a0b", "#d1d1d6"]);
    return <motion.div style={{ scale, backgroundColor: bg }} className="w-1.5 h-1.5 rounded-full" />;
}