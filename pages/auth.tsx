// auth.tsx
import React from "react";

import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import SignInButton from "@components/SignIn";
import Link from "next/link";
import { Grid, Typography, Button } from "@mui/material";

const SignInScreen: NextPage = () => {
    return (
        <main>
            <Metatags title="Auth" description="Sign up to Omega Management" />
            <Grid container direction="column" justifyContent={"center"} alignItems={"center"} spacing={5} height={"80vh"}>
                <Grid item key={"Title"}>
                    <Typography variant="h4" component="div">
                        Omega-Management Login
                    </Typography>
                </Grid>
                <Grid item key={"Description"}>
                    <Typography variant="h5" component="p">
                        Please Sign-In
                    </Typography>
                </Grid>
                <Grid item key={"SignInButton"}>
                    <SignInButton />
                </Grid>
                <Grid item key={"ReturnLink"}>
                    <Link href={"/"} passHref>
                        <Button variant="contained" color="primary">
                            Return
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </main>
    );
};

export default SignInScreen;
