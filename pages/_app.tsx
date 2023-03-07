import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.css';

import Layout from '@/components/layout';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
