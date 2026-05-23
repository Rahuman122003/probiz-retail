"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Respect reduced-motion preference — skip smooth scroll entirely.
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const lenis = new Lenis({
            // Use lerp for a snappier, more responsive feel (lower = snappier)
            lerp: 0.1,
            // Tuned easing — quick out, smooth landing
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            syncTouch: false,
        });

        // Sync Lenis with Framer Motion's useScroll so all scroll-driven animations
        // stay buttery and in lock-step with the smooth scroll.
        let rafId = 0;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Pause Lenis when the tab is hidden (saves CPU & avoids janky catch-up)
        const onVisibility = () => {
            if (document.hidden) lenis.stop();
            else lenis.start();
        };
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("visibilitychange", onVisibility);
            lenis.destroy();
        };
    }, []);
    return <>{children}</>;
}