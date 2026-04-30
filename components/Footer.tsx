export default function Footer() {
    return (
        <footer className="bg-ink-950 text-white/60 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
                <div className="grid md:grid-cols-5 gap-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-purple-600" />
                            <span className="font-semibold text-white tracking-tight">ProBiz</span>
                        </div>
                        <p className="text-sm max-w-xs">AI-powered GST billing, accounting, and inventory — built for India&apos;s businesses.</p>
                    </div>
                    {[
                        { h: "Product", l: ["Features", "Pricing", "Integrations", "Changelog"] },
                        { h: "Company", l: ["About", "Customers", "Careers", "Press"] },
                        { h: "Resources", l: ["Docs", "Help Center", "Community", "Contact"] },
                    ].map((c) => (
                        <div key={c.h}>
                            <div className="text-xs uppercase tracking-widest text-white/40 mb-4">{c.h}</div>
                            <ul className="space-y-3 text-sm">
                                {c.l.map((i) => <li key={i} className="hover:text-white transition-colors cursor-pointer">{i}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs">
                    <div>© 2025 ProBiz Retail Inc.</div>
                    <div className="flex gap-6">
                        <span>Privacy</span><span>Terms</span><span>Security</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}