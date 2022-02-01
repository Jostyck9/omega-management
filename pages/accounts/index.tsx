// auth.tsx
import React from "react";

import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import AuthCheck from "@components/authCheck";
import Router from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "@lib/firebase/clientApp";
import { useAuth } from "@context/AuthContext";
import Account from "@lib/firebase/models/account";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Account name", flex: 1 },
];

const Accounts: NextPage = () => {
    const { user } = useAuth();
    const [accountsSnapshots, loading, error] = useCollection(collection(db, `users/${user?.id}/accounts`));

    const rows: Account[] = loading
        ? []
        : accountsSnapshots!.docs.map((account) => {
              return { id: account.id, ...account.data() } as Account;
          });

    const onRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent>) => {
        event.defaultMuiPrevented = true;
        Router.push(`/accounts/${params.id}/packs`);
    };

    return (
        <AuthCheck>
            <main>
                <Metatags title="Accounts" description="Manage all the accounts attached to you" />
                <Stack margin={5} spacing={2}>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Manage Accounts
                    </Typography>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={onRowClick} />
                    </div>
                </Stack>
            </main>
        </AuthCheck>
    );
};

export default Accounts;
