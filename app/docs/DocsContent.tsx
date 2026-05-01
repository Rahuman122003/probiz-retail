"use client";
import { motion } from "framer-motion";
import { BookOpen, Code, Zap, Settings, Shield, HelpCircle } from "lucide-react";

const sections = [
    { icon: Zap, title: "Quick Start", desc: "Get up and running with ProBiz in under 5 minutes.", links: ["Create your first invoice", "Import products", "Set up GST details", "Invite team members"] },
    { icon: BookOpen, title: "Guides", desc: "Step-by-step guides for every feature.", links: ["Billing & invoicing", "Inventory management", "AI forecasting setup", "Multi-location config"] },
    { icon: Code, title: "API Reference", desc: "Build custom integrations with our REST API.", links: ["Authentication", "Invoices API", "Products API", "Webhooks"] },
    { icon: Settings, title: "Configuration", desc: "Customize ProBiz for your business needs.", links: ["Tax configuration", "Invoice templates", "Email & WhatsApp setup", "User roles & permissions"] },
    { icon: Shield, title: "Security", desc: "Learn about our security practices.", links: ["Data encryption", "Compliance", "Backup & recovery", "Access controls"] },
    { icon: HelpCircle, title: "FAQ", desc: "Answers to commonly asked questions.", links: ["Billing FAQ", "Technical FAQ", "Migration FAQ", "Pricing FAQ"] },
];

export default function DocsContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {sections.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                className="p-6 sm:p-8 rounded-2xl border border-ink-100 hover:border-accent/20 hover:shadow-md transition-all"
                            >
                                <Icon size={24} strokeWidth={1.5} className="text-accent mb-4" />
                                <h3 className="text-lg font-semibold tracking-tight mb-2">{s.title}</h3>
                                <p className="text-sm text-ink-400 mb-5">{s.desc}</p>
                                <ul className="space-y-2">
                                    {s.links.map((l) => (
                                        <li key={l} className="text-sm text-ink-500 hover:text-accent transition-colors cursor-pointer flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-ink-200" />
                                            {l}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
