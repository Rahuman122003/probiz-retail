"use client";
import { motion } from "framer-motion";
import { FileCheck, Boxes, Brain, ScanLine, ShieldAlert, Mic, Zap, Globe, Lock, BarChart3, Bell, Smartphone } from "lucide-react";

const features = [
    { icon: FileCheck, title: "GST Billing", desc: "Generate B2B & B2C invoices with auto-tax calculation, e-invoicing, and multi-format export. Supports CGST, SGST, IGST with HSN code mapping." },
    { icon: Boxes, title: "Inventory Management", desc: "Real-time stock tracking across unlimited locations. Batch & expiry management, low-stock alerts, and automated reorder points." },
    { icon: Brain, title: "AI Forecasting", desc: "Predict next month's sales with 94% accuracy. Get actionable insights on trends, seasonal patterns, and demand fluctuations." },
    { icon: ScanLine, title: "Expense OCR", desc: "Snap a photo of any receipt and our AI reads, categorizes, and reconciles it automatically. Supports 12+ languages." },
    { icon: ShieldAlert, title: "Fraud Detection", desc: "Real-time anomaly detection across transactions. Catch unusual patterns, duplicate invoices, and suspicious activities instantly." },
    { icon: Mic, title: "Voice Invoicing", desc: "Create complete invoices using just your voice. Supports Hindi, English, Tamil, and 8 more regional languages." },
    { icon: Zap, title: "Instant Payments", desc: "Accept UPI, cards, and net banking. Auto-reconcile payments with invoices. Send payment reminders via WhatsApp." },
    { icon: Globe, title: "Multi-location", desc: "Manage inventory and billing across multiple stores, warehouses, and channels from a single dashboard." },
    { icon: Lock, title: "Bank-grade Security", desc: "256-bit encryption, SOC2 compliance, and automatic backups. Your data is safer with us than in a vault." },
    { icon: BarChart3, title: "Smart Reports", desc: "P&L, cash flow, GSTR-ready statements — all auto-generated. Export in PDF, Excel, or share directly with your CA." },
    { icon: Bell, title: "Smart Alerts", desc: "Get notified about low stock, payment due dates, GST deadlines, and unusual activity. Never miss a beat." },
    { icon: Smartphone, title: "Mobile App", desc: "Full-featured iOS and Android apps. Create invoices, check stock, and manage your business from anywhere." },
];

export default function FeaturesContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.05 }}
                                className="group p-6 sm:p-8 rounded-2xl border border-ink-100 hover:border-ink-200 hover:shadow-lg hover:shadow-ink-950/5 transition-all duration-500 bg-white"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent/10 to-purple-500/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Icon size={20} strokeWidth={1.5} className="text-accent" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 sm:mb-3">{f.title}</h3>
                                <p className="text-sm text-ink-400 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
