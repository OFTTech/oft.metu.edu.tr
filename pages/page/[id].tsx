import Head from 'next/head'
import Layout from "@@/components/layout";
import {GetStaticPaths, InferGetStaticPropsType} from "next";
import {getPage} from "@@/lib/wp-api/page";
import {Grid} from "@material-ui/core";

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

export const getStaticProps = async (context) => {
    const data = await getPage(context.params.id)
    return {
        props: {data},
        revalidate: 1//3600
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {paths: [], fallback: "blocking"}
}