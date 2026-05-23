"use client";
import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, Minus, Sparkles, Zap, Rocket, Building2, Crown } from "lucide-react";

type Plan = {
    id: "starter" | "pro" | "enterprise" | "custom";
    name: string;
    tagline: string;
    monthly: number | null; // null = custom
    Icon: typeof Zap;
    accent: string;
    accentSoft: string;
    highlight?: "popular" | "best-value";
    bullets: string[];
    cta: string;
};

const PLANS: Plan[] = [
    {
        id: "starter",
        name: "Starter",
        tagline: "For single-counter shops just going digital.",
        monthly: 999,
        Icon: Zap,
        accent: "#0ea5e9",
        accentSoft: "#0ea5e91a",
        bullets: [
            "1 store · 1 billing counter",
            "Unlimited GST invoices",
            "Inventory & barcode scanning",
            "Daily sales & GST reports",
            "WhatsApp bill sharing",
            "Mobile + desktop app",
        ],
        cta: "Start with Starter",
    },
    {
        id: "pro",
        name: "Pro",
        tagline: "For growing retailers who want PROX AI on their side.",
        monthly: 1999,
        Icon: Rocket,
        accent: "#fb923c",
        accentSoft: "#fb923c1a",
        highlight: "popular",
        bullets: [
            "Up to 3 stores · 5 counters",
            "PROX AI demand forecasting",
            "Seasonal stock suggestions",
            "Expense OCR + voice invoicing",
            "Customer loyalty & CRM",
            "Priority chat + phone support",
            "API & Tally integration",
        ],
        cta: "Go Pro",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        tagline: "For chains that need AI cameras, multi-store and full control.",
        monthly: 6999,
        Icon: Building2,
        accent: "#a78bfa",
        accentSoft: "#a78bfa1a",
        highlight: "best-value",
        bullets: [
            "Unlimited stores & counters",
            "PROX AI Camera (up to 16 feeds)",
            "Live theft & shrinkage alerts",
            "Multi-store consolidation",
            "Custom reports & dashboards",
            "Dedicated success manager",
            "SSO, RBAC & audit logs",
            "99.9% uptime SLA",
        ],
        cta: "Choose Enterprise",
    },
    {
        id: "custom",
        name: "Custom",
        tagline: "For franchises, large chains & on-premise deployments.",
        monthly: null,
        Icon: Crown,
        accent: "#f43f5e",
        accentSoft: "#f43f5e1a",
        bullets: [
            "Everything in Enterprise",
            "On-premise / private cloud",
            "Custom AI training on your data",
            "White-label & co-branding",
            "Dedicated implementation team",
            "Custom SLA & legal terms",
        ],
        cta: "Contact Sales",
    },
];

/* Comparison table data */
type Cell = boolean | string;
type Row = { feature: string; values: [Cell, Cell, Cell, Cell] };
type Group = { title: string; rows: Row[] };

const COMPARISON: Group[] = [
    {
        title: "Billing & Inventory",
        rows: [
            { feature: "GST-compliant invoicing",        values: [true, true, true, true] },
            { feature: "Billing counters",               values: ["1", "5", "Unlimited", "Unlimited"] },
            { feature: "Stores / locations",             values: ["1", "Up to 3", "Unlimited", "Unlimited"] },
            { feature: "Barcode & QR scanning",          values: [true, true, true, true] },
            { feature: "Multi-store stock transfer",     values: [false, true, true, true] },
            { feature: "Batch & expiry tracking",        values: [false, true, true, true] },
            { feature: "Purchase orders & vendors",      values: [false, true, true, true] },
        ],
    },
    {
        title: "PROX AI Intelligence",
        rows: [
            { feature: "Daily sales summary by PROX",    values: [true, true, true, true] },
            { feature: "Seasonal demand forecasting",    values: [false, true, true, true] },
            { feature: "Auto stock-reorder suggestions", values: [false, true, true, true] },
            { feature: "Voice invoicing (Hindi + Eng.)", values: [false, true, true, true] },
            { feature: "Expense OCR (bill photos)",      values: [false, true, true, true] },
            { feature: "Custom AI model training",       values: [false, false, false, true] },
        ],
    },
    {
        title: "AI Cloud Camera & Vigilance",
        rows: [
            { feature: "Live CCTV monitoring",           values: [false, false, true, true] },
            { feature: "Camera feeds included",          values: ["—", "—", "Up to 16", "Unlimited"] },
            { feature: "Instant theft / shrinkage alerts", values: [false, false, true, true] },
            { feature: "Behaviour detection (loitering, concealment)", values: [false, false, true, true] },
            { feature: "Cloud storage retention",        values: ["—", "—", "30 days", "Custom"] },
        ],
    },
    {
        title: "Customer & Growth",
        rows: [
            { feature: "WhatsApp bill sharing",          values: [true, true, true, true] },
            { feature: "Customer loyalty & CRM",         values: [false, true, true, true] },
            { feature: "SMS / WhatsApp campaigns",       values: [false, true, true, true] },
            { feature: "Online store integration",       values: [false, true, true, true] },
        ],
    },
    {
        title: "Integrations & Security",
        rows: [
            { feature: "Tally / Zoho / Busy export",     values: [false, true, true, true] },
            { feature: "Public API access",              values: [false, true, true, true] },
            { feature: "SSO (Google / Microsoft)",       values: [false, false, true, true] },
            { feature: "Role-based access control",      values: [false, true, true, true] },
            { feature: "Audit logs",                     values: [false, false, true, true] },
            { feature: "On-premise deployment",          values: [false, false, false, true] },
        ],
    },
    {
        title: "Support & SLA",
        rows: [
            { feature: "Email support",                  values: [true, true, true, true] },
            { feature: "Priority chat + phone",          values: [false, true, true, true] },
            { feature: "Dedicated success manager",      values: [false, false, true, true] },
            { feature: "Uptime SLA",                     values: ["—", "99.5%", "99.9%", "Custom"] },
            { feature: "Onboarding & data migration",    values: ["Self-serve", "Guided", "White-glove", "Dedicated team"] },
        ],
    },
];

const YEARLY_DISCOUNT = 0.2; // 20% off

function formatINR(n: number) {
    return n.toLocaleString("en-IN");
}

export default function PricingContent() {
    const [yearly, setYearly] = useState(false);

    return (
        <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
            {/* Soft decorative gradient */}
            <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full blur-3xl opacity-50 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, #fb923c20, transparent 60%)" }} />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                {/* Billing toggle */}
                <div className="flex flex-col items-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-ink-100 border border-ink-200">
                        <button
                            onClick={() => setYearly(false)}
                            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${!yearly ? "text-white" : "text-ink-600 hover:text-ink-900"}`}
                        >
                            {!yearly && (
                                <motion.span
                                    layoutId="billingToggle"
                                    className="absolute inset-0 rounded-full bg-ink-950"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative">Monthly</span>
                        </button>
                        <button
                            onClick={() => setYearly(true)}
                            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${yearly ? "text-white" : "text-ink-600 hover:text-ink-900"}`}
                        >
                            {yearly && (
                                <motion.span
                                    layoutId="billingToggle"
                                    className="absolute inset-0 rounded-full bg-ink-950"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative">Yearly</span>
                            <span className={`relative text-[10px] font-bold px-1.5 py-0.5 rounded-full ${yearly ? "bg-emerald-400/30 text-emerald-100" : "bg-emerald-100 text-emerald-700"}`}>SAVE 20%</span>
                        </button>
                    </div>
                    <p className="mt-4 text-[12px] text-ink-400">All prices in INR · GST extra · Cancel anytime</p>
                </div>

                {/* Plan cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    {PLANS.map((p, i) => {
                        const Icon = p.Icon;
                        const isAccent = p.highlight === "popular";
                        const displayPrice = p.monthly === null
                            ? null
                            : yearly
                                ? Math.round(p.monthly * (1 - YEARLY_DISCOUNT))
                                : p.monthly;
                        return (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                whileHover={{ y: -6 }}
                                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col overflow-hidden transition-shadow ${
                                    isAccent
                                        ? "bg-ink-950 text-white shadow-[0_30px_60px_-20px_rgba(251,146,60,0.4)] ring-1 ring-orange-400/30"
                                        : "bg-white border border-ink-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)]"
                                }`}
                            >
                                {/* Decorative accent corner */}
                                <div
                                    aria-hidden
                                    className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-40 pointer-events-none"
                                    style={{ background: p.accent }}
                                />

                                {/* Badge */}
                                {p.highlight && (
                                    <div className="absolute top-4 right-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                                isAccent ? "bg-orange-500 text-white" : "bg-violet-100 text-violet-700"
                                            }`}
                                        >
                                            {p.highlight === "popular" ? <Sparkles size={9} /> : <Crown size={9} />}
                                            {p.highlight === "popular" ? "Most popular" : "Best value"}
                                        </span>
                                    </div>
                                )}

                                {/* Icon + name */}
                                <div className="relative flex items-center gap-3 mb-5">
                                    <div
                                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                                        style={{
                                            background: isAccent ? `${p.accent}30` : p.accentSoft,
                                            border: `1px solid ${p.accent}40`,
                                        }}
                                    >
                                        <Icon size={18} style={{ color: p.accent }} />
                                    </div>
                                    <div>
                                        <div className={`text-base font-semibold ${isAccent ? "text-white" : "text-ink-900"}`}>{p.name}</div>
                                        <div className={`text-[10px] uppercase tracking-widest font-semibold ${isAccent ? "text-white/40" : "text-ink-400"}`}>
                                            Plan
                                        </div>
                                    </div>
                                </div>

                                {/* Tagline */}
                                <p className={`relative text-[13px] leading-relaxed mb-5 min-h-[3em] ${isAccent ? "text-white/60" : "text-ink-500"}`}>
                                    {p.tagline}
                                </p>

                                {/* Price */}
                                <div className="relative mb-6">
                                    {displayPrice === null ? (
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-4xl sm:text-5xl font-display font-semibold tracking-tight ${isAccent ? "text-white" : "text-ink-900"}`}>
                                                Let's talk
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-baseline gap-1">
                                                <span className={`text-[18px] font-medium ${isAccent ? "text-white/70" : "text-ink-400"}`}>₹</span>
                                                <AnimatePresence mode="wait">
                                                    <motion.span
                                                        key={`${p.id}-${yearly}`}
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -8 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={`text-4xl sm:text-5xl font-display font-semibold tracking-tight tabular-nums ${isAccent ? "text-white" : "text-ink-900"}`}
                                                    >
                                                        {formatINR(displayPrice)}
                                                    </motion.span>
                                                </AnimatePresence>
                                                <span className={`text-sm font-medium ${isAccent ? "text-white/50" : "text-ink-400"}`}>/mo</span>
                                            </div>
                                            <div className={`mt-1 text-[11px] ${isAccent ? "text-white/40" : "text-ink-400"}`}>
                                                {yearly ? (
                                                    <span>billed yearly · ₹{formatINR(displayPrice * 12)}/yr</span>
                                                ) : (
                                                    <span>billed monthly · cancel anytime</span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* CTA */}
                                <Link
                                    href="/contact"
                                    className={`relative w-full inline-block text-center py-3 rounded-full text-sm font-semibold transition-colors mb-6 ${
                                        isAccent
                                            ? "bg-white text-ink-950 hover:bg-ink-100"
                                            : p.id === "custom"
                                                ? "bg-ink-950 text-white hover:bg-ink-800"
                                                : "bg-ink-100 text-ink-900 hover:bg-ink-200"
                                    }`}
                                >
                                    {p.cta}
                                </Link>

                                {/* Bullets */}
                                <ul className="relative space-y-2.5 flex-1">
                                    {p.bullets.map((b) => (
                                        <li key={b} className="flex items-start gap-2.5 text-[13px]">
                                            <span
                                                className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                                                style={{
                                                    background: isAccent ? `${p.accent}30` : p.accentSoft,
                                                }}
                                            >
                                                <Check size={10} style={{ color: p.accent }} strokeWidth={3} />
                                            </span>
                                            <span className={isAccent ? "text-white/80" : "text-ink-600"}>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Note under cards */}
                <div className="mt-8 text-center text-[12px] text-ink-400">
                    Need help choosing? <Link href="/contact" className="text-ink-900 font-medium hover:underline">Talk to our team</Link> — we'll recommend the right plan in under 5 minutes.
                </div>

                {/* Comparison table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="mt-24 sm:mt-32"
                >
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
                        <div className="text-[11px] uppercase tracking-[0.3em] text-orange-500 font-semibold mb-3">— Compare plans</div>
                        <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-ink-950 leading-[1.05]">
                            Every feature, <span className="italic font-light text-ink-500">side by side.</span>
                        </h2>
                        <p className="mt-4 text-base text-ink-500 font-light">
                            Pick the plan that matches where your business is — and where it's heading.
                        </p>
                    </div>

                    {/* Table */}
                    <div className="rounded-3xl border border-ink-100 bg-white shadow-[0_10px_40px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[760px] border-collapse">
                                {/* Sticky header */}
                                <thead className="sticky top-0 z-10">
                                    <tr className="bg-gradient-to-b from-ink-50 to-white border-b border-ink-100">
                                        <th className="text-left p-5 w-[28%] text-[11px] uppercase tracking-widest text-ink-400 font-semibold">
                                            Features
                                        </th>
                                        {PLANS.map((p) => {
                                            const isAccent = p.highlight === "popular";
                                            return (
                                                <th key={p.id} className="p-5 text-center w-[18%]">
                                                    <div className={`inline-flex flex-col items-center ${isAccent ? "" : ""}`}>
                                                        <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: p.accent }}>
                                                            {p.name}
                                                        </div>
                                                        <div className="text-base font-display font-semibold text-ink-900 tabular-nums">
                                                            {p.monthly === null ? (
                                                                "Custom"
                                                            ) : (
                                                                <>₹{formatINR(yearly ? Math.round(p.monthly * (1 - YEARLY_DISCOUNT)) : p.monthly)}<span className="text-[10px] font-medium text-ink-400">/mo</span></>
                                                            )}
                                                        </div>
                                                        {isAccent && (
                                                            <span className="mt-1 px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[9px] font-bold uppercase tracking-widest">
                                                                Popular
                                                            </span>
                                                        )}
                                                    </div>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON.map((group) => (
                                        <Fragment key={group.title}>
                                            <tr>
                                                <td colSpan={5} className="px-5 pt-7 pb-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-ink-500 bg-ink-50/60 border-y border-ink-100">
                                                    {group.title}
                                                </td>
                                            </tr>
                                            {group.rows.map((row) => (
                                                <tr key={group.title + row.feature} className="border-b border-ink-50 hover:bg-orange-50/30 transition-colors">
                                                    <td className="p-4 text-[13px] text-ink-700 font-medium">{row.feature}</td>
                                                    {row.values.map((v, idx) => {
                                                        const p = PLANS[idx];
                                                        const isAccentCol = p.highlight === "popular";
                                                        return (
                                                            <td key={idx} className={`p-4 text-center ${isAccentCol ? "bg-orange-50/40" : ""}`}>
                                                                {typeof v === "boolean" ? (
                                                                    v ? (
                                                                        <span
                                                                            className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                                                                            style={{ background: p.accentSoft }}
                                                                        >
                                                                            <Check size={13} style={{ color: p.accent }} strokeWidth={3} />
                                                                        </span>
                                                                    ) : (
                                                                        <Minus size={14} className="inline text-ink-300" />
                                                                    )
                                                                ) : (
                                                                    <span className="text-[12px] font-medium text-ink-700 tabular-nums">{v}</span>
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </Fragment>
                                    ))}
                                </tbody>
                                {/* Footer row with CTAs */}
                                <tfoot>
                                    <tr className="bg-ink-50/60 border-t border-ink-100">
                                        <td className="p-5"></td>
                                        {PLANS.map((p) => (
                                            <td key={p.id} className="p-4 text-center">
                                                <Link
                                                    href="/contact"
                                                    className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-[12px] font-semibold transition-colors ${
                                                        p.highlight === "popular"
                                                            ? "bg-ink-950 text-white hover:bg-ink-800"
                                                            : "bg-white border border-ink-200 text-ink-900 hover:bg-ink-100"
                                                    }`}
                                                >
                                                    {p.cta}
                                                </Link>
                                            </td>
                                        ))}
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ snippet */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {[
                        { q: "Is GST included?", a: "All prices shown are exclusive of GST. 18% GST will be added to your invoice." },
                        { q: "Can I switch plans later?", a: "Yes — upgrade or downgrade anytime. Pro-rated billing, no penalties." },
                        { q: "What about data migration?", a: "Starter is self-serve; Pro & above include guided onboarding and free data migration from Tally, Marg or any POS." },
                        { q: "Do you offer a free trial?", a: "Yes — 14 days, full access, no credit card. You only pay if you love it." },
                        { q: "Hardware compatibility?", a: "Works with any thermal printer, barcode scanner, weighing scale and cash drawer. No special hardware needed." },
                        { q: "What if I have 50+ stores?", a: "That's the Custom plan — talk to sales for volume pricing, dedicated infra and white-label options." },
                    ].map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, duration: 0.5 }}
                            className="p-5 rounded-2xl bg-white border border-ink-100 hover:border-ink-200 transition-colors"
                        >
                            <div className="text-[14px] font-semibold text-ink-900 mb-1.5">{f.q}</div>
                            <p className="text-[13px] text-ink-500 leading-relaxed">{f.a}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
