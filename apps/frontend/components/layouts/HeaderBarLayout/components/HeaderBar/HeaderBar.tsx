import Link from 'next/Link';

import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';
import { Pages } from 'constant';

import style from './HeaderBar.module.css';

export const HeaderBar = (): JSX.Element => {
  return (
    <ContentBoxLayout>
      <div className={style.div}>
        <h2 className={style.title}>Nest.js feature flags app!</h2>
        <Link className={style.loginButton} href={Pages.Login}>
          <p className={style.p}>Login</p>
        </Link>
      </div>
    </ContentBoxLayout>
  );
};
