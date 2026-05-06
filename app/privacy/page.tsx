import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import LegalContent, { LegalSection } from "@/components/LegalContent";

export const metadata: Metadata = {
    title: "Privacy Policy — Probiz Retail",
    description: "How Probiz Retail collects, uses, and protects your data.",
};

const sections: LegalSection[] = [
    {
        heading: "Information we collect",
        paragraphs: [
            "We collect information you provide when you create an account, set up your business, or use our products — such as your name, email, phone, GSTIN, and billing details.",
            "We also collect operational data generated as you use Probiz Retail, including invoices, inventory records, and usage analytics, strictly to deliver and improve the service.",
        ],
    },
    {
        heading: "How we use your data",
        paragraphs: [
            "Your data powers your account. We use it to run features, sync devices, generate reports, and provide AI-driven insights you have explicitly opted into.",
        ],
        bullets: [
            "Operate, maintain, and improve the platform.",
            "Personalise dashboards, forecasts, and recommendations.",
            "Send service notifications, security alerts, and product updates.",
            "Comply with legal, tax, and regulatory obligations.",
        ],
    },
    {
        heading: "Data sharing",
        paragraphs: [
            "We do not sell your data — ever. We share information only with vetted infrastructure partners (cloud, payments, communication) under strict data-processing agreements, or when required by law.",
        ],
    },
    {
        heading: "Your rights",
        paragraphs: [
            "You can access, export, correct, or delete your data at any time from Settings → Privacy. You may also write to privacy@probizretail.com to exercise any privacy right under applicable Indian and global laws.",
        ],
    },
    {
        heading: "Retention",
        paragraphs: [
            "We retain account data for as long as your subscription is active. After cancellation, your data is preserved for 90 days for recovery, then permanently deleted unless retention is required by law.",
        ],
    },
    {
        heading: "Contact",
        paragraphs: [
            "Questions about this policy? Reach our Data Protection Officer at privacy@probizretail.com.",
        ],
    },
];

export default function PrivacyPage() {
    return (
        <main>
            <PageHero
                label="Privacy"
                title="Your data,"
                titleAccent="your control."
                description="We treat your business data with the care it deserves. Here's exactly what we collect, why, and how we keep it safe."
            />
            <LegalContent
                updated="January 2026"
                intro="This Privacy Policy explains how Probiz Retail handles personal and business data. By using Probiz Retail you agree to the practices described here."
                sections={sections}
            />
            <PageCTA />
            <Footer />
        </main>
    );
}
