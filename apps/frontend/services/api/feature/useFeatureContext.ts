import { useContext } from 'react';

import { FeatureContext } from 'components/contexts/feature/FeatureContext';

export const useFeatureContext = () => useContext(FeatureContext);
