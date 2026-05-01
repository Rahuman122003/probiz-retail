import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import AICameraContent from "./AICameraContent";

export const metadata: Metadata = {
    title: "AI Camera — Theft Management | Probiz Retail",
    description: "AI-powered surveillance and theft prevention for retail stores. Real-time detection, smart alerts, behavior analysis, and 24/7 monitoring — all integrated into Probiz.",
};

export default function AICameraPage() {
    return (
        <main>
            <PageHero
                label="AI Security"
                title="See everything."
                titleAccent="Stop anything."
                description="AI-powered cameras that detect, alert, and prevent theft in real-time — so you never lose another rupee."
            />
            <AICameraContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
