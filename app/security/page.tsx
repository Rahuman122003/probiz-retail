import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import SecurityContent from "./SecurityContent";

export const metadata: Metadata = {
    title: "Security — Probiz Retail",
    description: "Enterprise-grade security, encryption, and compliance — engineered into every layer of Probiz Retail.",
};

export default function SecurityPage() {
    return (
        <main>
            <PageHero
                label="Security"
                title="Trust, engineered"
                titleAccent="end-to-end."
                description="Bank-grade encryption, continuous auditing, and compliance with the standards that matter — so you can focus on running your business."
            />
            <SecurityContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
