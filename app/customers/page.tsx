import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import CustomersContent from "./CustomersContent";

export const metadata: Metadata = {
    title: "Customers — Probiz Retail",
    description: "See how 12,000+ Indian businesses use Probiz to grow faster.",
};

export default function CustomersPage() {
    return (
        <main>
            <PageHero label="Customers" title="Loved by" titleAccent="12,000+ businesses." description="From corner shops to enterprise chains — see how businesses across India trust Probiz." />
            <CustomersContent />
            <PageCTA />
            <Footer />
        </main>
    );
}
