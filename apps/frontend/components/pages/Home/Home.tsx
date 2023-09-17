import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';

import style from './Home.module.css';

export const Home = (): JSX.Element => (
  <ContentBoxLayout>
    <div className={style.div}>
      <p className={style.p}>The HOME page</p>
    </div>
  </ContentBoxLayout>
);
