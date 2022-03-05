import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import AuthCheck from "@components/AuthCheckComponent";
import PackDetail from "@components/PackDetail";

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
                <PackDetail accountId={accountId as string} packId={packId as string}></PackDetail>
            </main>
        </AuthCheck>
    );
};

export default Pack;
