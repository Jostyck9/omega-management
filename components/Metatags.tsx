import Head from "next/head";

const Metatags = ({ title = "Omega Management", description = "A complete Omega management app", image = "/favicon.ico" }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@fireship_dev" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="viewport" content="initial-scale=1, width=device-width" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </Head>
    );
};

export default Metatags;
