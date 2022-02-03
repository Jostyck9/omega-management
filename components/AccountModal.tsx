import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Account from "@lib/firebase/models/account";

interface Props {
    open: boolean;
    handleClose: (account?: Account) => void;
}

const AccountModal = (props: Props) => {
    const { open, handleClose } = props;
    const [login, setLogin] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const resetFields = () => {
        setLoginError(false);
        setNameError(false);
        setLogin('');
        setName('');
    }

    const handleSave = () => {
        setLoginError(false);
        setNameError(false);
        if (login.length === 0) {
            setLoginError(true);
        }
        if (name.length === 0) {
            setNameError(true);
        }
        if (name.length && login.length) {
            resetFields();
            handleClose({ name: name, login: login });
        }
    }

    const handleCancel = () => {
        resetFields();
        handleClose();
    }

    return (
        <div>
            <Dialog open={open} onClose={handleCancel}>
                <DialogTitle>Create a new Account</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required error={nameError} margin="dense" id="name" label="Name" onChange={(name) => setName(name.target.value)} fullWidth />
                    <TextField required error={loginError} margin="dense" id="login" label="Login" onChange={(login) => setLogin(login.target.value)} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AccountModal;
