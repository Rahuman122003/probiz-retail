import type { Metadata } from "next";
import ProxExperience from "@/components/ProxExperience";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "PROX — Mascot of Probiz Technologies",
    description: "Meet PROX — the clever little fox powering Probiz Retail. Crafted with care by Probiz Technologies.",
};

export default function ProxPage() {
    return (
        <main>
            <ProxExperience />
            <Footer />
        </main>
    );
}
