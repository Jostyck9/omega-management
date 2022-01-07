import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from '../redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import AuthCheck from "@components/AuthCheck";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ReduxProvider store={store}>
            <AuthCheck>
                <Component {...pageProps}/>
            </AuthCheck>
        </ReduxProvider>
    );
}

export default MyApp;
