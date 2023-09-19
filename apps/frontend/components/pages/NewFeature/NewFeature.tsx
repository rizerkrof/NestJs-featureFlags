import { NextPage } from 'next';
import Image from 'next/image';

import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';

import style from './NewFeature.module.css';

export const NewFeature: NextPage = (): JSX.Element => (
  <ContentBoxLayout>
    <div className={style.div}>
      <h1 className={style.title}>The FEATURE page</h1>
      <Image
        src={
          'https://i.pinimg.com/originals/7e/1f/59/7e1f59824f6c0e7c34815d340b538646.gif'
        }
        height={249}
        width={323}
        alt={`A cat in a donut`}
        unoptimized={true}
      />
      <p>Amazing feature still in progress...</p>
    </div>
  </ContentBoxLayout>
);
