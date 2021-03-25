import Head from 'next/head'
import Layout from "@@/components/layout";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Divider, Grid} from "@material-ui/core";
import {getGeneral} from "@@/lib/wp-api/general";
import {GetPost, getPost} from "@@/lib/wp-api/posts";

export default function PostsSlug({data}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <Head>
                <title>{data?.posts?.nodes[0]?.title}</title>
                <meta name={"description"}
                      content={"ODTÜ Fizik Topluluğu üyeleri olarak paylaşmış olduğumuz popüler bilimden röportajlara kadar pek çok türde yazıları okuyabilirsiniz."}/>
                <link rel={"canonical"}
                      href={process.env.NEXT_PUBLIC_REAL_SITE_URL + "/posts/" + data?.posts?.nodes[0]?.slug}/>
            </Head>
            <h1 style={{
                fontWeight: "bold",
                fontSize: "50px",
                marginBottom: "20px"
            }}>{data?.posts?.nodes[0]?.title}</h1>
            <Divider/>
            <Grid container justify={"center"}>
                <div style={{maxWidth: "610px"}}
                     dangerouslySetInnerHTML={{__html: `` + data?.posts?.nodes[0]?.content}}/>
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