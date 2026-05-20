"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Rocket, Zap, Sparkles, Brain, Shield, Heart, Code2, Palette } from "lucide-react";
import { WordReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";

/* ─────────── WebGL Aurora Shader Background ─────────── */
function AuroraCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
        if (!gl) return;

        const vertSrc = `
            attribute vec2 a_pos;
            varying vec2 v_uv;
            void main() {
                v_uv = a_pos * 0.5 + 0.5;
                gl_Position = vec4(a_pos, 0.0, 1.0);
            }
        `;

        // Fragment shader: animated fluid aurora with mouse-reactive warp
        const fragSrc = `
            precision highp float;
            varying vec2 v_uv;
            uniform float u_time;
            uniform vec2 u_res;
            uniform vec2 u_mouse;

            // 2D hash + value noise
            vec2 hash(vec2 p) {
                p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
                return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
            }
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f*f*(3.0-2.0*f);
                return mix(mix(dot(hash(i+vec2(0,0)), f-vec2(0,0)),
                               dot(hash(i+vec2(1,0)), f-vec2(1,0)), u.x),
                           mix(dot(hash(i+vec2(0,1)), f-vec2(0,1)),
                               dot(hash(i+vec2(1,1)), f-vec2(1,1)), u.x), u.y);
            }
            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 5; i++) {
                    v += a * noise(p);
                    p *= 2.0;
                    a *= 0.5;
                }
                return v;
            }

            void main() {
                vec2 uv = v_uv;
                vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
                vec2 p = (uv - 0.5) * aspect;

                // Mouse-reactive warp
                vec2 m = (u_mouse - 0.5) * aspect;
                float dist = length(p - m);
                vec2 warp = (p - m) * 0.15 * exp(-dist * 2.0);
                p -= warp;

                float t = u_time * 0.08;
                float n1 = fbm(p * 1.5 + vec2(t, t * 0.6));
                float n2 = fbm(p * 2.5 + vec2(-t * 0.8, t * 0.4) + n1);
                float n3 = fbm(p * 0.8 + n2 * 0.5 + t);

                // Color palette: orange → amber → red → blue → purple
                vec3 c1 = vec3(0.99, 0.55, 0.20);   // orange
                vec3 c2 = vec3(0.96, 0.74, 0.30);   // amber
                vec3 c3 = vec3(0.93, 0.30, 0.20);   // red
                vec3 c4 = vec3(0.00, 0.40, 1.00);   // accent blue
                vec3 c5 = vec3(0.55, 0.36, 0.96);   // violet

                vec3 col = mix(c1, c2, smoothstep(-0.4, 0.4, n1));
                col = mix(col, c3, smoothstep(0.0, 0.7, n2));
                col = mix(col, c4, smoothstep(0.3, 0.9, n3) * 0.55);
                col = mix(col, c5, smoothstep(0.5, 1.0, n2 * n3) * 0.4);

                // Mouse-centered glow
                float glow = exp(-dist * 1.8) * 0.35;
                col += vec3(1.0, 0.6, 0.3) * glow;

                // Vignette + film grain
                float vig = smoothstep(1.4, 0.3, length((uv - 0.5) * 1.2));
                col *= 0.55 + 0.45 * vig;
                float grain = (fract(sin(dot(uv * u_res, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.04;
                col += grain;

                gl_FragColor = vec4(col, 1.0);
            }
        `;

        const compile = (type: number, src: string) => {
            const s = gl.createShader(type)!;
            gl.shaderSource(s, src);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(s));
                gl.deleteShader(s);
                return null;
            }
            return s;
        };

        const vs = compile(gl.VERTEX_SHADER, vertSrc);
        const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
        if (!vs || !fs) return;
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(prog));
            return;
        }
        gl.useProgram(prog);

        // Fullscreen quad
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "a_pos");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(prog, "u_time");
        const uRes = gl.getUniformLocation(prog, "u_res");
        const uMouse = gl.getUniformLocation(prog, "u_mouse");

        // Smoothed mouse
        let mx = 0.5, my = 0.5;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uRes, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);

        const onMove = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            mouseRef.current.x = (e.clientX - r.left) / r.width;
            mouseRef.current.y = 1.0 - (e.clientY - r.top) / r.height;
        };
        window.addEventListener("pointermove", onMove);

        const start = performance.now();
        let raf = 0;
        const render = () => {
            const t = (performance.now() - start) / 1000;
            // Smooth mouse
            mx += (mouseRef.current.x - mx) * 0.06;
            my += (mouseRef.current.y - my) * 0.06;
            gl.uniform1f(uTime, t);
            gl.uniform2f(uMouse, mx, my);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            raf = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onMove);
            gl.deleteBuffer(buf);
            gl.deleteProgram(prog);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}

/* ─────────── Page ─────────── */
export default function ProxExperience() {
    return (
        <div className="relative bg-ink-950 text-white">
            <SectionOutline />

            {/* HERO with WebGL */}
            <section id="prox-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
                <AuroraCanvas />
                <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950/80 pointer-events-none" />
                <div className="noise opacity-[0.05]" />

                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full grid lg:grid-cols-2 gap-12 items-center">
                    {/* Mascot */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 60 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex justify-center order-2 lg:order-1"
                    >
                        <motion.div
                            animate={{ y: [0, -22, 0], rotate: [-2, 2, -2] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            <Image
                                src="/mascot.png"
                                alt="PROX"
                                width={1000}
                                height={1000}
                                priority
                                className="w-[300px] sm:w-[420px] md:w-[520px] h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
                            />
                        </motion.div>
                        {/* Floor shadow */}
                        <motion.div
                            animate={{ scale: [1, 0.85, 1], opacity: [0.5, 0.3, 0.5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-8 rounded-full bg-black/60 blur-2xl"
                        />
                    </motion.div>

                    {/* Title */}
                    <div className="order-1 lg:order-2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[11px] font-semibold tracking-widest uppercase mb-5"
                        >
                            <Sparkles size={12} className="text-orange-400" />
                            The Probiz Mascot
                        </motion.div>
                        <h1
                            className="font-display text-6xl sm:text-8xl md:text-[10rem] font-semibold tracking-ultra leading-[0.9]"
                            style={{ filter: "drop-shadow(0 8px 30px rgba(251,146,60,0.45)) drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}
                        >
                            <span className="bg-gradient-to-br from-white via-amber-200 to-orange-500 bg-clip-text text-transparent">
                                <WordReveal text="PROX." />
                            </span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-white/70 font-light max-w-lg mx-auto lg:mx-0">
                            A clever little PROX with a rocket on his back — built to make business feel like an adventure.
                        </p>
                        <div className="mt-8 text-[11px] uppercase tracking-[0.3em] text-white/40">
                            ↓ scroll to explore
                        </div>
                    </div>
                </div>
            </section>

            {/* IDENTITY CARD */}
            <section id="prox-identity" className="relative py-24 sm:py-32 bg-ink-950 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "60px 60px"
                }} />
                <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid md:grid-cols-3 gap-4"
                    >
                        {[
                            { label: "Species", value: "Cyber-PROX" },
                            { label: "Origin", value: "Probiz Labs" },
                            { label: "Element", value: "Code · Speed" },
                            { label: "Loadout", value: "Hoodie + Rocket" },
                            { label: "Mission", value: "Empower SMBs" },
                            { label: "Catchphrase", value: "Let's ship it." },
                        ].map((row, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-400/40 hover:bg-white/[0.06] transition-all"
                            >
                                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{row.label}</div>
                                <div className="text-lg font-medium">{row.value}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* THREE SIDES OF PROX */}
            <section id="prox-personality" className="relative py-24 sm:py-32 bg-ink-950 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: "radial-gradient(rgba(251,146,60,0.6) 1px, transparent 1px)",
                    backgroundSize: "28px 28px"
                }} />
                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="max-w-2xl mb-14">
                        <div className="text-[11px] uppercase tracking-[0.3em] text-orange-400 font-semibold mb-4">— Personality</div>
                        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-ultra leading-[0.95]">
                            <WordReveal text="Three sides" />
                            <br />
                            <span className="italic font-light bg-gradient-to-br from-orange-300 to-red-500 bg-clip-text text-transparent">
                                <WordReveal text="of PROX." delay={0.2} />
                            </span>
                        </h2>
                        <p className="mt-5 text-base text-white/55 font-light max-w-lg">
                            Same PROX, three modes — depending on what your business needs at any given moment.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            {
                                src: "/mascot1.png",
                                tag: "STANDBY",
                                title: "The Curious One",
                                body: "Listening. Learning. Always ready to lend a paw — your friendly day-to-day companion across every Probiz product.",
                                tint: "from-blue-500/20 to-indigo-500/10",
                                accent: "text-blue-300",
                                ring: "ring-blue-400/30",
                            },
                            {
                                src: "/mascot.png",
                                tag: "BOOST",
                                title: "The Rocketeer",
                                body: "Jetpack on. PROX flies your data, automates the grunt work, and ships outcomes faster than you can blink.",
                                tint: "from-orange-500/25 to-red-500/15",
                                accent: "text-orange-300",
                                ring: "ring-orange-400/40",
                            },
                            {
                                src: "/mascot2.png",
                                tag: "VICTORY",
                                title: "The Celebrator",
                                body: "Numbers up, charts green. PROX cheers every milestone — because growing a business deserves a happy dance.",
                                tint: "from-emerald-500/20 to-amber-500/15",
                                accent: "text-emerald-300",
                                ring: "ring-emerald-400/30",
                            },
                        ].map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -8 }}
                                className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${m.tint} pointer-events-none`} />
                                <div className="relative aspect-[4/5] flex items-end justify-center pt-8">
                                    {/* Glow ring behind mascot */}
                                    <motion.div
                                        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full blur-3xl ${i === 0 ? "bg-blue-500/30" : i === 1 ? "bg-orange-500/40" : "bg-emerald-500/30"}`}
                                    />
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                                        className="relative z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
                                    >
                                        <Image src={m.src} alt={m.title} width={680} height={1000} className="w-[80%] mx-auto h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />
                                    </motion.div>
                                </div>
                                <div className="relative p-6">
                                    <div className={`text-[10px] tracking-[0.3em] font-semibold mb-2 ${m.accent}`}>{m.tag}</div>
                                    <div className="text-xl font-semibold mb-2">{m.title}</div>
                                    <p className="text-sm text-white/55 font-light leading-relaxed">{m.body}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* POWERS */}
            <section id="prox-powers" className="relative py-24 sm:py-36 bg-gradient-to-b from-ink-950 via-[#0a0a14] to-ink-950 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="max-w-2xl mb-14">
                        <div className="text-[11px] uppercase tracking-[0.3em] text-orange-400 font-semibold mb-4">— Abilities</div>
                        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-ultra leading-[0.95]">
                            <WordReveal text="What PROX" />
                            <br />
                            <span className="italic font-light bg-gradient-to-br from-orange-300 to-red-500 bg-clip-text text-transparent">
                                <WordReveal text="can do." delay={0.2} />
                            </span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: Brain, title: "Think Fast", body: "Reads your data, makes decisions, suggests actions — instantly.", color: "from-orange-400 to-red-500" },
                            { icon: Rocket, title: "Ship Faster", body: "Built for SMBs that hate waiting. Launch features in days, not quarters.", color: "from-amber-400 to-orange-500" },
                            { icon: Shield, title: "Stay Safe", body: "Encrypted, audited, GDPR-friendly. PROX never naps on security.", color: "from-blue-400 to-indigo-500" },
                            { icon: Heart, title: "Be Kind", body: "Cheerful UX, helpful nudges. Software that feels like a friend.", color: "from-pink-400 to-rose-500" },
                        ].map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.6 }}
                                    whileHover={{ y: -6 }}
                                    className="group relative p-6 rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                    <Icon size={22} className="text-orange-400 mb-4" />
                                    <div className="text-lg font-semibold mb-1.5">{p.title}</div>
                                    <p className="text-sm text-white/55 font-light leading-relaxed">{p.body}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PROBIZ GALAXY — products under PROX */}
            <section id="prox-galaxy" className="relative py-24 sm:py-36 bg-ink-950 overflow-hidden">
                {/* Decorative orbits */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px] rounded-full border border-white/[0.06] pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full border border-white/[0.05] pointer-events-none"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.18), transparent 60%)"
                }} />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="text-[11px] uppercase tracking-[0.3em] text-orange-400 font-semibold mb-4">— The Probiz Galaxy</div>
                        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-ultra leading-[0.95]">
                            <WordReveal text="Four products." />
                            <br />
                            <span className="italic font-light bg-gradient-to-br from-orange-300 via-amber-300 to-red-500 bg-clip-text text-transparent">
                                <WordReveal text="One PROX." delay={0.2} />
                            </span>
                        </h2>
                        <p className="mt-5 text-base sm:text-lg text-white/55 font-light max-w-xl mx-auto">
                            PROX isn't just a face — he's the spirit threaded through everything Probiz Technologies builds. Same DNA, four superpowers.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
                        {[
                            {
                                name: "Probiz Connect",
                                tagline: "The nervous system.",
                                desc: "Unified communications, CRM and team workflows. Where every customer, every conversation, every contract lives in one place.",
                                gradient: "from-sky-500 via-blue-500 to-indigo-600",
                                accent: "#1F9CE8",
                                tags: ["CRM", "Comms", "Workflows"],
                                Icon: Brain,
                            },
                            {
                                name: "Probiz Retail",
                                tagline: "The storefront.",
                                desc: "AI-powered POS, GST billing, inventory and accounting — built for Indian retailers who want enterprise muscle without enterprise pain.",
                                gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
                                accent: "#7C3AED",
                                tags: ["POS", "Billing", "GST"],
                                Icon: Rocket,
                            },
                            {
                                name: "ProSmart Energy",
                                tagline: "The grid.",
                                desc: "Real-time energy intelligence — meter every watt, predict every spike, save every rupee. Sustainability meets serious analytics.",
                                gradient: "from-emerald-500 via-teal-500 to-green-600",
                                accent: "#10b981",
                                tags: ["IoT", "Analytics", "ESG"],
                                Icon: Zap,
                            },
                            {
                                name: "BLYN",
                                tagline: "The launchpad.",
                                desc: "A daring new way to grow your brand — fast experiments, instant micro-sites, and AI-crafted campaigns. Built for the next generation of operators.",
                                gradient: "from-orange-500 via-rose-500 to-red-600",
                                accent: "#fb923c",
                                tags: ["Growth", "AI", "Brand"],
                                Icon: Sparkles,
                            },
                        ].map((p, i) => {
                            const Icon = p.Icon;
                            return (
                                <motion.a
                                    key={i}
                                    href="#"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -6 }}
                                    className="group relative p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 overflow-hidden hover:border-white/20 transition-colors block"
                                >
                                    {/* Animated gradient corner */}
                                    <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${p.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700`} />
                                    {/* Hover sweep */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none`}
                                    />

                                    <div className="relative flex items-start justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg`} style={{ boxShadow: `0 10px 30px -10px ${p.accent}` }}>
                                            <Icon size={20} className="text-white" />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">0{i + 1}</span>
                                    </div>

                                    <div className="relative">
                                        <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-1">{p.name}</h3>
                                        <div className="text-sm font-light italic mb-4" style={{ color: p.accent }}>{p.tagline}</div>
                                        <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">{p.desc}</p>

                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {p.tags.map((t) => (
                                                <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-wide text-white/60">{t}</span>
                                            ))}
                                        </div>

                                        <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: p.accent }}>
                                            Powered by PROX <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Footer note */}
                    <div className="mt-14 text-center text-[11px] uppercase tracking-[0.3em] text-white/30">
                        Every product · One spirit · One PROX
                    </div>
                </div>
            </section>

            {/* MADE BY */}
            <section id="prox-credits" className="relative py-24 sm:py-32 bg-ink-950 overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-30 blur-3xl"
                    style={{ background: "radial-gradient(circle at 50% 50%, #fb923c, transparent 60%)" }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-semibold mb-5">— Credits</div>
                        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-ultra leading-[1.0]">
                            Designed, built &amp; loved by
                            <br />
                            <span className="italic font-light bg-gradient-to-r from-[#1F9CE8] via-[#7C3AED] to-[#fb923c] bg-clip-text text-transparent">
                                Probiz Technologies.
                            </span>
                        </h2>
                        <p className="mt-6 text-base sm:text-lg text-white/55 font-light max-w-xl mx-auto">
                            PROX is hand-crafted by our design + engineering team — from concept sketches to render, from personality to product integration.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                                <Palette size={14} className="text-orange-400" /> Design
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                                <Code2 size={14} className="text-blue-400" /> Engineering
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                                <Zap size={14} className="text-amber-400" /> Storytelling
                            </div>
                        </div>

                        <div className="mt-10">
                            <Magnetic>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium shadow-lg shadow-orange-500/30"
                                >
                                    Back to Probiz Retail <span>→</span>
                                </Link>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

/* ─────────── Sticky outline navigator ─────────── */
const OUTLINE_SECTIONS = [
    { id: "prox-hero", label: "Intro" },
    { id: "prox-identity", label: "Identity" },
    { id: "prox-personality", label: "Personality" },
    { id: "prox-powers", label: "Abilities" },
    { id: "prox-galaxy", label: "Galaxy" },
    { id: "prox-credits", label: "Credits" },
];

function SectionOutline() {
    const [active, setActive] = useState("prox-hero");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the entry closest to the top that is intersecting
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );
        OUTLINE_SECTIONS.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const goTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <nav
            aria-label="PROX page outline"
            className="hidden lg:flex fixed top-1/2 right-6 -translate-y-1/2 z-40 flex-col gap-3"
        >
            {OUTLINE_SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                    <button
                        key={s.id}
                        onClick={() => goTo(s.id)}
                        className="group relative flex items-center justify-end gap-3"
                        aria-label={`Go to ${s.label}`}
                    >
                        <span
                            className={`text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300 ${
                                isActive
                                    ? "text-orange-300 opacity-100 translate-x-0"
                                    : "text-white/40 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                            }`}
                        >
                            {s.label}
                        </span>
                        <span
                            className={`block rounded-full transition-all duration-300 ${
                                isActive
                                    ? "w-2.5 h-2.5 bg-orange-400 shadow-[0_0_12px_#fb923c]"
                                    : "w-2 h-2 bg-white/25 group-hover:bg-white/60"
                            }`}
                        />
                    </button>
                );
            })}
        </nav>
    );
}
