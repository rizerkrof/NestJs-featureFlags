import { PropsWithChildren } from 'react';

import { useGetAllFeatures } from 'services/api/feature/useGetAllFeatures';

import { FeatureContext } from './FeatureContext';

const FeatureProvider = ({ children }: PropsWithChildren) => {
  const allFeatures = useGetAllFeatures();

  return (
    <FeatureContext.Provider value={allFeatures ?? []}>
      {children}
    </FeatureContext.Provider>
  );
};

export default FeatureProvider;
