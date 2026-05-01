import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
    title: "Pricing — ProBiz Retail",
    description: "Simple, transparent pricing. Start free, scale as you grow.",
};

export default function PricingPage() {
    return (
        <main>
            <PageHero label="Pricing" title="Simple pricing," titleAccent="no surprises." description="Start free. Upgrade when you're ready. No hidden fees, ever." />
            <PricingContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
