import Head from 'next/head'
import Layout from "@@/components/layout";
import {makeStyles} from "@material-ui/core/styles";
import {Chip, Grid} from "@material-ui/core";
import TextCardListPosts from "@@/components/pages/posts/textCardListPosts";
import {GetStaticProps} from "next";
import {getGeneral} from "@@/lib/wp-api/general";

const useStyles = makeStyles(() => ({
    root: {
        padding: "10px"
    }
}));

export default function Posts() {
    const classes = useStyles();
    return (
        <Layout>
            <Head>
                <title>Yazılar</title>
                <meta name={"description"}
                      content={"ODTÜ Fizik Topluluğu üyeleri olarak paylaşmış olduğumuz popüler bilimden röportajlara kadar pek çok türde yazıları okuyabilirsiniz."}/>
                <link rel={"canonical"} href={process.env.NEXT_PUBLIC_REAL_SITE_URL + "/posts/"}/>
            </Head>
            <Grid container className={classes.root}>
                <Grid container justify={"space-around"} style={{marginBottom: "15px"}}>
                    <Chip color={"primary"} label={"Hepsi"}/>
                    <Chip label={"Popüler bilim"}/>
                </Grid>
                <Grid container justify={"space-around"} style={{marginBottom: "15px"}}>
                    <Chip label={"Arşiv"}/>
                </Grid>
                <TextCardListPosts/>
            </Grid>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<{ initialReduxState: any }> = async () => {
    const general = await getGeneral()
    return {
        props: {initialReduxState: {general}},
        revalidate: 1
        //TODO revalidate: 3600
    }
}
