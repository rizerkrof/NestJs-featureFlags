import { useFeatureContext } from './useFeatureContext';

export const useIsFeatureActive = (featureName: string) => {
  const features = useFeatureContext();

  return features.some(
    feature => feature.name === featureName && feature.isActive,
  );
};
