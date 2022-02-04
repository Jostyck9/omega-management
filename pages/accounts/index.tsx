// auth.tsx
import React, { useState } from "react";

import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import AuthCheck from "@components/AuthCheck";
import Router from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "@lib/firebase/clientApp";
import { useAuth } from "@context/AuthContext";
import Account from "@lib/firebase/models/account";
import { AddCircle } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import IconDelete from "@mui/icons-material/Delete";
import IconEdit from "@mui/icons-material/Edit";
import { deleteAccount } from "../../lib/firebase/controllers/account";
import { useConfirmDialog } from "../../context/ConfirmDialogContext";
import EditAccountModal from "@components/EditAccountModal";
import NewAccountModal from "@components/NewAccountModal";

const Accounts: NextPage = () => {
    const { user } = useAuth();
    const { confirm } = useConfirmDialog();
    const [openNewAccount, setOpenNewAccount] = useState(false);
    const [accountsSnapshots, loading, error] = useCollection(collection(db, `users/${user?.id}/accounts`));

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Account name", flex: 1 },
        { field: "login", headerName: "Account login", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (cellValues) => {
                const [open, setOpen] = useState(false);

                const handleClose = () => {
                    setOpen(false);
                };

                const account: Account = { id: cellValues.row.id, name: cellValues.row.name, login: cellValues.row.login };

                return (
                    <>
                        <IconButton
                            color="primary"
                            onClick={(event) => {
                                event.stopPropagation();
                                setOpen(true);
                            }}
                        >
                            <IconEdit />
                        </IconButton>
                        <IconButton
                            color="error"
                            onClick={(event) => {
                                event.stopPropagation();
                                confirm(`Delete ${cellValues.row.name} ?`, `Are you sure you want to delete this account ?`)
                                    .then(() => deleteAccount(user?.id!, cellValues.row.id))
                                    .catch(() => {});
                            }}
                        >
                            <IconDelete />
                        </IconButton>
                        <EditAccountModal showDialog={open} closeDialog={handleClose} account={account}></EditAccountModal>
                    </>
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

    const onCreate = () => {
        setOpenNewAccount(true);
    };

    const handleCloseNewAccount = () => {
        setOpenNewAccount(false);
    }

    return (
        <AuthCheck>
            <main>
                <Metatags title="Accounts" description="Manage all the accounts attached to you" />
                <Stack margin={5} spacing={2}>
                    <Stack direction={"row"} justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="div">
                            Manage Accounts
                        </Typography>
                        <IconButton onClick={onCreate}>
                            <AddCircle fontSize="large" color="primary" />
                        </IconButton>
                    </Stack>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid loading={loading} rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={onRowClick} />
                    </div>
                </Stack>
                <NewAccountModal showDialog={openNewAccount} closeDialog={handleCloseNewAccount} ></NewAccountModal>
            </main>
        </AuthCheck>
    );
};

export default Accounts;
