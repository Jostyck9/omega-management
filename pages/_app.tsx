import type { AppProps } from "next/app";
import { AuthProvider } from "context/AuthContext";
import TopAppBar from "@components/TopAppBar";
import { ConfirmDialogProvider } from "../context/ConfirmDialogContext";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/lab";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <AuthProvider>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <ConfirmDialogProvider>
                        <TopAppBar />
                        <Component {...pageProps} />
                    </ConfirmDialogProvider>
                </LocalizationProvider>
            </AuthProvider>
        </>
    );
};

export default MyApp;
