import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import CommunityContent from "./CommunityContent";

export const metadata: Metadata = {
    title: "Community — Probiz Retail",
    description: "Join the Probiz community. Connect with 12,000+ business owners and share ideas.",
};

export default function CommunityPage() {
    return (
        <main>
            <PageHero label="Community" title="Join the" titleAccent="movement." description="Connect with 12,000+ business owners. Share ideas, get help, and grow together." />
            <CommunityContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
