import Layout from "@@/components/layout";
import Head from "next/head";
import utilStyles from '@@/styles/utils.module.scss'

export default function Post() {
    return <Layout>
        <Head>
        </Head>
        <article>
            <div className={utilStyles.lightText}>
            </div>
        </article>
    </Layout>
}
