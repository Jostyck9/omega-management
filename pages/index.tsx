import Metatags from "@components/Metatags";
import type { NextPage } from "next";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import TopAppBar from '../components/TopAppBar';

const Home: NextPage = () => {
    const { user, isLoading, logout } = useAuth();

    const toDisplay = user ? user.displayName : "World";

    if (isLoading) {
        return (
            <div>
                <Metatags />
                <main>
                    <h1>Loading</h1>
                </main>
            </div>
        );
    }

    return (
        <div>
            <Metatags />
            <TopAppBar/>
            <main>
                <h1>Hello {toDisplay}</h1>
            </main>
        </div>
    );
};

export default Home;
