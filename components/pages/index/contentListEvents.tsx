import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import styles from './contentListEvents.module.scss'
import Image from "next/image";
import useSWR from "swr";
import {GetContentListEvents} from "@@/lib/wp-api/components/pages/index/contentListEvents";
import {stripHtml} from "@@/lib/helpers";
import Link from "next/link";
import {format, parseISO} from 'date-fns'
import {tr} from "date-fns/locale";

export default function ContentListEvents() {
    const {
        data,
        error
    }: { data?: GetContentListEvents, error?: any } = useSWR(`/api/components/pages/index/contentList/events`)
    return (
        <Grid container className={`${styles.bigCard}`}>
            {!error && data && data.map((value) => (
                <Grid item xs={12} key={value.id}>
                    <Card elevation={0} className={`${styles.card}`}>
                        <Link href={"/events/" + value.slug}>
                            <a style={{color: "black"}}>
                                <CardContent>
                                    <Grid container className={styles.truncate}>
                                        <Grid item xs={2}>
                                            <Image src={value.featuredImage || "/logo.jpg"}
                                                   width={50}
                                                   height={50}/>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography variant={"h6"} style={{fontSize: "20px"}}
                                                        className={"font-bold"}>{stripHtml(value.title)}</Typography>
                                            <Typography style={{fontSize: "15px"}} className={"font-bold"}
                                                        variant={"subtitle1"}>{stripHtml(value.excerpt)}</Typography>
                                            <Typography style={{fontSize: "10px"}}
                                                        variant={"subtitle1"}>{value.date ? format(parseISO(value.date), "d LLLL, yyyy", {locale: tr}) : ""}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </a>
                        </Link>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
