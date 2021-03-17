import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import styles from './contentList.module.scss'
import Image from "next/image";
import useSWR from "swr";
import {GetContentListPosts} from "@@/lib/wp-api/components/pages/index/contentList";
import {stripHtml} from "@@/lib/helpers";
import Link from 'next/link'
import {format, parseISO} from "date-fns";
import {tr} from "date-fns/locale";

export default function ContentList() {
    const {
        data,
        error
    }: { data?: GetContentListPosts, error?: any } = useSWR(`/api/components/pages/index/contentList/posts`)
    return (
        <Grid container className={`${styles.bigCard}`}>
            {!error && data && data.posts.edges.map((value) => (
                <Grid item xs={12} key={value.node.id}>
                    <Card elevation={0} className={`${styles.card}`}>
                        <Link href={"/posts/" + value.node.slug}>
                            <a style={{color: "black"}}>
                                <CardContent>
                                    <Grid container className={styles.truncate}>
                                        <Grid item xs={2}>
                                            <Image src={value.node.featuredImage?.node.mediaItemUrl || "/logo.jpg"} width={50}
                                                   height={50}/>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography variant={"h6"} style={{fontSize: "20px"}}
                                                        className={"font-bold"}>
                                                {stripHtml(value.node.title)}
                                            </Typography>
                                            <Typography style={{fontSize: "15px"}} className={"font-bold"}
                                                        variant={"subtitle1"}>{stripHtml(value.node.excerpt)}</Typography>
                                            <Typography style={{fontSize: "10px"}}
                                                        variant={"subtitle1"}>{format(parseISO(value.node.date), "d LLLL, yyyy", {locale: tr})}</Typography>
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
