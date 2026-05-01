import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import ChangelogContent from "./ChangelogContent";

export const metadata: Metadata = {
    title: "Changelog — ProBiz Retail",
    description: "See what's new in ProBiz Retail. Latest updates, features, and improvements.",
};

export default function ChangelogPage() {
    return (
        <main>
            <PageHero label="Changelog" title="What's new" titleAccent="in ProBiz." description="Every update, improvement, and new feature — shipped fast, documented here." />
            <ChangelogContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
