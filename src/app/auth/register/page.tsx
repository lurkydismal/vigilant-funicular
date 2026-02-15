"use client";

import React, { useEffect } from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import { Link } from "@/components/Link";
import { CopyrightAligned as Copyright } from "@/components/Copyright";
import log from "@/utils/stdlog";
import { isDev } from "@/utils/stdvar";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";

export default function SignUpPage() {
    const router = useRouter();

    useEffect(() => {
        log.trace("SignUp component mounted");
        return () => {
            log.trace("SignUp component unmounted");
        };
    }, []);

    const handleSignUp = async (data: {
        username: string;
        password: string;
    }) => {
        log.trace(`onSubmit called: '${JSON.stringify(data)}'`);

        try {
            // network/storage removed per request.
            if (!isDev) {
                // intentionally left blank — no sendRequest/storeCredentials here
            }

            log.trace("onSubmit finished");
            await router.push("/posts");
        } catch (err) {
            log.error(`onSubmit error: '${String(err)}'`);
        }
    };

    const footer = (
        <>
            <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    sx={{ alignSelf: "center" }}
                    variant="body2"
                >
                    Sign in
                </Link>
            </Typography>
            <Copyright />
        </>
    );

    return (
        <AuthCard footer={footer}>
            <AuthForm mode="signup" onSubmit={handleSignUp} />
        </AuthCard>
    );
}
