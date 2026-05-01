"use client";
import { motion } from "framer-motion";

const quotes = [
    { q: "ProBiz cut our billing time by 80%. The AI catches mistakes we'd never spot.", a: "Priya Sharma", r: "Founder, Sharma Textiles" },
    { q: "We replaced four tools with ProBiz. Our accountant is finally happy.", a: "Rohan Mehta", r: "CEO, Mehta Electronics" },
    { q: "The forecasting alone has saved us ₹40 lakhs in dead stock this year.", a: "Anjali Verma", r: "COO, Verma Pharma" },
];

const logos = ["TATA", "RELIANCE", "ZOMATO", "PAYTM", "BYJU'S", "OYO"];

export default function Testimonials() {
    return (
        <section className="py-20 sm:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                <div className="text-center mb-12 sm:mb-20">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-ink-500 font-semibold mb-8 sm:mb-10">— Trusted by 12,000+ businesses</div>
                    
                    {/* Looping Marquee — two copies for seamless loop */}
                    <div className="relative flex overflow-hidden w-full opacity-50 before:absolute before:inset-y-0 before:left-0 before:w-20 sm:before:w-32 before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:absolute after:inset-y-0 after:right-0 after:w-20 sm:after:w-32 after:bg-gradient-to-l after:from-white after:to-transparent after:z-10">
                        <motion.div 
                            className="flex gap-x-10 sm:gap-x-16 whitespace-nowrap items-center"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                            {[...logos, ...logos, ...logos, ...logos].map((l, i) => (
                                <div key={i} className="text-lg sm:text-2xl font-bold tracking-widest text-ink-800 flex-shrink-0">{l}</div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {quotes.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-ink-200 hover:border-ink-300 transition-colors flex flex-col justify-between h-full bg-ink-50/50"
                        >
                            <div className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight text-ink-950 leading-relaxed mb-8 sm:mb-10">&quot;{t.q}&quot;</div>
                            <div className="pt-4 sm:pt-6 border-t border-ink-200">
                                <div className="text-sm sm:text-base font-semibold text-ink-950">{t.a}</div>
                                <div className="text-xs sm:text-sm text-ink-500 mt-1 font-medium">{t.r}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}