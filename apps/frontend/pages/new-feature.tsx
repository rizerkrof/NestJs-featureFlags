import DefaultErrorPage from 'next/error';

import { HeaderBarLayout } from 'components/layouts/HeaderBarLayout';
import { NewFeature } from 'components/pages';
import { useIsFeatureActive } from 'services/api/feature/useIsFeatureActive';

const NewFeaturePage = () => {
  const isNewFeatureActive = useIsFeatureActive('NEW_FEATURE');

  if (!isNewFeatureActive) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <HeaderBarLayout>
      <NewFeature />
    </HeaderBarLayout>
  );
};
export default NewFeaturePage;
