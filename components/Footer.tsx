import Link from "next/link";

const footerLinks = [
    { h: "Product", l: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Integrations", href: "/integrations" },
        { label: "Changelog", href: "/changelog" },
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
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-purple-600" />
                            <span className="font-semibold text-white tracking-tight">ProBiz</span>
                        </Link>
                        <p className="text-sm max-w-xs leading-relaxed">AI-powered GST billing, accounting, and inventory — built for India&apos;s businesses.</p>
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
                    <div>© 2025 ProBiz Retail Inc.</div>
                    <div className="flex gap-6">
                        <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Security</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}