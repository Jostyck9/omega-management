import Metatags from "@components/Metatags";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useAppSelector } from "../redux/hooks";
import { auth } from '../lib/firebase/clientApp';

const Home: NextPage = () => {
    const userState = useAppSelector((state) => state.user);
    const toDisplay = userState.user ? userState.user.displayName : "World";

    const signOut = () => {
        auth.signOut();
    }

    return (
        <div className={styles.container}>
            <Metatags />
            <main className={styles.main}>
                <h1>Hello {toDisplay}</h1>
                {!userState.id && <Link href={"/auth"}>Connection</Link>}

                {userState.id && <button className="btn-google" onClick={signOut}>Déconnection</button>}
            </main>
        </div>
    );
};

export default Home;
