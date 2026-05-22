"use client";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, KeyRound, Server, Eye, FileCheck2 } from "lucide-react";

const pillars = [
    { icon: Lock, title: "Encryption everywhere", desc: "AES-256 at rest, TLS 1.3 in transit. Your data is unreadable to anyone but you." },
    { icon: ShieldCheck, title: "SOC 2 Type II", desc: "Independently audited controls across security, availability, and confidentiality." },
    { icon: KeyRound, title: "Zero-trust access", desc: "SSO, 2FA, role-based permissions, and device-level session control built in." },
    { icon: Server, title: "India-resident data", desc: "Primary data centres located in India, with redundancy across multiple AZs." },
    { icon: Eye, title: "24/7 monitoring", desc: "Round-the-clock SOC, anomaly detection, and automated incident response." },
    { icon: FileCheck2, title: "Compliance-ready", desc: "GDPR, DPDP Act, GST e-invoicing, and ISO 27001 aligned by design." },
];

const practices = [
    { title: "Secure development", desc: "Every commit is reviewed, scanned for vulnerabilities, and tested against OWASP Top 10 before reaching production." },
    { title: "Continuous backups", desc: "Encrypted backups every hour, replicated across regions. Point-in-time recovery up to 30 days." },
    { title: "Penetration testing", desc: "Annual third-party penetration tests and continuous bug bounty for proactive threat discovery." },
    { title: "Incident transparency", desc: "Breach disclosures within 72 hours, plus a public status page with real-time uptime metrics." },
];

export default function SecurityContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-20 sm:mb-28">
                    {pillars.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.06 }}
                                className="group relative p-6 sm:p-8 rounded-2xl border border-ink-100 bg-white hover:border-ink-200 transition-colors overflow-hidden"
                            >
                                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500"
                                    style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
                                />
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-purple-600 text-white mb-5">
                                        <Icon size={20} strokeWidth={1.75} />
                                    </div>
                                    <h3 className="text-lg font-semibold tracking-tight text-ink-950 mb-2">{p.title}</h3>
                                    <p className="text-sm text-ink-400 leading-relaxed">{p.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="max-w-3xl mx-auto mb-16 sm:mb-24">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-4">— Practices</div>
                    <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tightest text-ink-950 leading-[0.95] mb-10 sm:mb-14">
                        Built defensively. <span className="italic font-light text-gradient-accent">By default.</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                        {practices.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                className="p-6 sm:p-8 rounded-2xl border border-ink-100"
                            >
                                <h3 className="text-lg font-semibold tracking-tight mb-2">{v.title}</h3>
                                <p className="text-sm text-ink-400 leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-ink-50 border border-ink-100 text-center"
                >
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink-950 mb-3">Report a vulnerability</h3>
                    <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-light max-w-xl mx-auto mb-6">
                        Security researchers — we welcome responsible disclosure. Email findings to <span className="text-ink-800 font-medium">info@probiretail.com</span>. Eligible reports qualify for our bug bounty program.
                    </p>
                    <a
                        href="mailto:info@probiretail.com"
                        className="inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full bg-ink-950 text-white hover:bg-ink-900 transition-colors"
                    >
                        Contact security team →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
