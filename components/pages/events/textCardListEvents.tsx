import {Card, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import styles from "./textCardListEvents.module.scss";
import Image from "next/image";
import Link from 'next/link'
import useSWR from "swr";
import {GetEvents} from "@@/lib/wp-api/events";
import {stripHtml} from "@@/lib/helpers";
import {format, parseISO} from "date-fns";
import {tr} from "date-fns/locale";

export default function TextCardListEvents() {
    const {
        data,
        error
    }: { data?: GetEvents, error?: any } = useSWR(`/api/components/pages/events`)
    return (
        <Grid container justify={"center"}>
            {!error && data && data.events?.edges?.map((value, index) => (
                <Grid item xs={12} key={index}>
                    <Card elevation={0} className={`${styles.card}`}>
                        <Link href={"/events/" + value.node.slug}>
                            <a style={{color: "black"}}>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Image src={value.node.featuredImage?.node.mediaItemUrl || "/logo.jpg"}
                                                   width={90}
                                                   height={90}/>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant={"h6"} style={{fontSize: "20px"}}
                                                        className={"font-bold"}>{stripHtml(value.node.title)}</Typography>
                                            <Typography style={{fontSize: "15px"}} className={"font-bold"}
                                                        variant={"subtitle1"}>{stripHtml(value.node.excerpt)}</Typography>
                                            <Typography style={{fontSize: "10px", color: "#5179c3"}}
                                                        variant={"subtitle1"}>
                                                <Link href={"/altug-ozpineci"}>
                                                    <a>Prof. Dr. Altuğ Özpineci</a>
                                                </Link>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} style={{paddingTop: "4%"}}>
                                            <Typography
                                                variant={"caption"}>{format(parseISO(value.node.date), "d LLLL, yyyy", {locale: tr})}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </a>
                        </Link>
                    </Card>
                    <Divider/>
                </Grid>
            ))}
        </Grid>
    )
}
