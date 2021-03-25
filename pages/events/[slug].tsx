import Head from 'next/head'
import Layout from "@@/components/layout";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Divider, Grid} from "@material-ui/core";
import {getGeneral} from "@@/lib/wp-api/general";
import {GetEvent, getEvent} from "@@/lib/wp-api/events";

export default function EventsSlug({data}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <Head>
                <title>{data?.events?.nodes[0]?.title}</title>
                <link rel={"canonical"}
                      href={process.env.NEXT_PUBLIC_REAL_SITE_URL + "/events/" + data?.events?.nodes[0]?.slug}/>
            </Head>
            <h1 style={{
                fontWeight: "bold",
                fontSize: "50px",
                marginBottom: "20px"
            }}>{data?.events?.nodes[0]?.title}</h1>
            <Divider/>
            <Grid container justify={"center"}>
                <div style={{maxWidth: "610px"}}
                     dangerouslySetInnerHTML={{__html: `` + data?.events?.nodes[0]?.content}}/>
            </Grid>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<{ data: GetEvent, initialReduxState: any }> = async (context) => {
    const data = await getEvent(context.params.slug)
    const general = await getGeneral()
    return {
        props: {data, initialReduxState: {general}},
        revalidate: 1
        //TODO revalidate: 3600
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {paths: [], fallback: "blocking"}
}