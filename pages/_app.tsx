import '@@/styles/global.scss'
import {AppProps} from "next/app";
import Router from 'next/router'
import NProgress from 'nprogress'
import {useEffect} from "react";
import theme from '@@/lib/theme';
import {ThemeProvider} from '@material-ui/core/styles';
import Head from "next/head";
import {useStore} from "@@/lib/store";
import {Provider} from 'react-redux'

// nprogress
Router.events.on('routeChangeStart', (url) => {
    console.log(`Loading: ${url}`)
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({Component, pageProps}: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <Head>
                <meta name="viewport"
                      content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86"/>
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}