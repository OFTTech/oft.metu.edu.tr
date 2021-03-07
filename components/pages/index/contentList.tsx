import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import styles from './contentList.module.scss'
import Image from "next/image";

export default function ContentList() {
    return (
        <Grid container className={styles.bigCard}>
            {[...Array(10)].map((value, index) => (
                <Grid item xs={12} key={index}>
                    <Card elevation={0} className={`${styles.card} ${styles.truncate}`}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Image src={"/logo.jpg"} width={50} height={50}/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant={"h6"} style={{fontSize: "20px"}}
                                                className={"font-bold"}>Fiziko-9</Typography>
                                    <Typography style={{fontSize: "15px"}} className={"font-bold"}
                                                variant={"subtitle1"}>Fiziko-9Fiziko-9Fiziko-9Fiziko-9Fiziko-9</Typography>
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
