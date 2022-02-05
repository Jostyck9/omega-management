import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, GridValueGetterParams, MuiEvent } from "@mui/x-data-grid";
import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@context//AuthContext";
import AuthCheck from "@components/AuthCheckComponent";
import { useCollection } from "react-firebase-hooks/firestore";
import { useConfirmDialog } from "@context/ConfirmDialogContext";
import { collection } from "firebase/firestore";
import { db } from "@lib/firebase/clientApp";
import { Pack } from "@lib/firebase/models/pack";
import { AddCircle } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import IconDelete from "@mui/icons-material/Delete";
import IconEdit from "@mui/icons-material/Edit";
import { useState } from "react";
import Link from "next/link";
import NewPackModal from "@components/NewPackModal";
import { deletePack } from "../../../../lib/firebase/controllers/pack";

type Props = {
    pack: Pack;
    accountId: string;
};

const CellAction = ({ pack, accountId }: Props) => {
    const { user } = useAuth();
    const { confirm } = useConfirmDialog();

    return (
        <>
            <Link href={`/accounts/${accountId}/packs/${pack.id}`} passHref>
                <IconButton
                    color="primary"
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <IconEdit />
                </IconButton>
            </Link>
            <IconButton
                color="error"
                onClick={(event) => {
                    event.stopPropagation();
                    confirm(`Delete ${pack.name} ?`, `Are you sure you want to delete this pack ?`)
                        .then(() => deletePack(user?.id!, accountId, pack.id!))
                        .catch(() => {});
                }}
            >
                <IconDelete />
            </IconButton>
        </>
    );
};

const Packs: NextPage = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { accountId } = router.query;
    const [openNewPack, setOpenNewPack] = useState(false);
    const [packsSnapshot, loading, error] = useCollection(collection(db, `users/${user?.id}/accounts/${accountId}/packs`));

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Pack name", flex: 1 },
        { field: "initialValue", headerName: "Initial value", flex: 1 },
        {
            field: "activationDate",
            headerName: "Activation Date",
            flex: 1,
            valueGetter: (params: GridValueGetterParams) => {
                const date = params.row.activationDate.toDate() as Date;
                return date.toLocaleDateString();
            },
        },
        {
            field: "endDate",
            headerName: "End Date",
            flex: 1,
            valueGetter: (params: GridValueGetterParams) => {
                const date = params.row.endDate.toDate() as Date;
                return date.toLocaleDateString();
            },
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (cellValues) => {
                return (
                    <CellAction
                        pack={{
                            id: cellValues.row.id,
                            name: cellValues.row.name,
                            initialValue: cellValues.row.initialValue,
                            activationDate: cellValues.row.activationDate,
                            endDate: cellValues.row.endDate,
                        }}
                        accountId={accountId as string}
                    ></CellAction>
                );
            },
        },
    ];

    const rows: Pack[] = loading
        ? []
        : packsSnapshot!.docs.map((pack) => {
              return { id: pack.id, ...pack.data() } as Pack;
          });

    const onRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent>) => {
        event.defaultMuiPrevented = true;
        router.push(`/accounts/${accountId}/packs/${params.id}`);
    };

    const onCreate = () => {
        setOpenNewPack(true);
    };

    const onCancel = () => {
        setOpenNewPack(false);
    };

    return (
        <AuthCheck>
            <main>
                <Metatags title="Packs" description="Manage all the packs attached to this account" />
                <Stack margin={5} spacing={2}>
                    <Stack direction={"row"} justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            Manage packs for account {accountId}
                        </Typography>
                        <IconButton onClick={onCreate}>
                            <AddCircle fontSize="large" color="primary" />
                        </IconButton>
                    </Stack>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid loading={loading} rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={onRowClick} />
                    </div>
                </Stack>
                <NewPackModal showDialog={openNewPack} closeDialog={onCancel} accountId={accountId as string} />
            </main>
        </AuthCheck>
    );
};

export default Packs;
