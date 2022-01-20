import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography } from "@mui/material";
import AuthCheck from "@components/authCheck";

const Packs: NextPage = () => {
    return (
        <AuthCheck>
            <main>
                <Metatags title="Packs" description="Manage all the packs attached to this account" />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Manage packs for account
                </Typography>
            </main>
        </AuthCheck>
    );
};

export default Packs;
