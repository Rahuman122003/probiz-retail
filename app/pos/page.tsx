import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import POSContent from "./POSContent";

export const metadata: Metadata = {
    title: "POS — Point of Sale | Probiz Retail",
    description: "Lightning-fast point of sale for modern retail. Barcode scanning, multi-payment, GST-compliant receipts, offline mode, and multi-terminal management.",
};

export default function POSPage() {
    return (
        <main>
            <PageHero
                label="Point of Sale"
                title="Lightning-fast"
                titleAccent="checkout."
                description="A POS system so fast, your customers won't believe it. Scan, bill, and collect — in under 3 seconds."
            />
            <POSContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
