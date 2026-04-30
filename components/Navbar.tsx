"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "./ui/Magnetic";

export default function Navbar() {
    const { scrollY } = useScroll();
    const blur = useTransform(scrollY, [0, 100], [0, 16]);
    const bg = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.7)"]);
    const border = useTransform(scrollY, [0, 100], ["rgba(0,0,0,0)", "rgba(0,0,0,0.05)"]);

    return (
        <motion.nav
            style={{ backdropFilter: blur.get() ? `blur(${blur.get()}px) saturate(180%)` : "none", backgroundColor: bg, borderBottom: `1px solid`, borderColor: border }}
            className="fixed top-0 inset-x-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-purple-600" />
                    <span className="font-semibold tracking-tight">ProBiz</span>
                </div>
                <ul className="hidden md:flex items-center gap-9 text-[13px] text-ink-600">
                    {["Product", "Features", "AI", "Pricing", "Customers"].map((l) => (
                        <li key={l} className="hover:text-ink-900 transition-colors cursor-pointer">{l}</li>
                    ))}
                </ul>
                <Magnetic>
                    <button className="text-[13px] font-medium px-4 py-2 rounded-full bg-ink-950 text-white hover:bg-ink-900 transition-colors">
                        Start Free
                    </button>
                </Magnetic>
            </div>
        </motion.nav>
    );
}