import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import FeaturesContent from "./FeaturesContent";

export const metadata: Metadata = {
    title: "Features — ProBiz Retail",
    description: "Explore all ProBiz features: GST billing, inventory tracking, AI forecasting, expense OCR, fraud detection, and voice invoicing.",
};

export default function FeaturesPage() {
    return (
        <main>
            <PageHero
                label="Features"
                title="Powerful features,"
                titleAccent="effortless workflow."
                description="Every tool you need to run, grow, and automate your retail business — unified in one platform."
            />
            <FeaturesContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
