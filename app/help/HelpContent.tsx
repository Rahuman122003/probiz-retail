"use client";
import { motion } from "framer-motion";
import { Search, MessageCircle, Mail, Phone } from "lucide-react";

const topics = [
    { title: "Getting Started", count: 12, desc: "Setup guides and first steps" },
    { title: "Billing & Invoicing", count: 18, desc: "Creating, managing, and sending invoices" },
    { title: "Inventory", count: 14, desc: "Stock management and tracking" },
    { title: "GST & Compliance", count: 10, desc: "Tax filing and regulatory guides" },
    { title: "AI Features", count: 8, desc: "Forecasting, OCR, and voice" },
    { title: "Account & Billing", count: 6, desc: "Subscription and payment help" },
];

export default function HelpContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-5 sm:px-6">
                {/* Search */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="relative mb-12 sm:mb-16">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300" />
                    <input type="text" placeholder="Search for help..." className="w-full pl-12 pr-4 py-4 rounded-2xl border border-ink-200 text-base focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" />
                </motion.div>

                {/* Topics */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20">
                    {topics.map((t, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className="p-5 sm:p-6 rounded-2xl border border-ink-100 hover:border-accent/20 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold tracking-tight group-hover:text-accent transition-colors">{t.title}</h3>
                                <span className="text-xs text-ink-400 bg-ink-50 px-2 py-1 rounded-full">{t.count} articles</span>
                            </div>
                            <p className="text-sm text-ink-400">{t.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Contact options */}
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 sm:mb-8">Still need help?</h2>
                <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                    {[
                        { icon: MessageCircle, title: "Live Chat", desc: "Chat with our team", avail: "Mon–Sat, 9am–9pm" },
                        { icon: Mail, title: "Email", desc: "support@probiz.app", avail: "24hr response time" },
                        { icon: Phone, title: "Phone", desc: "+91 80 4567 8900", avail: "Mon–Fri, 10am–6pm" },
                    ].map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="p-5 sm:p-6 rounded-2xl bg-ink-50 text-center">
                                <Icon size={24} className="text-accent mx-auto mb-3" />
                                <h3 className="font-semibold mb-1">{c.title}</h3>
                                <p className="text-sm text-ink-600 mb-1">{c.desc}</p>
                                <p className="text-xs text-ink-400">{c.avail}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
