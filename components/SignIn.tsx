import Router from "next/router";
import GoogleButton from "react-google-button";
import { useAuth } from "../context/AuthContext";

// Sign in with Google button
const SignInButton = () => {
    const { login } = useAuth();

    const signInWithGoogle = () => {
        login()
            .then(() => {
                Router.push("/");
            })
            .catch((reason) => {
                console.error(reason);
            });
    };

    return <GoogleButton type="dark" onClick={signInWithGoogle} />;
};

export default SignInButton;
