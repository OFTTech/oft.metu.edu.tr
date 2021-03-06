import styles from './layout.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import utilStyles from '@@/styles/utils.module.scss'
import Link from 'next/link'
import {ReactNode} from "react";

const name = "ODTÜ Fizik Topluluğu"
export const siteTitle = "oft"

export default function Layout({children, home}: { children: ReactNode, home?: boolean }) {
    return (
        <div className={styles.container}><Head>
            <link rel={"icon"} href={"/favicon.ico"}/>
            <meta name={"description"} content={"ODTÜ Fizik Topluluğu"}/>
            <meta
                property="og:image"
                content={`https://og-image.vercel.app/${encodeURI(
                    siteTitle
                )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle}/>
            <meta name="twitter:card" content="summary_large_image"/>
        </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image priority src={"https://blog.metu.edu.tr/wwwoft/files/2020/02/site-logo-3.png"}
                               className={utilStyles.borderCircle} height={144}
                               width={350} alt={name}/>
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href={"/"}>
                            <a>
                                <Image priority
                                       src={"https://blog.metu.edu.tr/wwwoft/files/2020/02/site-logo-3.png"}
                                       className={utilStyles.borderCircle}
                                       height={108}
                                       width={310}
                                       alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href={"/"}>
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href={"/"}>
                        <a>{"<"}- Back to home</a>
                    </Link>
                </div>)
            }
        </div>
    )
}
