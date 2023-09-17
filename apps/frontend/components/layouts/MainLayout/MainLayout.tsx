import { PropsWithChildren } from 'react';

import style from './MainLayout.module.css';

export const MainLayout = ({ children }: PropsWithChildren) => (
  <main className={style.main}>{children}</main>
);
