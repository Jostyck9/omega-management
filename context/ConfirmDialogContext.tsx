import ConfirmDialog from "@components/ConfirmDialog";
import { createContext, useContext, ReactNode, useState, useRef } from "react";

type ConfirmDialogContextType = {
    confirm: (title: string, description: string) => Promise<void>;
};

const confirmDialogDefaultValues: ConfirmDialogContextType = {
    confirm: () => Promise.resolve(),
};

const ConfirmDialogContext = createContext<ConfirmDialogContextType>(confirmDialogDefaultValues);

export function useConfirmDialog() {
    return useContext(ConfirmDialogContext);
}

type Props = {
    children: ReactNode;
};

export function ConfirmDialogProvider({ children }: Props) {
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState("Confirm");
    const [description, setDescription] = useState("Are you sure you want to perform this operation ?");
    const resolver = useRef<any>();
    const rejecter = useRef<any>();

    const confirm = (title: string, description: string) => {
        setTitle(title);
        setDescription(description);
        setShowDialog(true);

        return new Promise<void>((resolve, reject) => {
            resolver.current = resolve;
            rejecter.current = reject;
        });
    };

    const handleOk = () => {
        resolver.current && resolver.current();
        setShowDialog(false);
    };

    const handleCancel = () => {
        rejecter.current && rejecter.current();
        setShowDialog(false);
    };

    const value = {
        confirm,
    };

    return (
        <ConfirmDialogContext.Provider value={value}>
            {children}
            <ConfirmDialog showDialog={showDialog} handleCancel={handleCancel} handleOk={handleOk} title={title} description={description}/>
        </ConfirmDialogContext.Provider>
    );
}
