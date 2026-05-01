"use client";
import { motion } from "framer-motion";
import { Users, MessageSquare, Calendar, Award } from "lucide-react";

const channels = [
    { icon: MessageSquare, title: "Discussion Forum", desc: "Ask questions, share tips, and connect with other ProBiz users.", members: "8,400+", cta: "Join Forum" },
    { icon: Users, title: "WhatsApp Groups", desc: "Regional groups for local business owners to connect and collaborate.", members: "3,200+", cta: "Join Group" },
    { icon: Calendar, title: "Monthly Webinars", desc: "Live sessions with product updates, tips & tricks, and Q&A.", members: "500+ avg", cta: "Register" },
    { icon: Award, title: "ProBiz Champions", desc: "Top users who help others and get early access to new features.", members: "120", cta: "Apply" },
];

const stats = [
    { value: "12,000+", label: "Community members" },
    { value: "4,200+", label: "Questions answered" },
    { value: "96%", label: "Response rate" },
    { value: "< 2hrs", label: "Avg response time" },
];

export default function CommunityContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-5 sm:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                    {stats.map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="text-center p-4 sm:p-6 rounded-2xl bg-ink-50">
                            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-gradient-accent">{s.value}</div>
                            <div className="text-xs text-ink-400 mt-1">{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                    {channels.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="p-6 sm:p-8 rounded-2xl border border-ink-100 hover:border-accent/20 hover:shadow-lg transition-all">
                                <Icon size={28} strokeWidth={1.5} className="text-accent mb-4" />
                                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2">{c.title}</h3>
                                <p className="text-sm text-ink-400 leading-relaxed mb-4">{c.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-ink-400">{c.members} members</span>
                                    <button className="text-sm font-medium text-accent hover:underline">{c.cta} →</button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
