import Head from 'next/head';
import { PropsWithChildren } from 'react';

import style from './HeaderBarLayout.module.css';
import { HeaderBar } from './components/HeaderBar';
import { MainLayout } from '../MainLayout';

export const HeaderBarLayout = ({
  children,
}: PropsWithChildren): JSX.Element => (
  <MainLayout>
    <Head>
      <title>Feature flags</title>
      <meta name="description" content="Generated with bifrost" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={style.div}>
      <HeaderBar />
      {children}
    </div>
  </MainLayout>
);
