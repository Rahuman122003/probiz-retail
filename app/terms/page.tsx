import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import LegalContent, { LegalSection } from "@/components/LegalContent";

export const metadata: Metadata = {
    title: "Terms of Service — Probiz Retail",
    description: "The terms governing your use of Probiz Retail.",
};

const sections: LegalSection[] = [
    {
        heading: "Agreement",
        paragraphs: [
            "By creating an account or using Probiz Retail, you agree to these Terms of Service. If you are using the platform on behalf of a business, you confirm that you have authority to bind that business to these terms.",
        ],
    },
    {
        heading: "Your account",
        paragraphs: [
            "You are responsible for the activity on your account, including keeping credentials secure and ensuring the data you upload is accurate and lawful.",
        ],
        bullets: [
            "Maintain accurate billing and contact information.",
            "Do not share login credentials across unauthorised users.",
            "Notify us immediately of any suspected unauthorised access.",
        ],
    },
    {
        heading: "Acceptable use",
        paragraphs: [
            "You may not use Probiz Retail to do anything illegal, infringe on others' rights, attempt to disrupt the service, or reverse-engineer our platform. We may suspend accounts that violate these rules.",
        ],
    },
    {
        heading: "Subscriptions & payments",
        paragraphs: [
            "Paid plans are billed in advance on a recurring basis. Fees are non-refundable except where required by law. You may cancel anytime; access continues until the end of the current billing period.",
        ],
    },
    {
        heading: "Service changes",
        paragraphs: [
            "We continuously improve Probiz Retail. We may add, modify, or remove features. We will provide reasonable notice for material changes that adversely affect your usage.",
        ],
    },
    {
        heading: "Liability",
        paragraphs: [
            "Probiz Retail is provided on an \"as is\" basis. To the maximum extent permitted by law, our aggregate liability is limited to the fees paid by you in the 12 months preceding the claim.",
        ],
    },
    {
        heading: "Termination",
        paragraphs: [
            "You may terminate at any time. We may terminate for material breach of these terms. Upon termination, you can export your data within 90 days before it is permanently deleted.",
        ],
    },
    {
        heading: "Governing law",
        paragraphs: [
            "These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.",
        ],
    },
];

export default function TermsPage() {
    return (
        <main>
            <PageHero
                label="Terms"
                title="Clear terms,"
                titleAccent="no surprises."
                description="The rules of the road for using Probiz Retail. We've kept them as plain-English as possible."
            />
            <LegalContent
                updated="January 2026"
                intro="These Terms of Service govern your access to and use of Probiz Retail. Please read them carefully."
                sections={sections}
            />
            <PageCTA />
            <Footer />
        </main>
    );
}
