import Head from 'next/head'
import Layout from "@@/components/layout";
import {makeStyles} from "@material-ui/core/styles";
import {Chip, Grid} from "@material-ui/core";
import TextCardListEvents from "@@/components/pages/events/textCardListEvents";
import {GetStaticProps} from "next";
import {getGeneral} from "@@/lib/wp-api/general";
import {useState} from "react";

const useStyles = makeStyles(() => ({
    root: {
        padding: "10px"
    }
}));

export default function Events() {
    const classes = useStyles();
    const [apiEvents, setApiEvents] = useState(`/api/components/pages/events`);
    const [selected, setSelected] = useState({yaklasan: true, arsiv: false});
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
                    <Chip onClick={() => {
                        setSelected({...selected, ...{yaklasan: true, arsiv: false}})
                        setApiEvents(`/api/components/pages/events`)
                    }}
                          color={selected.yaklasan ? "primary" : "default"}
                          label={"Yaklaşan"}/>
                    <Chip onClick={() => {
                        setSelected({...selected, ...{yaklasan: false, arsiv: true}})
                        setApiEvents(`/api/components/pages/events?archive=1`)
                    }}
                          color={selected.arsiv ? "primary" : "default"} label={"Arşiv"}/>
                </Grid>
                <TextCardListEvents apiEvents={apiEvents} setApiEvents={setApiEvents}/>
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
