import Head from 'next/head'
import Link from 'next/link'
import Layout, {siteTitle} from "@@/components/layout";
import utilStyles from '@@/styles/utils.module.scss'

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <p>OFT {process.env.NEXT_PUBLIC_WP_GRAPHQL} {process.env.NEXT_PUBLIC_NEXT_HOST}</p>
                <Link href={"/posts/first-post"}>
                    <a>First Post!</a>
                </Link>
                <Link href={"/forever"}>
                    <a>Forever!</a>
                </Link>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                </ul>
            </section>
        </Layout>
    )
}
