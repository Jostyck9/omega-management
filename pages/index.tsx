import Metatags from "@components/Metatags";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
    const { user, logout } = useAuth();

    const toDisplay = user ? user.displayName : "World";

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
