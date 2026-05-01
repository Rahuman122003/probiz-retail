import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
    title: "Contact — ProBiz Retail",
    description: "Get in touch with ProBiz. Sales inquiries, support, or partnerships.",
};

export default function ContactPage() {
    return (
        <main>
            <PageHero label="Contact" title="Let's talk" titleAccent="business." description="Have a question? Need a demo? We'd love to hear from you." />
            <ContactContent />
            <Footer />
        </main>
    );
}
