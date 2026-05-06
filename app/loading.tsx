"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
            <motion.div
                className="absolute w-[420px] h-[420px] rounded-full opacity-25 blur-3xl"
                style={{ background: "conic-gradient(from 0deg, #0066ff, #8b5cf6, #ec4899, #0066ff)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative flex flex-col items-center gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                >
                    <motion.div
                        className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-br from-accent to-purple-600"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image
                            src="/logo1.png"
                            alt="Probiz Retail"
                            width={389}
                            height={340}
                            priority
                            className="relative w-20 h-20 sm:w-24 sm:h-24 object-contain select-none"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-quicksand font-bold text-base sm:text-lg tracking-tight leading-none select-none"
                >
                    <span style={{ color: "#1F9CE8" }}>Probiz</span>
                    <span className="ml-1.5" style={{ color: "#7C3AED" }}>Retail</span>
                </motion.div>

                <div className="relative w-32 h-[2px] rounded-full bg-ink-100 overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-accent to-purple-600"
                        animate={{ x: ["-100%", "300%"] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </div>
    );
}
