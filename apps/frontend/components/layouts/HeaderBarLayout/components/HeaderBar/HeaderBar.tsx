import Link from 'next/link';

import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';
import { Pages } from 'constant';
import { useIsUserConnected } from 'services/api/auth/useIsUserConnected';

import style from './HeaderBar.module.css';

export const HeaderBar = (): JSX.Element => {
  const isUserConnected = useIsUserConnected();

  return (
    <ContentBoxLayout>
      <div className={style.div}>
        <h2 className={style.title}>Nest.js feature flags app!</h2>
        {!isUserConnected && (
          <Link className={style.loginButton} href={Pages.Login}>
            <p className={style.p}>Login</p>
          </Link>
        )}
      </div>
    </ContentBoxLayout>
  );
};
