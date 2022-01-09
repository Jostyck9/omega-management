import { auth, googleAuthProvider } from "@lib/firebase/clientApp";
import { createUserProfileDocument } from "../lib/firebase/user";
import { signInWithPopup, UserCredential } from "firebase/auth";
import Router from "next/router";
import { useAuth } from "../context/AuthContext";

// Sign in with Google button
export default function SignInButton() {
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

    return (
        <>
            <button className="btn-google" onClick={signInWithGoogle}>
                <img src={"/google.png"} width="30px" /> Sign in with Google
            </button>
        </>
    );
}
