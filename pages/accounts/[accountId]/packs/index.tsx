import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, GridValueGetterParams, MuiEvent } from "@mui/x-data-grid";
import type { NextPage } from "next";
import Metatags from "@components/Metatags";
import { Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "../../../../context/AuthContext";
import AuthCheck from "@components/authCheck";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "@lib/firebase/clientApp";
import Pack from "@lib/firebase/models/pack";

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
];

const Packs: NextPage = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { accountId } = router.query;
    const [packsSnapshot, loading, error] = useCollection(collection(db, `users/${user?.id}/accounts/${accountId}/packs`));

    const rows: Pack[] = loading
        ? []
        : packsSnapshot!.docs.map((pack) => {
              return { id: pack.id, ...pack.data() } as Pack;
          });

    const onRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent>) => {
        event.defaultMuiPrevented = true;
        router.push(`/accounts/${accountId}/packs/${params.id}`);
    };

    return (
        <AuthCheck>
            <main>
                <Metatags title="Packs" description="Manage all the packs attached to this account" />
                <Stack margin={5} spacing={2}>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Manage packs for account
                    </Typography>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={onRowClick} />
                    </div>
                </Stack>
            </main>
        </AuthCheck>
    );
};

export default Packs;
