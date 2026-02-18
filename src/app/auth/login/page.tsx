"use client";

import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import { Link } from "@/components/Link";
import { CopyrightAligned as Copyright } from "@/components/Copyright";
import log from "@/utils/stdlog";
import { isDev } from "@/utils/stdvar";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export default function SignInPage() {
    const router = useRouter();

    useEffect(() => {
        log.trace("SignIn component mounted");
        return () => {
            log.trace("SignIn component unmounted");
        };
    }, []);

    const handleSignIn = async (data: {
        username: string;
        password: string;
        rememberMe?: boolean;
    }) => {
        log.trace(`onSubmit called: '${JSON.stringify(data)}'`);

        try {
            // network/storage removed per request.
            if (!isDev) {
                // intentionally left blank — no sendRequest/storeCredentials here
            }

            log.trace("onSubmit finished");

            router.push("/posts");
        } catch (err) {
            log.error(`onSubmit error: '${String(err)}'`);
        }
    };

    const footer = (
        <>
            <Typography sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <Link
                    href="/auth/register"
                    sx={{ alignSelf: "center" }}
                    variant="body2"
                >
                    Sign up
                </Link>
            </Typography>

            <Copyright />
        </>
    );

    return (
        <AuthCard footer={footer}>
            <AuthForm mode="signin" onSubmit={handleSignIn} />
        </AuthCard>
    );
}
