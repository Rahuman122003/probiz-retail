import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import HelpContent from "./HelpContent";

export const metadata: Metadata = {
    title: "Help Center — ProBiz Retail",
    description: "Get help with ProBiz. Search guides, contact support, or browse FAQs.",
};

export default function HelpPage() {
    return (
        <main>
            <PageHero label="Help Center" title="We're here" titleAccent="to help." description="Search our knowledge base, browse guides, or reach out to our support team." />
            <HelpContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
