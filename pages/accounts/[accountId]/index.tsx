import React from "react";

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import AuthCheck from "@components/AuthCheck";

const Account: NextPage = () => {
    const router = useRouter();
    const { accountId } = router.query;

    return (
        <main>
            <Metatags title="Account" description="Manage account attached to you" />
            <AuthCheck>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Manage Account with id {accountId}
                </Typography>
                
            </AuthCheck>
        </main>
    );
};

export default Account;
