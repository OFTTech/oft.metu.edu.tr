import Head from 'next/head'
import Layout from "@@/components/layout";
import BigGallery from "@@/components/pages/index/bigGallery";
import ContentList from "@@/components/pages/index/contentList";
import {Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Image from 'next/image'
import {GetStaticProps} from "next";
import {getGeneral} from "@@/lib/wp-api/general";
import ContentListEvents from "@@/components/pages/index/contentListEvents";
import EmailList from "@@/components/pages/index/emailList";

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

export default function Home() {
    const classes = useStyles();
    return (
        <Layout>
            <Head>
                <title>ODTÜ Fizik Topluluğu – Scientia Dux Vitae Certissimus</title>
                <meta name={"description"}
                      content={"1995'te kurulmuş olan ODTÜ Fizik Topluluğu, ODTÜ Kültür İşleri Müdürlüğü'ne bağlı bir öğrenci topluluğudur."}/>
                <link rel={"canonical"} href={process.env.NEXT_PUBLIC_REAL_SITE_URL + "/"}/>
            </Head>
            <Grid container direction={"column"}>
                <BigGallery/>
                <Grid container justify={"space-between"}>
                    <Grid item xs={12} md={5}>
                        <Typography variant="h5" className={classes.fontTop}>
                            YAKLAŞAN ETKİNLİKLER
                        </Typography>
                        <ContentListEvents/>
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
                    <Container maxWidth={"sm"}>
                        <EmailList/>
                    </Container>
                </Grid>
            </Grid>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<{ initialReduxState: any }> = async () => {
    const general = await getGeneral()
    // const reduxStore = initializeStore()
    // const {dispatch} = reduxStore
    // dispatch({
    //     type: 'UPDATE_GENERAL',
    //     general
    // })
    return {
        props: {initialReduxState: {general}},
        revalidate: 1
        //TODO revalidate: 3600
    }
}
