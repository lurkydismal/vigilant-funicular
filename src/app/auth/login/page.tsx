import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Link } from "@/components/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CopyrightAligned as Copyright } from "@/components/Copyright";
import log from "@/utils/stdlog";
import { isDev } from "@/utils/stdvar";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

type FormValues = {
    username: string;
    password: string;
    rememberMe: boolean;
};

export default function SignIn() {
    log.trace("SignIn component render");

    const { control, handleSubmit } = ReactHook.useForm<FormValues>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormValues) => {
        log.trace(`onSubmit called: '${data}'`);

        setLoading(true);

        try {
            if (!isDev) {
                const json = await sendRequest(`auth/login`, {
                    username: data.username,
                    password: data.password,
                    rememberMe: data.rememberMe ?? false,
                });

                storeCredentials(json);
            }

            log.trace("onSubmit finished");

            redirect("/posts");
        } catch (err) {
            log.error(`onSubmit error: '${err}'`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        log.trace("SignIn component mounted");

        return () => {
            log.trace("SignIn component unmounted");
        };
    }, []);

    return (
        <>
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "100%",
                        }}
                    >
                        <ReactHook.Controller
                            name="username"
                            control={control}
                            rules={{ required: "Username is required" }}
                            render={({ field, fieldState }) => {
                                log.trace(
                                    `Rendering username field: '${field}'`,
                                );

                                return (
                                    <FormControl>
                                        <FormLabel htmlFor="username">
                                            Username
                                        </FormLabel>

                                        <TextField
                                            {...field}
                                            autoComplete="username"
                                            autoFocus
                                            color={
                                                Boolean(fieldState.error)
                                                    ? "error"
                                                    : "primary"
                                            }
                                            error={Boolean(fieldState.error)}
                                            fullWidth
                                            helperText={
                                                fieldState.error?.message
                                            }
                                            id="username"
                                            name="username"
                                            placeholder="tralalero"
                                            required
                                            type="text"
                                            variant="outlined"
                                        />
                                    </FormControl>
                                );
                            }}
                        />

                        <ReactHook.Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required" }}
                            render={({ field, fieldState }) => {
                                log.trace(
                                    `Rendering password field: '${field}'`,
                                );

                                return (
                                    <FormControl>
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            autoComplete="new-password"
                                            color={
                                                Boolean(fieldState.error)
                                                    ? "error"
                                                    : "primary"
                                            }
                                            error={Boolean(fieldState.error)}
                                            fullWidth
                                            helperText={
                                                fieldState.error?.message
                                            }
                                            id="password"
                                            name="password"
                                            placeholder="••••••"
                                            required
                                            type="password"
                                            variant="outlined"
                                        />
                                    </FormControl>
                                );
                            }}
                        />

                        <ReactHook.Controller
                            name="rememberMe"
                            defaultValue={false}
                            control={control}
                            render={({ field }) => {
                                log.trace(
                                    `Rendering rememberMe checkbox: '${field}'`,
                                );

                                return (
                                    <FormControlLabel
                                        {...field}
                                        control={
                                            <Checkbox
                                                value="remember"
                                                color="primary"
                                            />
                                        }
                                        label="Remember me"
                                    />
                                );
                            }}
                        />

                        <Button
                            endIcon={<AccountCircle />}
                            fullWidth
                            loading={loading}
                            type="submit"
                            variant="outlined"
                        >
                            Sign in
                        </Button>
                    </Box>

                    <Divider>or</Divider>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
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
                    </Box>
                </Card>
            </SignInContainer>
        </>
    );
}
