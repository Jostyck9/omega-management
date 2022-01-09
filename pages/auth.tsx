// auth.tsx
import React from "react";

import Metatags from "@components/Metatags";
import SignInButton from "@components/SignIn";
import Link from "next/link";

function SignInScreen() {
    return (
        <main>
            <Metatags title="Auth" description="Sign up to Omega Management"/>
            <h1>Omega-Management Login</h1>
            <p>Please sign-in:</p>
            <SignInButton/>
            <Link href={"/"}>Back to main</Link>
        </main>
    );
}

export default SignInScreen;
