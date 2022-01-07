import Metatags from "@components/Metatags";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const Packs: NextPage = () => {
    return (
        <div className={styles.container}>
            <Metatags />
            <main className={styles.main}>
                <h1>Page des packs</h1>
                <Link href={"/"}>Retour</Link>
            </main>
        </div>
    );
};

export default Packs;
