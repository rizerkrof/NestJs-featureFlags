import { NextPage } from 'next';

import { Home } from 'components';
import { HeaderBarLayout } from 'components/layouts/HeaderBarLayout';

const HomePage: NextPage = () => (
  <HeaderBarLayout>
    <Home />
  </HeaderBarLayout>
);

export default HomePage;
