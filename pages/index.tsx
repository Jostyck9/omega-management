import Metatags from "@components/Metatags";
import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
    const { user, isLoading, logout } = useAuth();

    const toDisplay = user ? user.displayName : "World";

    if (isLoading) {
        return (
            <div>
                <Metatags />
                <main>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Loading
                    </Typography>
                </main>
            </div>
        );
    }

    return (
        <div>
            <Metatags />
            <main>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Hello {toDisplay}
                </Typography>
            </main>
        </div>
    );
};

export default Home;
