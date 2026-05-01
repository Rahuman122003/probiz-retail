import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import IntegrationsContent from "./IntegrationsContent";

export const metadata: Metadata = {
    title: "Integrations — Probiz Retail",
    description: "Connect Probiz with Tally, WhatsApp, Razorpay, Google Sheets, and 50+ tools.",
};

export default function IntegrationsPage() {
    return (
        <main>
            <PageHero label="Integrations" title="Connect with" titleAccent="everything." description="50+ integrations to connect Probiz with the tools you already love." />
            <IntegrationsContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
