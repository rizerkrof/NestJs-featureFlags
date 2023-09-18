import Link from 'next/link';
import router from 'next/router';

import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';
import { Pages } from 'constant';
import { useIsUserConnected } from 'services/api/auth/useIsUserConnected';
import { removeAccessToken } from 'services/api/auth/utils';

import style from './HeaderBar.module.css';

export const HeaderBar = (): JSX.Element => {
  const isUserConnected = useIsUserConnected();

  const handleOnClickLogout = () => {
    removeAccessToken();
    router.reload();
  };

  return (
    <ContentBoxLayout>
      <div className={style.div}>
        <h2 className={style.title}>Nest.js feature flags app!</h2>
        {!isUserConnected && (
          <Link className={style.button} href={Pages.Login}>
            <p className={style.p}>Login</p>
          </Link>
        )}
        {isUserConnected && (
          <button className={style.button} onClick={handleOnClickLogout}>
            <p className={style.p}>Logout</p>
          </button>
        )}
      </div>
    </ContentBoxLayout>
  );
};
