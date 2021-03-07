import {Grid} from "@material-ui/core";
import styles from './footer.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Grid container justify={"space-between"}>
                <Grid item xs={3}/>
                <Grid item xs={6} style={{textAlign: "center"}}>
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    footer
                    <br/>
                    Copyright © <a href={"https://github.com/OFTTech"} rel={"noopener"} target={"_blank"}>OFTTech</a>
                </Grid>
                <Grid item xs={3}/>
            </Grid>
        </footer>
    )
}
