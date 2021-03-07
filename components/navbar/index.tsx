import {AppBar, Grid, Toolbar, Typography} from "@material-ui/core";
import Image from 'next/image'
import Link from 'next/link'
import {siteTitle} from "@@/components/layout";
import styles from './navbar.module.scss'

export default function Navbar() {
    return (
        <header>
            <AppBar elevation={0} color={"primary"} position={"static"}>
                <Grid container justify={"center"}>
                    <Toolbar className={styles.toolbar}>
                        <Link href={{pathname: "/"}}>
                            <a>
                                <Image className={styles.logo} src={"/logo.jpg"} alt={siteTitle} width={150}
                                       height={150}
                                       quality={100}
                                       priority={true}/>
                            </a>
                        </Link>
                        <Grid container direction={"column"}>
                            <Typography variant="h5" className={`${styles.title} ${styles.fontBold}`}>
                                ODTÜ FİZİK TOPLULUĞU
                            </Typography>
                            <Grid container>
                                <Link href={{pathname: "/"}}>
                                    <a>
                                        <Typography variant="h5" className={styles.menuName}>
                                            Ana Sayfa
                                        </Typography>
                                    </a>
                                </Link>
                                <Link href={{pathname: "/about-us"}}>
                                    <a>
                                        <Typography variant="h5" className={styles.menuName}>
                                            Hakkımızda
                                        </Typography>
                                    </a>
                                </Link>
                                <Typography variant="h5" className={styles.menuName}>
                                    Etkinlikler
                                </Typography>
                                <Typography variant="h5" className={styles.menuName}>
                                    Yazılar
                                </Typography>
                                <Typography variant="h5" className={styles.menuName}>
                                    İletişim
                                </Typography>
                                <Typography variant="h5" className={styles.menuName}>
                                    Kaynaklar
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Grid>
            </AppBar>
        </header>
    )
}
