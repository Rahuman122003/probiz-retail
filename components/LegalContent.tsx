"use client";
import { motion } from "framer-motion";

export interface LegalSection {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
}

interface LegalContentProps {
    updated: string;
    intro: string;
    sections: LegalSection[];
}

export default function LegalContent({ updated, intro, sections }: LegalContentProps) {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16"
                >
                    <div className="text-[11px] uppercase tracking-[0.25em] text-ink-400 font-semibold mb-3">
                        Last updated · {updated}
                    </div>
                    <p className="text-base sm:text-lg text-ink-500 leading-relaxed font-light">{intro}</p>
                </motion.div>

                <div className="space-y-12 sm:space-y-16">
                    {sections.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3) }}
                        >
                            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-950 mb-4 sm:mb-5">
                                <span className="text-gradient-accent">0{i + 1}</span>
                                <span className="ml-3">{s.heading}</span>
                            </h2>
                            <div className="space-y-4 text-base sm:text-lg text-ink-500 leading-relaxed font-light">
                                {s.paragraphs.map((p, j) => (
                                    <p key={j}>{p}</p>
                                ))}
                                {s.bullets && (
                                    <ul className="space-y-2.5 pt-2">
                                        {s.bullets.map((b, j) => (
                                            <li key={j} className="flex gap-3 text-base">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-accent to-purple-600 shrink-0" />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
