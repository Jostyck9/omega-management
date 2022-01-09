import Metatags from "@components/Metatags";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
    const { user, isLoading, logout } = useAuth();

    const toDisplay = user ? user.displayName : "World";

    if (isLoading) {
        return (
            <div className={styles.container}>
                <Metatags />
                <main className={styles.main}>
                    <h1>Loading</h1>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Metatags />
            <main className={styles.main}>
                <h1>Hello {toDisplay}</h1>
                {!user && <Link href={"/auth"}>Connection</Link>}

                {user && (
                    <button className="btn-google" onClick={logout}>
                        Déconnection
                    </button>
                )}
            </main>
        </div>
    );
};

export default Home;
