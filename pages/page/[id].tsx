import Head from 'next/head'
import Layout from "@@/components/layout";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {GetPage, getPage} from "@@/lib/wp-api/page";
import {Grid} from "@material-ui/core";
import {getGeneral} from "@@/lib/wp-api/general";

export default function Page({data}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <Head>
                <title>{data?.pages?.nodes[0]?.title}</title>
            </Head>
            <Grid container justify={"center"}>
                <div style={{width: "610px"}} dangerouslySetInnerHTML={{__html: data?.pages?.nodes[0]?.content}}/>
            </Grid>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<{ data: GetPage, initialReduxState: any }> = async (context) => {
    const data = await getPage(context.params.id)
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