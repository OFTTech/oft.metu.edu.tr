import Head from 'next/head'
import Layout from "@@/components/layout";
import {makeStyles} from "@material-ui/core/styles";
import {Chip, Grid} from "@material-ui/core";
import TextCardList from "@@/components/pages/events/textCardList";

const useStyles = makeStyles(() => ({
    root: {
        padding: "10px"
    }
}));

export default function Events() {
    const classes = useStyles();
    return (
        <Layout>
            <Head>
                <title>Etkinliklerimiz</title>
            </Head>
            <Grid container className={classes.root}>
                <Grid container justify={"space-around"} style={{marginBottom: "15px"}}>
                    <Chip color={"primary"} label={"Hepsi"}/>
                    <Chip label={"Fiziko"}/>
                    <Chip label={"Seminer"}/>
                    <Chip label={"Çalıştay"}/>
                    <Chip label={"Epsilon-Delta"}/>
                    <Chip label={"Geziler"}/>
                </Grid>
                <Grid container justify={"space-around"} style={{marginBottom: "15px"}}>
                    <Chip color={"primary"} label={"Yaklaşan"}/>
                    <Chip label={"Arşiv"}/>
                </Grid>
                <TextCardList/>
            </Grid>
        </Layout>
    )
}
