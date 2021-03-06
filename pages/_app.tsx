import '@@/styles/global.scss'
import {AppProps} from "next/app";
import Router from 'next/router'
import NProgress from 'nprogress'
import {useEffect} from "react";
import theme from '@@/lib/theme';
import {ThemeProvider} from '@material-ui/core/styles';
import Head from "next/head";


export default function App({Component, pageProps}: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    useEffect(() => {
        // nprogress
        Router.events.on('routeChangeStart', (url) => {
            console.log(`Loading: ${url}`)
            NProgress.start()
        })
        Router.events.on('routeChangeComplete', () => NProgress.done())
        Router.events.on('routeChangeError', () => NProgress.done())
    })

    return (
        <>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}