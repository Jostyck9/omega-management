import { auth, googleAuthProvider } from "@lib/firebase/clientApp";
import { createUserProfileDocument } from "../lib/firebase/user";
import { signInWithPopup, UserCredential } from "firebase/auth";
import Router from "next/router";

// Sign in with Google button
export default function SignInButton() {
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then(() => {
                Router.push('/');
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
