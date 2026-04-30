"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Receipt, Package, Users, BarChart3 } from "lucide-react";

const modules = [
    { icon: Receipt, title: "Billing", subtitle: "GST-compliant invoices in seconds.", desc: "Generate B2B & B2C invoices with auto-tax calculation, e-invoicing, and instant share via WhatsApp or email.", color: "from-blue-500 to-cyan-500" },
    { icon: Package, title: "Inventory", subtitle: "Stock that thinks for itself.", desc: "Real-time tracking, low-stock alerts, batch & expiry management — across unlimited locations.", color: "from-purple-500 to-pink-500" },
    { icon: Users, title: "CRM", subtitle: "Every customer, perfectly understood.", desc: "Unified profiles for customers and vendors. Loyalty, credit, and payment history at a glance.", color: "from-orange-500 to-red-500" },
    { icon: BarChart3, title: "Reports", subtitle: "Decisions backed by data.", desc: "Profit & loss, GSTR-ready statements, cash flow projections — exported in one tap.", color: "from-emerald-500 to-teal-500" },
];

export default function ScrollStory() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    return (
        <section ref={ref} className="relative" style={{ height: `${modules.length * 100}vh` }}>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ModuleText({ m, i, total, scrollYProgress }: { m: any, i: number, total: number, scrollYProgress: MotionValue<number> }) {
    const start = i / total;
    const end = (i + 1) / total;
    const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [start, end], [0, -40]);

    return (
        <motion.div style={{ opacity, y }} className="absolute inset-0">
            <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-6">
                0{i + 1} — Module
            </div>
            <h3 className="font-display text-6xl md:text-7xl font-semibold tracking-tightest text-ink-950 mb-4">
                {m.title}
            </h3>
            <p className="text-2xl text-ink-600 font-light tracking-tight mb-6">{m.subtitle}</p>
            <p className="text-base text-ink-400 max-w-md leading-relaxed">{m.desc}</p>
        </motion.div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ModuleCard({ m, i, total, scrollYProgress }: { m: any, i: number, total: number, scrollYProgress: MotionValue<number> }) {
    const start = i / total;
    const end = (i + 1) / total;
    const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.85, 1, 1, 1.1]);

    const Icon = m.icon;
    return (
        <motion.div
            style={{ opacity, scale }}
            className="absolute w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-ink-950/10"
        >
            <div className={`w-full h-full bg-gradient-to-br ${m.color} p-10 flex flex-col justify-between`}>
                <Icon size={48} strokeWidth={1.5} className="text-white" />
                <div className="text-white">
                    <div className="text-xs uppercase tracking-widest opacity-70">ProBiz</div>
                    <div className="text-4xl font-semibold tracking-tight mt-1">{m.title}</div>
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