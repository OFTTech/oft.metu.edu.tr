import {Card, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import styles from "./textCardListPosts.module.scss";
import Image from "next/image";
import Link from 'next/link'

export default function TextCardListPosts() {
    return (
        <Grid container justify={"center"}>
            {[...Array(10)].map((value, index) => (
                <Grid item xs={12} key={index}>
                    <Card elevation={0} className={`${styles.card}`}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Image src={"/logo.jpg"} width={90} height={90}/>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant={"h6"} style={{fontSize: "20px"}}
                                                className={"font-bold"}>Fiziko-9</Typography>
                                    <Typography style={{fontSize: "15px"}} className={"font-bold"}
                                                variant={"subtitle1"}>Hocalarla farklı konular üzerine sohbet ettiğimiz,
                                        merak ettiklerinizi sorduğumuz Fiziko serimizin 8. yayınına Prof. Dr. Altuğ
                                        Özpineci ile devam...</Typography>
                                    <Typography style={{fontSize: "10px", color: "#5179c3"}}
                                                variant={"subtitle1"}>
                                        <Link href={"/altug-ozpineci"}>
                                            <a>Prof. Dr. Altuğ Özpineci</a>
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} style={{paddingTop: "4%"}}>
                                    <Typography variant={"caption"}>29 Mayıs 2021 20.30</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Divider/>
                </Grid>
            ))}
        </Grid>
    )
}
