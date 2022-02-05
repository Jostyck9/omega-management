import { User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../clientApp";

export const createUserProfileDocument = async (userAuth: User, additionalData?: any) => {
    const userRef = doc(db, `users`, userAuth.uid);
    const userSnap = await getDoc(userRef);

    const { displayName, email, photoURL } = userAuth;

    if (!userSnap.exists()) {
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData,
            });
        } catch (err: any) {
            console.error("error creating user", err.message);
        }
    }
    return userRef;
};
