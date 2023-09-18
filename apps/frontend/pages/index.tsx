import { NextPage } from 'next';

import { Home } from 'components';
import { AuthProvider } from 'components/contexts/AuthProvider';
import { HeaderBarLayout } from 'components/layouts/HeaderBarLayout';

const HomePage: NextPage = () => (
  <AuthProvider>
    <HeaderBarLayout>
      <Home />
    </HeaderBarLayout>
  </AuthProvider>
);

export default HomePage;
