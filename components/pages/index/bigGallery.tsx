import {Card, CardMedia} from "@material-ui/core";
import styles from './bigGallery.module.scss'

export default function BigGallery() {
    return (
        <Card className={styles.card}>
            <CardMedia className={styles.cardMedia}
                       image={"https://blog.metu.edu.tr/wwwoft/files/2020/02/cropped-WhatsApp-Image-2019-12-22-at-20.13.20-10.jpeg"}/>
        </Card>
    )
}
