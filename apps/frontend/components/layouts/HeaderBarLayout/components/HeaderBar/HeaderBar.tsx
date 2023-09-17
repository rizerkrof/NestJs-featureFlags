import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';

import style from './HeaderBar.module.css';

export const HeaderBar = (): JSX.Element => (
  <ContentBoxLayout>
    <div>
      <h2 className={style.title}>Nest.js feature flags app!</h2>
    </div>
  </ContentBoxLayout>
);
