import Divider from "@mui/material/Divider";
import Footer from "@/components/Footer";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";

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
