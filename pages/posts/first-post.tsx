import Image from 'next/image'
import Head from 'next/head'
import Layout from '@@/components/layout'

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <Image height={200} width={410} alt={"oft"} src={"https://blog.metu.edu.tr/wwwoft/files/2020/02/site-logo-3.png"}/>
            <h1>First Post</h1>
        </Layout>
    )
}