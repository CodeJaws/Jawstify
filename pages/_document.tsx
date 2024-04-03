import { METADATA } from '@/constants/Metadata';

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const themeInitializerScript = `
      (function () {
        document.body.dataset.theme = window.localStorage.getItem("theme") || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? "dark" : "light");
      })();
  `;

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <title>Jawstify</title>
          <link rel="icon" href={METADATA.IMAGE} sizes="any" />
          <meta property="og:title" content={METADATA.TITLE} />
          <meta property="og:url" content={METADATA.URL} />
          <meta property="og:image" content={METADATA.IMAGE} />
          <meta property="og:description" content={METADATA.DESCRIPTION} />
          <meta name="twitter:card" content="summary" />
          <meta property="twitter:domain" content={METADATA.DOMAIN} />
          <meta property="twitter:url" content={METADATA.URL} />
          <meta name="twitter:title" content={METADATA.TITLE} />
          <meta name="twitter:description" content={METADATA.DESCRIPTION} />
          <meta name="twitter:image" content={METADATA.IMAGE} />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
          <Main />
          <div id="modal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
