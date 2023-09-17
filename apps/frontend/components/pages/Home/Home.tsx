import Link from 'next/link';

import style from './Home.module.css';

export const Home = (): JSX.Element => (
  <div className={style.main}>
    <h1>
      Welcome to <a href="https://nextjs.org">Next.js!</a>
    </h1>

    <p>
      Get started by editing <code>pages/index.tsx</code>
    </p>

    <div>
      <a href="https://nextjs.org/docs">
        <h2>Documentation &rarr;</h2>
        <p>Find in-depth information about Next.js features and API.</p>
      </a>

      <a href="https://nextjs.org/learn">
        <h2>Learn &rarr;</h2>
        <p>Learn about Next.js in an interactive course with quizzes!</p>
      </a>

      <a href="https://github.com/vercel/next.js/tree/canary/examples">
        <h2>Examples &rarr;</h2>
        <p>Discover and deploy boilerplate example Next.js projects.</p>
      </a>
    </div>
    <Link href="/profile">
      <h2>Update your profile</h2>
    </Link>
  </div>
);
