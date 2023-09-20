import useSWR from 'swr';

import { logger } from 'services/logger';
import { GetFeatureDto } from 'types/feature/GetFeatureDto';

import { ApiRoutes } from '../apiRoutes';

export const useGetAllFeatures = () => {
  const { data, error } = useSWR<GetFeatureDto[], unknown>(
    ApiRoutes.features.url,
  );

  if (error !== undefined) {
    logger.error(error);

    return;
  }

  return data;
};
