/* eslint-disable @next/next/inline-script-id */
import GlobalStyles from '@/styles/GlobalStyles';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import * as gtag from '@/lib/gtag';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-Y1EXPY413V`} />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', { 
                page_path: window.location.pathname,
              });
          `,
        }}
      />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
