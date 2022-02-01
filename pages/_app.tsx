import type { AppProps } from "next/app";
import { AuthProvider } from "context/AuthContext";
import TopAppBar from "@components/TopAppBar";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <AuthProvider>
                <TopAppBar/>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
};

export default MyApp;
