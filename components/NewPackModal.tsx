import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

import { useAuth } from "../context/AuthContext";
import { Fade, LinearProgress, Stack } from "@mui/material";

import { NewPack } from "@lib/firebase/models/pack";
import React from "react";
import { DesktopDatePicker } from "@mui/lab";
import { createPack } from '../lib/firebase/controllers/pack';

type Props = {
    showDialog: boolean;
    closeDialog: () => void;
    accountId: string;
};

const defaultPack: NewPack = {
    name: "",
    activationDate: new Date(),
    endDate: new Date(),
    initialValue: 0,
};

const NewPackModal = ({ showDialog, closeDialog, accountId }: Props) => {
    const { user } = useAuth();

    const [pack, setPack] = useState<NewPack>(defaultPack);

    const [loading, setLoading] = useState(false);

    const resetFields = () => {
        setPack(defaultPack);
        setLoading(false);
    };

    const handleChange = (prop: keyof NewPack) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setPack({ ...pack, [prop]: event.target.value });
    };

    const handleDateChange = (prop: keyof NewPack) => (newDate: Date | null) => {
        if (newDate) {
            setPack({ ...pack, [prop]: new Date(newDate) });
        }
    };

    const handleOk = () => {
        setLoading(true);
        createPack(user?.id!, accountId, pack)
            .catch((err) => console.error(err))
            .finally(() => {
                resetFields();
                closeDialog();
            });
    };

    const handleCancel = () => {
        resetFields();
        closeDialog();
    };

    return (
        <div>
            <Dialog open={showDialog} onClose={handleCancel}>
                <DialogTitle>Create Account</DialogTitle>
                <Fade in={loading} unmountOnExit>
                    <LinearProgress></LinearProgress>
                </Fade>
                <DialogContent>
                    <TextField autoFocus required margin="dense" id="input-name" label="Name" value={pack.name} onChange={handleChange("name")} fullWidth />
                    <TextField
                        required
                        margin="dense"
                        type={"number"}
                        id="input-initial-value"
                        label="Initial Value"
                        value={pack.initialValue}
                        onChange={handleChange("initialValue")}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                    <Stack spacing={2} direction={{ xs: "column", sm: "row" }} marginTop={1}>
                        <DesktopDatePicker
                            label={"Activation Date"}
                            inputFormat={"DD/MM/yyyy"}
                            value={pack.activationDate}
                            onChange={handleDateChange("activationDate")}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            label={"End Date"}
                            inputFormat={"DD/MM/yyyy"}
                            value={pack.endDate}
                            onChange={handleDateChange("endDate")}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleOk}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewPackModal;
