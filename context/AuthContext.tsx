import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import User from "../lib/firebase/models/user";
import { onAuthStateChanged, signInWithPopup, UserCredential } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { auth, googleAuthProvider } from "../lib/firebase/clientApp";
import { createUserProfileDocument } from "../lib/firebase/user";

type authContextType = {
    user?: User;
    isLoading: boolean,
    login: () => Promise<UserCredential>;
    logout: () => Promise<void>;
};

const authContextDefaultValues: authContextType = {
    user: undefined,
    isLoading: true,
    login: () => Promise.resolve({} as Promise<UserCredential>),
    logout: () => Promise.resolve(),
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                createUserProfileDocument(user).then((userRef) => {
                    onSnapshot(userRef, (snapShot) => {
                        setUser(snapShot.data() as User);
                        setIsLoading(false);
                    });
                });
            } else {
                setUser(undefined);
                setIsLoading(false);
            }
        });
    }, []);

    const login = () => {
        return signInWithPopup(auth, googleAuthProvider);
    };

    const logout = () => {
        return auth.signOut();
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
    };

    return (
        <>
            <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
        </>
    );
}
