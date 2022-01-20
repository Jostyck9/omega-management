import { NextPage } from "next";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

interface Props {
    fallback?: any;
}

const AuthCheck: NextPage<Props> = (props) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <main>
                <h1>Loading</h1>
            </main>
        );
    }
    return user ? props.children : props.fallback || <Link href="/auth">You must be signed in</Link>;
};

export default AuthCheck;
