/* eslint-disable @next/next/inline-script-id */
import { METADATA } from '@/constants/Metadata';
import * as gtag from '@/lib/gtag';
import GlobalStyles from '@/styles/GlobalStyles';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      }),
  );
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
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
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
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
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary>
          <GlobalStyles />
          <Component {...pageProps} />
          <Toaster containerStyle={{ fontSize: '1.5rem', fontWeight: '600' }} />
          <div style={{ fontSize: '1.5rem' }}>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
