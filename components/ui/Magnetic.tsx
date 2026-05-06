"use client";
import { ReactNode } from "react";

// Magnetic cursor-following effect disabled by request. Renders children unchanged.
export default function Magnetic({ children }: { children: ReactNode; strength?: number }) {
    return <>{children}</>;
}