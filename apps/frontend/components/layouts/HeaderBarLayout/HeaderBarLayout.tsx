import Head from 'next/head';
import { PropsWithChildren } from 'react';

import style from './HeaderBarLayout.module.css';
import { HeaderBar } from './components/HeaderBar';

export const HeaderBarLayout = ({
  children,
}: PropsWithChildren): JSX.Element => (
  <main className={style.main}>
    <Head>
      <title>Feature flags</title>
      <meta name="description" content="Generated with bifrost" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeaderBar />
    {children}
  </main>
);
