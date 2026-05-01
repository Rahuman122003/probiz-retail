import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
    title: "About — ProBiz Retail",
    description: "Learn about ProBiz Retail — our mission, story, and the team building India's smartest business platform.",
};

export default function AboutPage() {
    return (
        <main>
            <PageHero label="About Us" title="Built for India," titleAccent="by India." description="We're on a mission to give every Indian business the tools of a Fortune 500 — powered by AI." />
            <AboutContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
