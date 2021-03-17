import Head from 'next/head'
import Layout from "@@/components/layout";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Grid} from "@material-ui/core";
import {getGeneral} from "@@/lib/wp-api/general";
import {GetPost, getPost} from "@@/lib/wp-api/posts";

export default function PostsSlug({data}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <Head>
                <title>{data?.posts?.nodes[0]?.title}</title>
            </Head>
            <Grid container justify={"center"}>
                <div style={{width: "610px"}} dangerouslySetInnerHTML={{__html: data?.posts?.nodes[0]?.content}}/>
            </Grid>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<{ data: GetPost, initialReduxState: any }> = async (context) => {
    const data = await getPost(context.params.slug)
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