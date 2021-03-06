import Head from 'next/head'
import {ReactNode} from "react";
import Navbar from "@@/components/navbar";
import Main from "@@/components/main";
import {Grid} from "@material-ui/core";

export const siteTitle = "OFT"

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div>
            <Head>
                <link rel={"icon"} href={"/favicon.ico"}/>
                <meta name={"description"} content={"ODTÜ Fizik Topluluğu"}/>
                <meta
                    property="og:image"
                    content={"/logo.jpg"}
                />
                <meta name="og:title" content={siteTitle}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>
            <Navbar/>
            <Grid container justify={"center"}>
                <Main>{children}</Main>
            </Grid>
        </div>
    )
}
