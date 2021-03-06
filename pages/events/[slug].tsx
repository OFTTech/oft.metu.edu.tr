import Head from 'next/head'
import Layout from "@@/components/layout";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Grid} from "@material-ui/core";
import {getGeneral} from "@@/lib/wp-api/general";
import {GetEvent, getEvent} from "@@/lib/wp-api/events";

export default function EventsSlug({data}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <Head>
                <title>{data?.events?.nodes[0]?.title}</title>
            </Head>
            <Grid container justify={"center"}>
                <div style={{width: "610px"}} dangerouslySetInnerHTML={{__html: data?.events?.nodes[0]?.content}}/>
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