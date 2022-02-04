import type { AppProps } from "next/app";
import { AuthProvider } from "context/AuthContext";
import TopAppBar from "@components/TopAppBar";
import { ConfirmDialogProvider } from "../context/ConfirmDialogContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <AuthProvider>
                <ConfirmDialogProvider>
                    <TopAppBar />
                    <Component {...pageProps} />
                </ConfirmDialogProvider>
            </AuthProvider>
        </>
    );
};

export default MyApp;
