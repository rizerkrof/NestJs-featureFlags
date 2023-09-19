import Link from 'next/link';

import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';
import { Pages } from 'constant';

import style from './Home.module.css';

export const Home = (): JSX.Element => (
  <ContentBoxLayout>
    <div className={style.div}>
      <h1 className={style.title}>The HOME page</h1>
      <Link className={style.button} href={Pages.NewFeature}>
        <p className={style.p}>New Feature in progress</p>
      </Link>
    </div>
  </ContentBoxLayout>
);
