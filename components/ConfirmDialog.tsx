import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type Props = {
    showDialog: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    title: string;
    description: string;
};

const ConfirmDialog = ({ showDialog, handleCancel, handleOk, title, description }: Props) => {
    return (
        <Dialog open={showDialog} onClose={handleCancel} aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-description">
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleOk} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;