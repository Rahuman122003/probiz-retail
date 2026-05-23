"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Rocket, Zap, Sparkles, Brain, Shield, Heart, Code2, Palette, CloudRain, Sun, GraduationCap, Snowflake, TrendingUp, Camera, Bell, ShieldAlert, Eye, Package, Activity } from "lucide-react";
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
        let visible = true;
        // Pause rendering when canvas is off-screen — major CPU savings while scrolling
        const io = new IntersectionObserver(
            (entries) => { visible = entries[0]?.isIntersecting ?? true; },
            { threshold: 0 }
        );
        io.observe(canvas);

        const render = () => {
            if (visible && !document.hidden) {
                const t = (performance.now() - start) / 1000;
                mx += (mouseRef.current.x - mx) * 0.06;
                my += (mouseRef.current.y - my) * 0.06;
                gl.uniform1f(uTime, t);
                gl.uniform2f(uMouse, mx, my);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
            raf = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
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

            {/* PROX INSIDE PROBIZ RETAIL — what PROX actually does for retailers */}
            <ProxInRetail />

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

/* ─────────── PROX inside Probiz Retail ─────────── */
const SEASONS = [
    {
        Icon: CloudRain,
        name: "Monsoon",
        period: "Jun – Sep",
        accent: "#38bdf8",
        gradient: "from-sky-500/30 via-blue-500/20 to-indigo-500/10",
        spikes: ["Umbrellas", "Raincoats", "Hot beverages", "Chyawanprash"],
        suggestion: "Stock 3× more umbrellas & ginger tea — last 3 monsoons saw +212% demand in week 2.",
    },
    {
        Icon: GraduationCap,
        name: "Back to School",
        period: "May – Jul",
        accent: "#a78bfa",
        gradient: "from-violet-500/30 via-purple-500/20 to-fuchsia-500/10",
        spikes: ["Notebooks", "Stationery", "Lunch boxes", "Tiffin snacks"],
        suggestion: "Expect +180% notebook & geometry-box sales. Pre-order from your top 2 wholesalers.",
    },
    {
        Icon: Sun,
        name: "Summer",
        period: "Mar – May",
        accent: "#fb923c",
        gradient: "from-amber-500/30 via-orange-500/20 to-red-500/10",
        spikes: ["Cold drinks", "Ice cream", "Sunscreen", "Hand fans"],
        suggestion: "Cold-storage SKUs trend +95%. Push deals on soft-drink combos starting next week.",
    },
    {
        Icon: Snowflake,
        name: "Festive & Winter",
        period: "Oct – Feb",
        accent: "#f472b6",
        gradient: "from-rose-500/30 via-pink-500/20 to-red-500/10",
        spikes: ["Sweets", "Diyas", "Gift hampers", "Dry fruits"],
        suggestion: "Diwali week alone drove ₹4.2L last year. Block 40% extra sweet inventory.",
    },
];

function ProxInRetail() {
    return (
        <section id="prox-retail" className="relative py-24 sm:py-36 bg-gradient-to-b from-ink-950 via-[#0b0a14] to-ink-950 overflow-hidden">
            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
            }} />
            {/* Glow */}
            <motion.div
                aria-hidden
                className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #fb923c 0%, transparent 60%)" }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
                {/* Heading */}
                <div className="max-w-3xl mb-14 sm:mb-20">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-orange-400 font-semibold mb-4">— Inside Probiz Retail</div>
                    <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-ultra leading-[0.95]">
                        <WordReveal text="What PROX does" />
                        <br />
                        <span className="italic font-light bg-gradient-to-br from-orange-300 via-amber-300 to-red-500 bg-clip-text text-transparent">
                            <WordReveal text="for your store." delay={0.2} />
                        </span>
                    </h2>
                    <p className="mt-6 text-base sm:text-lg text-white/60 font-light max-w-2xl leading-relaxed">
                        PROX isn't decorative — he's the brain quietly running in the background of every Probiz Retail store. Two jobs, both ruthlessly useful: <span className="text-white/85">predict what to stock</span>, and <span className="text-white/85">protect what's already on the shelf</span>.
                    </p>
                </div>

                {/* PILLAR 1 — Seasonal Stock Intelligence */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-20 sm:mb-28"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-[10px] uppercase tracking-widest text-orange-300 font-semibold mb-4">
                                <TrendingUp size={11} /> 01 · Seasonal Stock Brain
                            </div>
                            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] max-w-2xl">
                                Knows the season <span className="italic font-light text-orange-300">before you do.</span>
                            </h3>
                            <p className="mt-4 text-sm sm:text-base text-white/55 font-light max-w-2xl leading-relaxed">
                                PROX studies every invoice, every barcode scan, every footfall — across years of your data. Then he reads the calendar, the weather, and the local school term. The result: a calm, confident nudge a few weeks before the rush, telling you exactly what to stock and how much.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-[0.25em] font-semibold whitespace-nowrap">
                            <Activity size={12} className="text-orange-400" /> Live demand forecasting
                        </div>
                    </div>

                    <SeasonShowcase />
                </motion.div>

                {/* PILLAR 2 — Live Vigilance & Theft Watch */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-[10px] uppercase tracking-widest text-rose-300 font-semibold mb-4">
                                <ShieldAlert size={11} /> 02 · Live Vigilance
                            </div>
                            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] max-w-2xl">
                                Eyes on every shelf, <span className="italic font-light text-rose-300">24 × 7.</span>
                            </h3>
                            <p className="mt-4 text-sm sm:text-base text-white/55 font-light max-w-2xl leading-relaxed">
                                Every CCTV stream in your store flows through PROX. He doesn't just record — he <span className="text-white/85">watches</span>. Suspicious behaviour, bag tampering, missing scans, after-hours motion — PROX flags it the second it happens and pings you live, with the exact clip attached.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-[0.25em] font-semibold whitespace-nowrap">
                            <Bell size={12} className="text-rose-400" /> Instant theft alerts
                        </div>
                    </div>

                    <VigilanceShowcase />
                </motion.div>

                {/* Outcome strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
                >
                    {[
                        { val: "+38%", label: "Avg. seasonal lift" },
                        { val: "−62%", label: "Stock-outs avoided" },
                        { val: "<2s", label: "Theft alert latency" },
                        { val: "24×7", label: "PROX never sleeps" },
                    ].map((s, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                            <div className="text-2xl sm:text-3xl font-display font-semibold tracking-tight bg-gradient-to-br from-orange-300 via-amber-200 to-red-400 bg-clip-text text-transparent">
                                {s.val}
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1.5 font-semibold">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────── Season Showcase: interactive cycling forecast ─────────── */
const SEASON_CURVES: Record<string, number[]> = {
    Monsoon: [20, 22, 28, 35, 48, 62, 78, 92, 88, 70, 55, 40, 32, 28],
    "Back to School": [25, 30, 38, 50, 68, 85, 96, 88, 70, 55, 42, 35, 30, 28],
    Summer: [30, 38, 48, 60, 75, 90, 96, 90, 80, 65, 50, 40, 32, 28],
    "Festive & Winter": [22, 26, 32, 42, 58, 76, 92, 98, 95, 82, 65, 48, 36, 28],
};
const SEASON_METRICS: Record<string, { lift: number; sku: number; reorder: string }> = {
    Monsoon: { lift: 212, sku: 184, reorder: "12 days" },
    "Back to School": { lift: 180, sku: 142, reorder: "21 days" },
    Summer: { lift: 95, sku: 96, reorder: "9 days" },
    "Festive & Winter": { lift: 168, sku: 220, reorder: "30 days" },
};

function SeasonShowcase() {
    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    useEffect(() => {
        if (!autoplay) return;
        const id = setInterval(() => setActive((a) => (a + 1) % SEASONS.length), 4500);
        return () => clearInterval(id);
    }, [autoplay]);

    const s = SEASONS[active];
    const Icon = s.Icon;
    const curve = SEASON_CURVES[s.name];
    const metrics = SEASON_METRICS[s.name];
    const peak = Math.max(...curve);

    // Build SVG path
    const w = 600, h = 200, pad = 12;
    const xStep = (w - pad * 2) / (curve.length - 1);
    const pts = curve.map((v, i) => ({
        x: pad + i * xStep,
        y: pad + (1 - v / 100) * (h - pad * 2),
    }));
    const linePath = pts.reduce((acc, p, i) => acc + (i === 0 ? `M${p.x},${p.y}` : ` L${p.x.toFixed(1)},${p.y.toFixed(1)}`), "");
    const areaPath = `${linePath} L${pts[pts.length - 1].x},${h} L${pts[0].x},${h} Z`;
    const peakIdx = curve.indexOf(peak);
    const peakPt = pts[peakIdx];

    return (
        <div className="grid lg:grid-cols-5 gap-5">
            {/* LEFT: Forecast hero card */}
            <motion.div
                layout
                className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-white/10 bg-ink-900/60 backdrop-blur p-6 sm:p-8"
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
            >
                {/* Animated colored backdrop */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={s.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`absolute inset-0 bg-gradient-to-br ${s.gradient} pointer-events-none`}
                    />
                </AnimatePresence>
                <motion.div
                    aria-hidden
                    className="absolute -top-32 -right-20 w-80 h-80 rounded-full blur-3xl opacity-50 pointer-events-none"
                    style={{ background: s.accent }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={s.name + "-icon"}
                                    initial={{ rotate: -45, scale: 0.6, opacity: 0 }}
                                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                    exit={{ rotate: 45, scale: 0.6, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                    style={{ background: `${s.accent}25`, border: `1px solid ${s.accent}55`, boxShadow: `0 0 24px ${s.accent}40` }}
                                >
                                    <Icon size={20} style={{ color: s.accent }} />
                                </motion.div>
                            </AnimatePresence>
                            <div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={s.name}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="text-xl font-semibold leading-tight">{s.name}</div>
                                        <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-mono mt-0.5">{s.period}</div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                        {/* Live demand chip */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10">
                            <span className="relative flex w-1.5 h-1.5">
                                <span className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ background: s.accent }} />
                                <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                            </span>
                            <span className="text-[9px] font-semibold uppercase tracking-widest text-white/60">Forecast Live</span>
                        </div>
                    </div>

                    {/* Forecast curve */}
                    <div className="relative">
                        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44 sm:h-52" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id={`seasonFill-${active}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={s.accent} stopOpacity="0.55" />
                                    <stop offset="100%" stopColor={s.accent} stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Grid */}
                            {[40, 80, 120, 160].map((g) => (
                                <line key={g} x1={pad} x2={w - pad} y1={g} y2={g} stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" strokeWidth="0.5" />
                            ))}
                            <AnimatePresence mode="wait">
                                <motion.path
                                    key={s.name + "-area"}
                                    d={areaPath}
                                    fill={`url(#seasonFill-${active})`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                />
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.path
                                    key={s.name + "-line"}
                                    d={linePath}
                                    fill="none"
                                    stroke={s.accent}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ filter: `drop-shadow(0 0 8px ${s.accent}80)` }}
                                />
                            </AnimatePresence>
                            {/* Peak marker */}
                            <motion.circle
                                cx={peakPt.x}
                                cy={peakPt.y}
                                r="5"
                                fill={s.accent}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.4, type: "spring" }}
                            />
                            <motion.circle
                                cx={peakPt.x}
                                cy={peakPt.y}
                                r="10"
                                fill="none"
                                stroke={s.accent}
                                strokeWidth="1.2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.6, 0], scale: [1, 2.2, 1] }}
                                transition={{ delay: 1.6, duration: 2, repeat: Infinity }}
                                style={{ transformOrigin: `${peakPt.x}px ${peakPt.y}px` }}
                            />
                        </svg>
                        {/* Peak tooltip */}
                        <motion.div
                            key={s.name + "-tip"}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 0.5 }}
                            className="absolute pointer-events-none"
                            style={{ left: `${(peakPt.x / w) * 100}%`, top: `${(peakPt.y / h) * 100}%` }}
                        >
                            <div className="-translate-x-1/2 -translate-y-[140%]">
                                <div
                                    className="px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap shadow-lg"
                                    style={{ background: s.accent, color: "#0a0a14" }}
                                >
                                    PEAK · +{metrics.lift}%
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Metrics */}
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        {[
                            { label: "Demand lift", val: `+${metrics.lift}%` },
                            { label: "SKUs to stock", val: `${metrics.sku}` },
                            { label: "Re-order in", val: metrics.reorder },
                        ].map((m, i) => (
                            <motion.div
                                key={s.name + m.label}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="p-3 rounded-xl bg-black/30 border border-white/10"
                            >
                                <div className="text-[9px] uppercase tracking-widest text-white/40 font-semibold mb-1">{m.label}</div>
                                <div className="text-lg font-display font-semibold tabular-nums" style={{ color: s.accent }}>{m.val}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* PROX suggestion */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={s.name + "-sug"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5"
                        >
                            <Sparkles size={14} className="mt-0.5 flex-shrink-0" style={{ color: s.accent }} />
                            <p className="text-[12px] text-white/75 leading-relaxed">
                                <span className="font-semibold text-white/90">PROX says — </span>{s.suggestion}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* RIGHT: Season switcher + spike products */}
            <div className="lg:col-span-2 flex flex-col gap-3">
                {/* Season pills */}
                <div className="grid grid-cols-2 gap-2">
                    {SEASONS.map((sn, i) => {
                        const Sicon = sn.Icon;
                        const isActive = i === active;
                        return (
                            <button
                                key={sn.name}
                                onClick={() => { setActive(i); setAutoplay(false); }}
                                className={`group relative p-3 rounded-xl border text-left overflow-hidden transition-all ${isActive ? "border-white/30 bg-white/[0.06]" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="seasonPillGlow"
                                        className="absolute inset-0 opacity-30"
                                        style={{ background: `radial-gradient(circle at 30% 30%, ${sn.accent}, transparent 70%)` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                )}
                                <div className="relative flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${sn.accent}20`, border: `1px solid ${sn.accent}30` }}>
                                        <Sicon size={13} style={{ color: sn.accent }} />
                                    </div>
                                    <div className="leading-tight min-w-0">
                                        <div className="text-[12px] font-semibold truncate">{sn.name}</div>
                                        <div className="text-[9px] tracking-wider uppercase text-white/40 font-mono truncate">{sn.period}</div>
                                    </div>
                                </div>
                                {isActive && (
                                    <motion.span
                                        layoutId="seasonPillBar"
                                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                                        style={{ background: sn.accent }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Trending products with animated bars */}
                <div className="flex-1 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">Trending products</div>
                        <span className="text-[9px] tracking-wider uppercase text-white/30 font-mono">vs last year</span>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={s.name + "-bars"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-3"
                        >
                            {s.spikes.map((sp, i) => {
                                const lift = 60 + (metrics.lift / 4) + Math.round(Math.sin((i + active) * 7) * 25);
                                return (
                                    <div key={sp + s.name}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[12px] text-white/80">{sp}</span>
                                            <span className="text-[11px] font-mono tabular-nums font-semibold" style={{ color: s.accent }}>+{lift}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(lift, 100)}%` }}
                                                transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                                                className="h-full rounded-full"
                                                style={{ background: `linear-gradient(90deg, ${s.accent}, ${s.accent}80)` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Auto-cycle indicator */}
                <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-white/30 font-mono px-1">
                    <span className="flex items-center gap-1.5">
                        <span className={`w-1 h-1 rounded-full ${autoplay ? "bg-emerald-400 animate-pulse" : "bg-white/30"}`} />
                        {autoplay ? "Auto-cycling" : "Paused on hover"}
                    </span>
                    <span>{active + 1} / {SEASONS.length}</span>
                </div>
            </div>
        </div>
    );
}

/* ─────────── Vigilance Showcase: multi-camera + phone alerts ─────────── */
const CAM_FEEDS = [
    { id: "CAM-01", zone: "Entrance",  bbox: { x: 28, y: 30, w: 22, h: 50 }, label: "Person · OK", color: "#10b981", level: "ok" },
    { id: "CAM-02", zone: "Checkout",  bbox: { x: 38, y: 25, w: 30, h: 55 }, label: "Cart · scanning", color: "#0ea5e9", level: "ok" },
    { id: "CAM-03", zone: "Aisle 3",   bbox: { x: 36, y: 28, w: 26, h: 52 }, label: "Item concealed", color: "#f43f5e", level: "alert" },
    { id: "CAM-04", zone: "Stockroom", bbox: { x: 22, y: 22, w: 30, h: 56 }, label: "Motion · after-hours", color: "#f59e0b", level: "warn" },
];
const VIG_EVENTS = [
    { time: "now",     cam: "CAM-03", text: "Item concealed in jacket — Aisle 3", color: "#f43f5e", level: "alert" },
    { time: "0:02",    cam: "CAM-04", text: "Motion detected after store hours", color: "#f59e0b", level: "warn" },
    { time: "0:08",    cam: "CAM-02", text: "Register skipped — unscanned exit", color: "#f43f5e", level: "alert" },
    { time: "0:15",    cam: "CAM-01", text: "Returning customer — face matched", color: "#10b981", level: "ok" },
    { time: "0:22",    cam: "CAM-03", text: "Loitering > 4 min near electronics", color: "#f59e0b", level: "warn" },
    { time: "0:31",    cam: "CAM-04", text: "Bag tampering detected", color: "#f43f5e", level: "alert" },
];

function VigilanceShowcase() {
    const [focus, setFocus] = useState(2); // CAM-03 (alert) by default
    const [eventIdx, setEventIdx] = useState(0);
    const [shrinkage, setShrinkage] = useState(247);
    const [latency, setLatency] = useState(1.8);

    useEffect(() => {
        const id = setInterval(() => setEventIdx((i) => (i + 1) % VIG_EVENTS.length), 2200);
        return () => clearInterval(id);
    }, []);
    useEffect(() => {
        const id = setInterval(() => {
            setShrinkage((s) => s + (Math.random() < 0.4 ? 1 : 0));
            setLatency(1.4 + Math.random() * 0.8);
        }, 1400);
        return () => clearInterval(id);
    }, []);

    const focusCam = CAM_FEEDS[focus];
    const event = VIG_EVENTS[eventIdx];

    return (
        <div className="grid lg:grid-cols-5 gap-5">
            {/* LEFT: Camera grid + focus view */}
            <div className="lg:col-span-3 space-y-3">
                {/* Focus camera (big) */}
                <motion.div
                    layout
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 bg-ink-900 aspect-[16/9]"
                >
                    {/* CRT scanlines */}
                    <div aria-hidden className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 4px)" }} />
                    {/* Vignette */}
                    <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />
                    {/* Color tint based on alert level */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={focusCam.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: `radial-gradient(circle at 50% 60%, ${focusCam.color}, transparent 70%)` }}
                        />
                    </AnimatePresence>
                    {/* Sweep beam */}
                    <motion.div
                        className="absolute inset-x-0 h-[2px]"
                        style={{ background: `${focusCam.color}99`, boxShadow: `0 0 18px ${focusCam.color}` }}
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Top bar */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="relative flex w-2 h-2">
                            <span className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ background: focusCam.color }} />
                            <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: focusCam.color }} />
                        </span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={focusCam.id + "-zone"}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 6 }}
                                transition={{ duration: 0.3 }}
                                className="text-[11px] text-white/80 font-mono tracking-wider uppercase"
                            >
                                {focusCam.id} · {focusCam.zone}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-2 text-[10px] text-white/50 font-mono tracking-wider">
                        <Activity size={11} className="text-emerald-400" />
                        REC · 1080p · <LiveClock />
                    </div>

                    {/* Detection bbox */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={focusCam.id + "-bbox"}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute border-2 rounded-sm"
                            style={{
                                left: `${focusCam.bbox.x}%`,
                                top: `${focusCam.bbox.y}%`,
                                width: `${focusCam.bbox.w}%`,
                                height: `${focusCam.bbox.h}%`,
                                borderColor: focusCam.color,
                                boxShadow: `0 0 24px ${focusCam.color}80`,
                            }}
                        >
                            <span className="absolute -top-px -left-px w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: focusCam.color }} />
                            <span className="absolute -top-px -right-px w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: focusCam.color }} />
                            <span className="absolute -bottom-px -left-px w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: focusCam.color }} />
                            <span className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: focusCam.color }} />
                            <motion.div
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 1.4, repeat: Infinity }}
                                className="absolute -top-6 left-0 px-2 py-0.5 rounded-sm text-[10px] font-bold text-white whitespace-nowrap"
                                style={{ background: focusCam.color }}
                            >
                                {focusCam.label}
                            </motion.div>
                            {/* Cross-hair */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="w-3 h-px" style={{ background: focusCam.color }} />
                                <span className="absolute w-px h-3" style={{ background: focusCam.color }} />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Confidence bar */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur border border-white/10">
                        <Eye size={12} style={{ color: focusCam.color }} />
                        <span className="text-[10px] text-white/70 font-mono">PROX confidence</span>
                        <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                                key={focusCam.id + "-conf"}
                                initial={{ width: 0 }}
                                animate={{ width: focusCam.level === "alert" ? "94%" : focusCam.level === "warn" ? "78%" : "62%" }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full"
                                style={{ background: focusCam.color }}
                            />
                        </div>
                        <span className="text-[10px] font-mono tabular-nums" style={{ color: focusCam.color }}>
                            {focusCam.level === "alert" ? "94%" : focusCam.level === "warn" ? "78%" : "62%"}
                        </span>
                    </div>

                    {/* Audio waveform */}
                    <div className="absolute bottom-3 right-3 flex items-end gap-0.5 h-5">
                        {Array.from({ length: 14 }).map((_, i) => (
                            <motion.span
                                key={i}
                                className="w-0.5 rounded-full"
                                style={{ background: focusCam.color, opacity: 0.7 }}
                                animate={{ height: ["20%", `${30 + ((i * 13) % 70)}%`, "20%"] }}
                                transition={{ duration: 0.8 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* 4-camera thumbstrip */}
                <div className="grid grid-cols-4 gap-2">
                    {CAM_FEEDS.map((cam, i) => {
                        const isActive = i === focus;
                        return (
                            <button
                                key={cam.id}
                                onClick={() => setFocus(i)}
                                className={`relative aspect-video rounded-lg overflow-hidden bg-ink-900 border transition-all ${isActive ? "border-white/40 scale-[1.02]" : "border-white/10 hover:border-white/20 opacity-70 hover:opacity-100"}`}
                            >
                                <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 3px)" }} />
                                <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 60%, ${cam.color}25, transparent 70%)` }} />
                                <motion.div
                                    className="absolute inset-x-0 h-[1px]"
                                    style={{ background: `${cam.color}88` }}
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "linear" }}
                                />
                                {/* Mini bbox */}
                                <div
                                    className="absolute border rounded-[1px]"
                                    style={{
                                        left: `${cam.bbox.x}%`, top: `${cam.bbox.y}%`,
                                        width: `${cam.bbox.w}%`, height: `${cam.bbox.h}%`,
                                        borderColor: cam.color,
                                    }}
                                />
                                <div className="absolute top-1 left-1 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full" style={{ background: cam.color }} />
                                    <span className="text-[7px] font-mono text-white/70 tracking-wider">{cam.id}</span>
                                </div>
                                {cam.level === "alert" && (
                                    <span className="absolute top-1 right-1 px-1 rounded text-[7px] font-bold text-white" style={{ background: cam.color }}>
                                        !
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT: Phone alert + event ticker + counters */}
            <div className="lg:col-span-2 flex flex-col gap-3">
                {/* Phone mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl bg-gradient-to-b from-ink-900 to-black border border-white/10 p-4 overflow-hidden"
                >
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-3 flex items-center gap-2">
                        <Bell size={11} className="text-rose-400" />
                        Owner's phone · live
                    </div>
                    <div className="relative mx-auto w-full max-w-[260px]">
                        {/* Phone frame */}
                        <div className="relative rounded-[28px] bg-black border border-white/10 p-1.5 shadow-2xl">
                            <div className="relative rounded-[22px] bg-gradient-to-br from-ink-900 via-ink-950 to-black aspect-[9/16] overflow-hidden">
                                {/* Notch */}
                                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black z-20" />
                                {/* Status bar */}
                                <div className="absolute top-1.5 left-3 right-3 flex justify-between items-center text-[7px] text-white/40 font-mono z-10">
                                    <span><LiveClock /></span>
                                    <span>•••</span>
                                </div>

                                {/* Wallpaper glow */}
                                <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 30% 20%, #fb923c33, transparent 60%), radial-gradient(circle at 70% 80%, #f43f5e33, transparent 60%)" }} />

                                {/* Notification stack */}
                                <div className="absolute inset-x-2 top-8 space-y-1.5">
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <motion.div
                                            key={eventIdx}
                                            layout
                                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="rounded-xl bg-white/[0.08] backdrop-blur-md border p-2 shadow-lg"
                                            style={{ borderColor: `${event.color}55` }}
                                        >
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <div className="w-4 h-4 rounded bg-orange-500 flex items-center justify-center">
                                                    <Sparkles size={8} className="text-white" />
                                                </div>
                                                <span className="text-[8px] font-semibold text-white/90">PROX · Probiz Retail</span>
                                                <span className="ml-auto text-[7px] text-white/40 font-mono">{event.time}</span>
                                            </div>
                                            <div className="text-[9px] text-white/85 leading-snug font-medium">{event.text}</div>
                                            <div className="mt-1 flex items-center gap-1">
                                                <span className="px-1.5 py-px rounded text-[7px] font-bold" style={{ background: `${event.color}22`, color: event.color }}>
                                                    {event.level === "alert" ? "ALERT" : event.level === "warn" ? "WARN" : "INFO"}
                                                </span>
                                                <span className="text-[7px] text-white/40 font-mono">{event.cam}</span>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                    {/* Older notifications */}
                                    {[1, 2].map((offset) => {
                                        const e = VIG_EVENTS[(eventIdx + VIG_EVENTS.length - offset) % VIG_EVENTS.length];
                                        return (
                                            <motion.div
                                                key={`old-${offset}-${eventIdx}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 - offset * 0.3 }}
                                                className="rounded-xl bg-white/[0.04] border border-white/10 p-1.5"
                                                style={{ transform: `scale(${1 - offset * 0.04})` }}
                                            >
                                                <div className="text-[8px] text-white/60 truncate">{e.text}</div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Buzz indicator */}
                                <motion.div
                                    className="absolute -inset-1 rounded-[24px] border-2 border-rose-400/60 pointer-events-none"
                                    animate={{ opacity: event.level === "alert" ? [0, 0.6, 0] : 0 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            </div>
                        </div>
                        {/* Buzz waves */}
                        {event.level === "alert" && (
                            <motion.div
                                className="absolute inset-0 rounded-[28px] pointer-events-none"
                                animate={{ scale: [1, 1.06, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        )}
                    </div>
                </motion.div>

                {/* Live event ticker */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold flex items-center gap-1.5">
                            <Activity size={11} className="text-rose-400" /> Live event log
                        </div>
                        <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-emerald-400 font-mono">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> streaming
                        </span>
                    </div>
                    <div className="space-y-1.5 min-h-[100px]">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {Array.from({ length: 4 }, (_, i) => {
                                const e = VIG_EVENTS[(eventIdx + i) % VIG_EVENTS.length];
                                return (
                                    <motion.div
                                        key={`${eventIdx}-${i}`}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1 - i * 0.18, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.35, delay: i * 0.03 }}
                                        className="flex items-center gap-2 py-1"
                                    >
                                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: e.color }} />
                                        <span className="text-[10px] font-mono text-white/40 tabular-nums">{e.time}</span>
                                        <span className="text-[10px] text-white/70 truncate">{e.text}</span>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Live counters */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[9px] uppercase tracking-widest text-white/40 font-semibold mb-1">Avg. alert latency</div>
                        <div className="text-lg font-display font-semibold text-rose-300 tabular-nums">{latency.toFixed(2)}<span className="text-xs text-white/50 ml-0.5">s</span></div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[9px] uppercase tracking-widest text-white/40 font-semibold mb-1">Shrinkage saved</div>
                        <div className="text-lg font-display font-semibold text-emerald-300 tabular-nums">₹{shrinkage.toLocaleString("en-IN")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LiveClock() {
    const [t, setT] = useState("");
    useEffect(() => {
        const fmt = () => {
            const d = new Date();
            const pad = (n: number) => String(n).padStart(2, "0");
            setT(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
        };
        fmt();
        const id = setInterval(fmt, 1000);
        return () => clearInterval(id);
    }, []);
    return <span className="tabular-nums">{t}</span>;
}

/* ─────────── Sticky outline navigator ─────────── */
const OUTLINE_SECTIONS = [
    { id: "prox-hero", label: "Intro" },
    { id: "prox-identity", label: "Identity" },
    { id: "prox-personality", label: "Personality" },
    { id: "prox-powers", label: "Abilities" },
    { id: "prox-retail", label: "In Retail" },
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
