import { User } from "firebase/auth";
import { query, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./clientApp";

export const createUserProfileDocument = async (userAuth: User, additionalData?: any) => {
    const userRef = doc(db, `users`, userAuth.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date().getTime();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (err: any) {
            console.error("error creating user", err.message);
        }
    }
    return userRef;
};
