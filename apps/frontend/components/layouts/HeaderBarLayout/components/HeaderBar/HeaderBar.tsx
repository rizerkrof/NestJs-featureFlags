import style from './HeaderBar.module.css';

export const HeaderBar = (): JSX.Element => (
  <div className={style.div}>
    <h2 className={style.title}>Nest.js feature flags app!</h2>
  </div>
);
