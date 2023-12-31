import { Rubik } from '@next/font/google';
import { AppProps } from 'next/app';
import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/global.css';
import 'styles/stylesheet.css';
import { SWRConfig } from 'swr';

import { AppCrashFallback, ErrorBoundary } from 'components';
import { AuthProvider } from 'components/contexts/auth/AuthProvider';
import { Intl } from 'providers';
import { apiClient } from 'services/api/client';

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  void import('@axe-core/react').then(({ default: reactAxe }) => {
    const ACCESSIBILITY_CHECK_DELAY = 1000;

    return reactAxe(React, ReactDOM, ACCESSIBILITY_CHECK_DELAY);
  });
}

// https://nextjs.org/docs/basic-features/font-optimization
const rubik = Rubik({ subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <ErrorBoundary FallbackComponent={AppCrashFallback}>
        <Intl defaultLocale="en">
          <SWRConfig
            value={{
              refreshInterval: 0, // disable auto refresh by interval by default
              fetcher: (resource: string) =>
                apiClient
                  .get<unknown>(resource)
                  .then(response => response.data),
            }}
          >
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </SWRConfig>
        </Intl>
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
