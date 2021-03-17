import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import styles from './contentList.module.scss'
import Image from "next/image";
import useSWR from "swr";
import {GetContentListPosts} from "@@/lib/wp-api/components/pages/index/contentList";
import {stripHtml} from "@@/lib/helpers";

export default function ContentList({type}: { type: "events" | "posts" }) {
    const {
        data,
        error
    }: { data?: GetContentListPosts, error?: any } = useSWR(`/api/components/pages/index/contentList/${type}`)
    return (
        <Grid container className={`${styles.bigCard}`}>
            {!error && data && data.posts.edges.map((value) => (
                <Grid item xs={12} key={value.node.id}>
                    <Card elevation={0} className={`${styles.card}`}>
                        <CardContent>
                            <Grid container className={styles.truncate}>
                                <Grid item xs={2}>
                                    <Image src={"/logo.jpg"} width={50} height={50}/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant={"h6"} style={{fontSize: "20px"}}
                                                className={"font-bold"}>{stripHtml(value.node.title)}</Typography>
                                    <Typography style={{fontSize: "15px"}} className={"font-bold"}
                                                variant={"subtitle1"}>{stripHtml(value.node.excerpt)}</Typography>
                                    <Typography style={{fontSize: "10px"}}
                                                variant={"subtitle1"}>18 Mayıs 2021</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
