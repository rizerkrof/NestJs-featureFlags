import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AuthContext } from 'components/contexts/auth/AutoContext';
import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';
import { Pages } from 'constant';
import { hasAccessToken, removeAccessToken } from 'services/api/auth/utils';

import style from './HeaderBar.module.css';

export const HeaderBar = (): JSX.Element => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  setIsAuthenticated(hasAccessToken());

  const handleOnClickLogout = () => {
    removeAccessToken();

    return router.push(Pages.Home);
  };

  return (
    <ContentBoxLayout>
      <div className={style.div}>
        <h2 className={style.title}>Nest.js feature flags app!</h2>
        {!isAuthenticated && (
          <Link className={style.button} href={Pages.Login}>
            <p className={style.p}>Login</p>
          </Link>
        )}
        {isAuthenticated && (
          <div className={style.buttonDiv}>
            <Link className={style.button} href={Pages.Profile}>
              <p className={style.p}>Profile</p>
            </Link>
            <button className={style.button} onClick={handleOnClickLogout}>
              <p className={style.p}>Logout</p>
            </button>
          </div>
        )}
      </div>
    </ContentBoxLayout>
  );
};
