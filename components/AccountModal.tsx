import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Account from "@lib/firebase/models/account";

interface Props {
    showDialog: boolean;
    name: string;
    login: string;
    handleChange: (account: Account) => void;
    handleOk: () => void;
    handleCancel: () => void;
}

const AccountModal = ({ showDialog, name, login, handleChange, handleOk, handleCancel }: Props) => {
    const [loginError, setLoginError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const [accountName, setAccountName] = useState(name);
    const [accountLogin, setAccountLogin] = useState(login);

    const resetFields = () => {
        setLoginError(false);
        setNameError(false);
        setAccountName(name);
        setAccountLogin(login);
    };

    const onSave = () => {
        setLoginError(false);
        setNameError(false);
        if (login.length === 0) {
            setLoginError(true);
        }
        if (name.length === 0) {
            setNameError(true);
        }
        if (name.length && login.length) {
            handleOk();
            resetFields();
        }
    };

    const onCancel = () => {
        resetFields();
        handleCancel();
    };

    const onNameChange = (event: any) => {
        setAccountName(event.target.value);
        //handleChange({ login: login, name: event.target.value });
    };

    const onLoginChange = (event: any) => {
        setAccountLogin(event.target.value);
        //handleChange({ login: event.target.value, name: name });
    };

    return (
        <div>
            <Dialog open={showDialog} onClose={onCancel}>
                <DialogTitle>Account</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required error={nameError} margin="dense" id="name" label="Name" value={accountName} onChange={onNameChange} fullWidth />
                    <TextField required error={loginError} margin="dense" id="login" label="Login" value={accountLogin} onChange={onLoginChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AccountModal;
