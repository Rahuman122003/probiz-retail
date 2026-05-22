"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-5 sm:px-6">
                <div className="grid lg:grid-cols-5 gap-12 sm:gap-16">
                    {/* Form */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="lg:col-span-3">
                        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 sm:mb-8">Send us a message</h2>
                        <form className="space-y-4 sm:space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-1.5">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" placeholder="Rahul" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-1.5">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" placeholder="Sharma" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink-700 mb-1.5">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" placeholder="rahul@company.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink-700 mb-1.5">Company</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" placeholder="Your company name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink-700 mb-1.5">Message</label>
                                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all resize-none" placeholder="Tell us how we can help..." />
                            </div>
                            <button type="submit" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-ink-950 text-white font-medium text-sm hover:bg-ink-800 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Info */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold tracking-tight mb-4">Get in touch</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: Mail, label: "Email", value: "hello@probiz.app" },
                                    { icon: Phone, label: "Phone", value: "+91 99161 99499" },
                                    { icon: MapPin, label: "Office", value: "HSR Layout, Bangalore 560102" },
                                ].map((c, i) => {
                                    const Icon = c.icon;
                                    return (
                                        <div key={i} className="flex items-start gap-3">
                                            <Icon size={18} className="text-accent mt-0.5 flex-shrink-0" />
                                            <div>
                                                <div className="text-xs text-ink-400">{c.label}</div>
                                                <div className="text-sm font-medium">{c.value}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-ink-50">
                            <h4 className="font-semibold mb-2">Looking for support?</h4>
                            <p className="text-sm text-ink-400 leading-relaxed">For existing customers, please visit our <a href="/help" className="text-accent hover:underline">Help Center</a> for faster assistance.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
