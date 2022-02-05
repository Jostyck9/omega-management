import { useEffect, useState } from "react";
import { updateAccount } from "../lib/firebase/controllers/account";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useAuth } from "../context/AuthContext";
import { Fade, LinearProgress } from "@mui/material";
import Account from "@lib/firebase/models/account";

type Props = {
    showDialog: boolean;
    account: Account;
    closeDialog: () => void;
};

const EditAccountModal = (props: Props) => {
    const { showDialog, closeDialog, account } = props;
    const { user } = useAuth();
    const [name, setName] = useState(account.name);
    const [login, setLogin] = useState(account.login);
    const [loginError, setLoginError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(account.name);
        setLogin(account.login);
    }, [props, account.name, account.login]);

    const resetFields = () => {
        setLoginError(false);
        setNameError(false);
        setName(account.name);
        setLogin(account.login);
        setLoading(false);
    };

    const onNameChange = (event: any) => {
        setName(event.target.value);
    };

    const onLoginChange = (event: any) => {
        setLogin(event.target.value);
    };

    const handleOk = () => {
        setLoginError(false);
        setNameError(false);
        if (login.length === 0) {
            setLoginError(true);
        }
        if (name.length === 0) {
            setNameError(true);
        }
        if (name.length && login.length) {
            setLoading(true);
            updateAccount(user?.id!, { id: account.id, name: name, login: login })
                .catch((err) => console.error(err))
                .finally(() => {
                    resetFields();
                    closeDialog();
                });
        }
    };

    const handleCancel = () => {
        resetFields();
        closeDialog();
    };

    return (
        <div>
            <Dialog open={showDialog} onClose={handleCancel}>
                <DialogTitle>Edit Account</DialogTitle>
                <Fade in={loading} unmountOnExit>
                    <LinearProgress></LinearProgress>
                </Fade>
                <DialogContent>
                    <TextField autoFocus required error={nameError} margin="dense" id="name" label="Name" value={name} onChange={onNameChange} fullWidth />
                    <TextField required error={loginError} margin="dense" id="login" label="Login" value={login} onChange={onLoginChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleOk}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditAccountModal;
