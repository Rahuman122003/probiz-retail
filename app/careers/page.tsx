import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
    title: "Careers — ProBiz Retail",
    description: "Join the team building India's smartest business platform. View open positions.",
};

export default function CareersPage() {
    return (
        <main>
            <PageHero label="Careers" title="Build the future" titleAccent="of commerce." description="Join a team of designers, engineers, and dreamers building tools that power India's businesses." />
            <CareersContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
