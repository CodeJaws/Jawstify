import { METADATA } from '@/constants/Metadata';
import { Metadata } from 'next';
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

  metadata: Metadata = {
    metadataBase: new URL('https://taskify3.vercel.app/'),
    title: METADATA.title,
    description: METADATA.description,
    openGraph: {
      title: METADATA.title,
      description: METADATA.description,
      url: METADATA.url,
      siteName: METADATA.title,
      images: [
        {
          url: METADATA.image,
          width: 388,
          height: 388,
        },
      ],
      locale: METADATA.locale,
      type: 'website',
    },
  };

  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="icon" href={METADATA.image} sizes="any" />
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
