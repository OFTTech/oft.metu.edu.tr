import Head from 'next/head'
import Layout from "@@/components/layout";
import {makeStyles} from "@material-ui/core/styles";
import {Chip, Grid} from "@material-ui/core";
import TextCardListEvents from "@@/components/pages/events/textCardListEvents";
import {GetStaticProps} from "next";
import {getGeneral} from "@@/lib/wp-api/general";
import {Fragment, useState} from "react";
import {GetEvents} from "@@/lib/wp-api/events";
import useSWR from "swr";
import fetcher from "@@/lib/fetcher";

const useStyles = makeStyles(() => ({
    root: {
        padding: "10px"
    }
}));

export default function Events() {
    const classes = useStyles();
    const [apiEvents, setApiEvents] = useState(`/api/components/pages/events`);
    const [selected, setSelected] = useState({yaklasan: true, arsiv: false});
    const {
        data,
        error
    }: { data?: GetEvents, error?: any } = useSWR(apiEvents, fetcher)
    return (
        <Layout>
            <Head>
                <title>Etkinliklerimiz</title>
            </Head>
            <Grid container className={classes.root}>
                <Grid container justify={"space-around"} style={{marginBottom: "15px"}}>
                    <Chip color={"primary"} label={"Hepsi"}/>
                    {!error && data && data.categories.categories.edges[0].node.children.edges.map((value) => {
                        return (<Fragment key={value.node.id}>
                            <Chip label={value.node.name}/>
                        </Fragment>)
                    })}
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
                <TextCardListEvents data={data} error={error} setApiEvents={setApiEvents}/>
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
