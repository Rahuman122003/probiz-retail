"use client";
import { motion } from "framer-motion";

const articles = [
    { pub: "Economic Times", date: "Mar 2025", title: "Probiz raises Series B to bring AI-powered billing to every Indian business", excerpt: "The Bangalore-based startup has raised $12M to accelerate its AI-first approach to GST compliance and inventory management." },
    { pub: "YourStory", date: "Jan 2025", title: "How Probiz is using voice AI to simplify invoicing in regional languages", excerpt: "With support for 10+ Indian languages, Probiz's voice invoicing feature is making technology accessible to non-English speaking business owners." },
    { pub: "Inc42", date: "Nov 2024", title: "Probiz crosses 10,000 business customers in under 18 months", excerpt: "The rapid growth highlights the demand for unified business management tools in India's MSME sector." },
    { pub: "Mint", date: "Sep 2024", title: "AI in accounting: How Indian startups are automating GST compliance", excerpt: "Probiz's AI engine can predict GST filing errors before they happen, saving businesses thousands in penalties." },
];

export default function PressContent() {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-5 sm:px-6">
                <div className="space-y-6 sm:space-y-8">
                    {articles.map((a, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group p-6 sm:p-8 rounded-2xl border border-ink-100 hover:border-ink-200 hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                                <span className="text-xs font-semibold text-accent">{a.pub}</span>
                                <span className="text-xs text-ink-300">•</span>
                                <span className="text-xs text-ink-400">{a.date}</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 group-hover:text-accent transition-colors">{a.title}</h3>
                            <p className="text-sm text-ink-400 leading-relaxed">{a.excerpt}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
