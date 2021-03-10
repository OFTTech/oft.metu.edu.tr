import Head from 'next/head'
import Layout from "@@/components/layout";
import BigGallery from "@@/components/pages/index/bigGallery";
import ContentList from "@@/components/pages/index/contentList";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Image from 'next/image'
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {getAllIndex} from "@@/lib/wp-api";

const useStyles = makeStyles(() => ({
    fontTop: {
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
        padding: "10px"
    },
    middle: {
        height: "230px",
        margin: "auto"
    }
}));

export default function Home({data}: InferGetStaticPropsType<typeof getStaticProps>) {
    const classes = useStyles();
    return (
        <Layout>
            <Head>
                <title>ODTÜ Fizik Topluluğu</title>
            </Head>
            <Grid container direction={"column"}>
                <BigGallery/>
                <Grid container justify={"space-between"}>
                    <Grid item xs={12} md={5}>
                        <Typography variant="h5" className={classes.fontTop}>
                            YAKLAŞAN ETKİNLİKLER
                        </Typography>
                        <ContentList/>
                        <Grid style={{marginTop: "10px"}} container justify={"center"}>
                            <Image src={"/logo.jpg"} width={80} height={80}/>
                            <div style={{marginRight: "20px"}}/>
                            <Image src={"/logo.jpg"} width={80} height={80}/>
                            <div style={{marginRight: "20px"}}/>
                            <Image src={"/logo.jpg"} width={80} height={80}/>
                            <div style={{marginRight: "20px"}}/>
                            <Image src={"/logo.jpg"} width={80} height={80}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={1} className={classes.middle}>
                        <Image src={"/logo.jpg"} width={80} height={80}/>
                        <br/>
                        <Image src={"/logo.jpg"} width={80} height={80}/>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography variant="h5" className={classes.fontTop}>
                            SON YAZILAR
                        </Typography>
                        <ContentList/>
                        <Grid style={{marginTop: "10px"}} container justify={"center"}>
                            <Image src={"/logo.jpg"} width={80} height={80}/>
                            <div style={{marginRight: "20px"}}/>
                            <Image src={"/logo.jpg"} width={80} height={80}/>
                            <div style={{marginRight: "20px"}}/>
                            <Image src={"/logo.jpg"} width={80} height={80}/>
                            <div style={{marginRight: "20px"}}/>
                            <Image src={"/logo.jpg"} width={80} height={80}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<{
    data: ReturnType<typeof getAllIndex>
}> = async () => {
    const data = await getAllIndex()
    return {
        props: {data}
    }
}