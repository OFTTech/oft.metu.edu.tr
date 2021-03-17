import {AppBar, Grid, Toolbar, Typography} from "@material-ui/core";
import Image from 'next/image'
import Link from 'next/link'
import {siteTitle} from "@@/components/layout";
import styles from './navbar.module.scss'
import {getGeneralMenus} from "@@/lib/store/general";
import React from "react";
import {KeyboardArrowDown} from '@material-ui/icons';

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
                                {getGeneralMenus().map(({node}) => {
                                    if (!node.parentId) {
                                        return (
                                            <React.Fragment key={node.id}>
                                                <Link
                                                    href={{pathname: node.connectedNode ? "/page" + node.path : node.path}}>
                                                    <a>
                                                        {node.childItems.edges.length > 0 ?
                                                            <Typography variant="h5" className={styles.menuName}>
                                                                {node.label}<KeyboardArrowDown/>
                                                            </Typography>
                                                            :
                                                            <Typography variant="h5" className={styles.menuName}>
                                                                {node.label}
                                                            </Typography>
                                                        }
                                                    </a>
                                                </Link>
                                            </React.Fragment>
                                        )
                                    }
                                })}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Grid>
            </AppBar>
        </header>
    )
}
