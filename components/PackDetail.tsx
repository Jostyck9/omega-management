import { useAuth } from "@context/AuthContext";
import { db } from "@lib/firebase/clientApp";
import { DesktopDatePicker } from "@mui/lab";
import { Grid, InputAdornment, Paper, Stack, TextField } from "@mui/material";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";
import { NewPack, Pack } from "@lib/firebase/models/pack";

type Props = {
    accountId: string;
    packId: string;
};

const defaultPack: NewPack = {
    activationDate: new Date(),
    endDate: new Date(),
    initialValue: 0,
    name: "",
};

const PackDetail = ({ accountId, packId }: Props) => {
    const { user } = useAuth();
    const [loadedPack, loading, error] = useDocument(doc(db, `users/${user?.id}/accounts/${accountId}/packs/${packId}`));
    const [pack, setPack] = useState<Pack>(defaultPack);

    useEffect(() => {
        if (loadedPack && loadedPack.exists()) {
            setPack({ id: loadedPack.id, ...loadedPack.data() } as Pack);
        }
    }, [loadedPack]);

    const handleChange = (prop: keyof Pack) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setPack({ ...pack, [prop]: event.target.value });
    };

    const handleDateChange = (prop: keyof NewPack) => (newDate: Date | null) => {
        if (newDate) {
            setPack({ ...pack, [prop]: new Date(newDate) });
        }
    };

    return (
        <Paper elevation={3}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={3} key={"name-value-item"}>
                    <TextField required margin="dense" id="input-name-value" label="Name" value={pack?.name} onChange={() => {}} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={3} key={"init-value-item"}>
                    <TextField
                        required
                        margin="dense"
                        type={"number"}
                        id="input-initial-value"
                        label="Initial Value"
                        value={pack?.initialValue}
                        onChange={() => {}}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} key={"activation-date-value-item"}>
                    <DesktopDatePicker
                        label={"Activation Date"}
                        inputFormat={"DD/MM/yyyy"}
                        value={pack?.activationDate}
                        onChange={handleDateChange("activationDate")}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} key={"end-date-value-item"}>
                    <DesktopDatePicker
                        label={"End Date"}
                        inputFormat={"DD/MM/yyyy"}
                        value={pack?.endDate}
                        onChange={handleDateChange("endDate")}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PackDetail;
