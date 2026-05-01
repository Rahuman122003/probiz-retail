import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import PressContent from "./PressContent";

export const metadata: Metadata = {
    title: "Press — Probiz Retail",
    description: "Probiz in the news. Press releases, media coverage, and brand assets.",
};

export default function PressPage() {
    return (
        <main>
            <PageHero label="Press" title="Probiz in" titleAccent="the news." description="Media coverage, press releases, and brand assets for journalists." />
            <PressContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
