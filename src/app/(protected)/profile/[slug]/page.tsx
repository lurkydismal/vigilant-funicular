import Container from "@mui/material/Container";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import MainContent from "@/components/profile/MainContent";

export default async function Page({
    params,
}: {
    /**
     * Route parameters provided by Next.js App Router.
     *
     * `slug` uniquely identifies which tour configuration
     * should be loaded and rendered.
     */
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <>
            <NavBar />

            <Container
                component="main"
                maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 11,
                    marginBottom: 4,
                    gap: 4,
                }}
            >
                <MainContent id={Number(slug)} />
            </Container>

            <Footer />
        </>
    );
}
