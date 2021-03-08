import DefaultErrorPage from 'next/error'

export async function getStaticProps(context) {
    if (context.params.id == process.env.WP_BEARER) {
        return {
            redirect: {
                destination: process.env.WP_SITE,
                permanent: false
            }
        }
    }
    return {props: {}}
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export default function AdminID() {
    return (<DefaultErrorPage statusCode={404}/>)
}