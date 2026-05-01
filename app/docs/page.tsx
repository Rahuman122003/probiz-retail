import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import DocsContent from "./DocsContent";

export const metadata: Metadata = {
    title: "Documentation — ProBiz Retail",
    description: "ProBiz documentation — guides, API reference, and tutorials to get you started.",
};

export default function DocsPage() {
    return (
        <main>
            <PageHero label="Documentation" title="Learn ProBiz," titleAccent="inside out." description="Comprehensive guides, API docs, and tutorials to help you make the most of ProBiz." />
            <DocsContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
