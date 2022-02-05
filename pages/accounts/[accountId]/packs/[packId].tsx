import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import AuthCheck from "@components/AuthCheckComponent";

const Pack: NextPage = () => {
    const router = useRouter();
    const { accountId, packId } = router.query;

    return (
        <AuthCheck>
            <main>
                <Metatags title="Pack" description="Manage pack attached to this account" />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Account {accountId} Manage pack with id {packId}
                </Typography>
            </main>
        </AuthCheck>
    );
};

export default Pack;
