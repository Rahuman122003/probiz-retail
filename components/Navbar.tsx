"use client";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Magnetic from "./ui/Magnetic";

const navLinks = [
    { label: "Features", href: "/features" },
    { label: "AI Camera", href: "/ai-camera" },
    { label: "POS", href: "/pos" },
    { label: "Pricing", href: "/pricing" },
    { label: "Customers", href: "/customers" },
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <>
            <motion.nav
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/70 backdrop-blur-xl backdrop-saturate-[180%] border-b border-black/5"
                        : "bg-transparent border-b border-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-purple-600" />
                        <span className="font-semibold tracking-tight text-ink-950">Probiz Retail</span>
                    </Link>
                    <ul className="hidden md:flex items-center gap-9 text-[13px] text-ink-600">
                        {navLinks.map((l) => (
                            <li key={l.label}>
                                <Link href={l.href} className="hover:text-ink-900 transition-colors">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-3">
                        <Magnetic>
                            <Link href="/pricing" className="hidden sm:inline-flex text-[13px] font-medium px-4 py-2 rounded-full bg-ink-950 text-white hover:bg-ink-900 transition-colors">
                                Start Free
                            </Link>
                        </Magnetic>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-ink-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-x-0 top-16 z-40 bg-white/95 backdrop-blur-2xl border-b border-ink-100 md:hidden"
                    >
                        <div className="max-w-7xl mx-auto px-5 py-6">
                            <ul className="space-y-1">
                                {navLinks.map((l) => (
                                    <li key={l.label}>
                                        <Link
                                            href={l.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block py-3 px-4 rounded-xl text-base font-medium text-ink-700 hover:bg-ink-50 transition-colors"
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 pt-4 border-t border-ink-100">
                                <Link
                                    href="/pricing"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full text-center py-3 rounded-full bg-ink-950 text-white font-medium text-sm"
                                >
                                    Start Free
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}