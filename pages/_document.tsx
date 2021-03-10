import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'
import {ServerStyleSheets} from '@material-ui/core/styles';
import theme from '@@/lib/theme';
import {Children} from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        // Resolution order
        //
        // On the server:
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. document.getInitialProps
        // 4. app.render
        // 5. page.render
        // 6. document.render
        //
        // On the server with error:
        // 1. document.getInitialProps
        // 2. app.render
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. app.render
        // 4. page.render

        // Render app and page and get the context of the page with collected side effects.
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (
                    App) =>
                    (props) =>
                        sheets.collect(<App {...props} />
                        )
            });
        const initialProps = await Document.getInitialProps(ctx)
        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()]
        }
    }

    render() {
        return (
            <Html lang={"tr"}>
                <Head>
                    <meta name="theme-color" content={theme.palette.primary.main}/>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument