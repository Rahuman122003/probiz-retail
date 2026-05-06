import Link from "next/link";
import Image from "next/image";

const footerLinks = [
    { h: "Product", l: [
        { label: "Features", href: "/features" },
        { label: "AI Camera", href: "/ai-camera" },
        { label: "POS", href: "/pos" },
        { label: "Pricing", href: "/pricing" },
        { label: "Integrations", href: "/integrations" },
    ]},
    { h: "Company", l: [
        { label: "About", href: "/about" },
        { label: "Customers", href: "/customers" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
    ]},
    { h: "Resources", l: [
        { label: "Docs", href: "/docs" },
        { label: "Help Center", href: "/help" },
        { label: "Community", href: "/community" },
        { label: "Contact", href: "/contact" },
    ]},
];

export default function Footer() {
    return (
        <footer className="bg-ink-950 text-white/60 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12 sm:py-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-12">
                    <div className="col-span-2 sm:col-span-3 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Probiz Retail">
                            <Image src="/logo1.png" alt="" width={389} height={340} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                            <span className="font-quicksand font-bold text-base sm:text-lg tracking-tight leading-none">
                                <span style={{ color: "#1F9CE8" }}>Probiz</span>
                                <span className="ml-1" style={{ color: "#7C3AED" }}>Retail</span>
                            </span>
                        </Link>
                        <p className="text-sm max-w-xs leading-relaxed">AI-powered GST billing, accounting, and inventory — built for India&apos;s businesses by Probiz Retail.</p>
                    </div>
                    {footerLinks.map((c) => (
                        <div key={c.h}>
                            <div className="text-xs uppercase tracking-widest text-white/40 mb-3 sm:mb-4">{c.h}</div>
                            <ul className="space-y-2.5 sm:space-y-3 text-sm">
                                {c.l.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs">
                    <div>© 2026 Probiz Retail Inc.</div>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/security" className="hover:text-white transition-colors">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}