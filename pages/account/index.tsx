// auth.tsx
import React from "react";

import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography } from "@mui/material";
import AuthCheck from "@components/authCheck";

const Accounts: NextPage = () => {
    return (
        <AuthCheck>
            <main>
                <Metatags title="Accounts" description="Manage all the accounts attached to you" />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Manage Accounts
                </Typography>
            </main>
        </AuthCheck>
    );
};

export default Accounts;
