"use client";
import { motion } from "framer-motion";

const integrations = [
    { name: "Tally", cat: "Accounting", desc: "Sync invoices and ledgers automatically." },
    { name: "WhatsApp", cat: "Communication", desc: "Send invoices and reminders via WhatsApp." },
    { name: "Razorpay", cat: "Payments", desc: "Accept online payments seamlessly." },
    { name: "Google Sheets", cat: "Productivity", desc: "Export data to spreadsheets in real-time." },
    { name: "Shopify", cat: "E-commerce", desc: "Sync products and orders from your online store." },
    { name: "Amazon", cat: "Marketplace", desc: "Manage Amazon orders and inventory." },
    { name: "Zoho Books", cat: "Accounting", desc: "Two-way sync with Zoho Books." },
    { name: "Stripe", cat: "Payments", desc: "Accept international payments." },
    { name: "Slack", cat: "Communication", desc: "Get real-time business alerts in Slack." },
    { name: "Zapier", cat: "Automation", desc: "Connect with 5000+ apps via Zapier." },
    { name: "PhonePe", cat: "Payments", desc: "Accept UPI payments instantly." },
    { name: "GSTN Portal", cat: "Compliance", desc: "Direct filing to GST portal." },
];

export default function IntegrationsContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {integrations.map((intg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.04 }}
                            className="group p-5 sm:p-6 rounded-2xl border border-ink-100 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500"
                        >
                            <div className="w-10 h-10 rounded-xl bg-ink-100 group-hover:bg-accent/10 transition-colors flex items-center justify-center mb-4 text-sm font-bold text-ink-600 group-hover:text-accent">
                                {intg.name[0]}
                            </div>
                            <div className="text-xs text-accent font-medium mb-1">{intg.cat}</div>
                            <h3 className="text-base sm:text-lg font-semibold tracking-tight mb-1.5">{intg.name}</h3>
                            <p className="text-sm text-ink-400 leading-relaxed">{intg.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
