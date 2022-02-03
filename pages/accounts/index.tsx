// auth.tsx
import React, { useState } from "react";

import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography, Stack, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import AuthCheck from "@components/AuthCheck";
import Router from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "@lib/firebase/clientApp";
import { useAuth } from "@context/AuthContext";
import Account from "@lib/firebase/models/account";
import AccountModal from "@components/AccountModal";
import { AddCircle } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { createAccount, deleteAccount } from "../../lib/firebase/controllers/account";

const Accounts: NextPage = () => {
    const { user } = useAuth();
    const [accountsSnapshots, loading, error] = useCollection(collection(db, `users/${user?.id}/accounts`));
    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Account name", flex: 1 },
        { field: "login", headerName: "Account login", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={(event) => {
                            event.stopPropagation();
                            console.log(cellValues);
                            deleteAccount(user?.id!, cellValues.id as string).catch(() => console.error("An error occured while deleting"));
                        }}
                    >
                        Delete
                    </Button>
                );
            },
        },
    ];

    const rows: Account[] =
        loading || !accountsSnapshots
            ? []
            : accountsSnapshots!.docs.map((account) => {
                  return { id: account.id, ...account.data() } as Account;
              });

    const onRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent>) => {
        event.defaultMuiPrevented = true;
        Router.push(`/accounts/${params.id}/packs`);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (account?: Account) => {
        if (account) {
            createAccount(user?.id!, account)
                .then(() => {
                    console.log("DONE");
                })
                .catch(() => console.error("An error occured"));
        }
        setOpen(false);
    };

    return (
        <AuthCheck>
            <main>
                <Metatags title="Accounts" description="Manage all the accounts attached to you" />
                <Stack margin={5} spacing={2}>
                    <Stack direction={"row"} justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="div">
                            Manage Accounts
                        </Typography>
                        <IconButton onClick={handleClickOpen}>
                            <AddCircle fontSize="large" color="primary" />
                        </IconButton>
                    </Stack>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={onRowClick} />
                    </div>
                </Stack>
                <AccountModal open={open} handleClose={handleClose}></AccountModal>
            </main>
        </AuthCheck>
    );
};

export default Accounts;
