import Footer from "@/components/Footer";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import { Divider } from "@mui/material";

export default function Page() {
    return (
        <>
            <Hero />

            <>
                <Features />

                <Divider />

                <FAQ />

                <Footer />
            </>
        </>
    );
}
