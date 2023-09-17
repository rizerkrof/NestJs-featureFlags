import { PropsWithChildren } from 'react';

import style from './ContentBoxLayout.module.css';

export const ContentBoxLayout = ({ children }: PropsWithChildren) => (
  <div className={style.div}>{children}</div>
);
