"use client";
import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 150, damping: 15 });
    const sy = useSpring(y, { stiffness: 150, damping: 15 });

    const onMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
    };
    const onLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }}>
            {children}
        </motion.div>
    );
}